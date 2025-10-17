import { useState } from "react";
import axios from "axios";
import {
  UseForgotPasswordReturn,
  UseForgotPasswordState,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/lib/types"; // Adjust path as needed

const API_BASE = import.meta.env.VITE_API_URL

// ------------------ Forgot Password Hook ------------------
export function useForgotPassword(): UseForgotPasswordReturn {
  const [loading, setLoading] = useState<UseForgotPasswordState["loading"]>(false);
  const [error, setError] = useState<UseForgotPasswordState["error"]>(null);
  const [message, setMessage] = useState<UseForgotPasswordState["message"]>("");

  const forgotPassword = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.post<{ message: string }>(`${API_BASE}/forgot-password`, { email });
      setMessage(data.message);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, message };
}

// ------------------ Reset Password Hook ------------------
export function useResetPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ResetPasswordResponse>(`${API_BASE}/resetpassword`, data);
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, message };
}
