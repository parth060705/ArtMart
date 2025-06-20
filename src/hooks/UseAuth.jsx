// src/hooks/useAuth.js
export const useAuth = () => {
  const token = localStorage.getItem('token');
  try {
    if (!token) return false;

    // Optionally: validate expiration if token includes "exp"
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));

    const isExpired = payload.exp * 1000 < Date.now(); // convert exp to ms
    return !isExpired;
  } catch {
    return false;
  }
};
