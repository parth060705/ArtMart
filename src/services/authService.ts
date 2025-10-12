import axios from "axios";

export const refreshAccessTokenStandalone = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return null;

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            refreshToken,
        });

        const { access_token, refresh_token } = response.data;

        localStorage.setItem("accessToken", access_token);
        if (refresh_token) {
            localStorage.setItem("refreshToken", refresh_token);
        }

        return access_token;
    } catch (error) {
        console.error("Failed to refresh token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return null;
    }
};
