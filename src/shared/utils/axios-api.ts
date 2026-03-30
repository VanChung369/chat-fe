import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

/**
 * Axios instance with built-in Session/Cookie support.
 * @module axios-api
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Pre-configured axios instance for API requests.
 * Includes withCredentials: true for proper session/cookie handling.
 */
export const axiosApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // CRITICAL: Ensure cookies/session are sent with every request
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Useful for adding temporary headers or logging.
 */
axiosApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Session/Cookies are handled automatically by withCredentials: true
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Centralized error handling (e.g., redirecting on 401 Unauthorized).
 */
axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // If you need global error handling (like 401 Unauthorized redirect),
    // you can implement it here.
    if (error.response?.status === 401) {
      console.warn("Session expired or unauthorized - redirecting...");
      // Logic for redirection could go here e.g. window.location.href = '/login'
    }

    // Wrap the error message for consistent use
    const message = (error.response?.data as any)?.message || error.message;
    return Promise.reject(new Error(message));
  }
);

/**
 * Convenience methods for common HTTP verbs
 */
export const axiosClient = {
  get: <T>(url: string, config?: any) => axiosApi.get<T>(url, config).then(res => res.data),
  post: <T>(url: string, data: any, config?: any) => axiosApi.post<T>(url, data, config).then(res => res.data),
  put: <T>(url: string, data: any, config?: any) => axiosApi.put<T>(url, data, config).then(res => res.data),
  patch: <T>(url: string, data: any, config?: any) => axiosApi.patch<T>(url, data, config).then(res => res.data),
  delete: <T>(url: string, config?: any) => axiosApi.delete<T>(url, config).then(res => res.data),
};
