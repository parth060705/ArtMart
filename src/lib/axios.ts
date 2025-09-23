import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, add the request to the queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // Import the auth context directly to avoid hooks rules violation
        import('@/hooks/user/auth/UseAuth')
          .then(({ useAuth }) => {
            const { refreshAccessToken } = useAuth();
            return refreshAccessToken()
              .then((accessToken) => {
                if (!accessToken) {
                  throw new Error('Failed to refresh token');
                }
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                processQueue(null, accessToken);
                return axiosClient(originalRequest);
              })
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                processQueue(err, null);
                reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          })
          .catch((err) => {
            reject(err);
            isRefreshing = false;
          });
      });
    }
    
    return Promise.reject(error);
  }
);
