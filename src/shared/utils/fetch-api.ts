/**
 * Fetch API wrapper with built-in Session/Cookie support.
 * @module fetch-api
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
  data?: any;
}

/**
 * Custom Fetch function that handles JSON parsing and HTTP errors.
 * Includes credentials by default for session/cookie support.
 */
export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { data, headers, ...customConfig } = options;

  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    // CRITICAL: Always include credentials for session/cookie authentication
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...customConfig,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Attempt to parse error message if available
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }

  // Handle No Content (204)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * Convenience methods for common HTTP verbs
 */
export const fetchClient = {
  get: <T>(url: string, options?: FetchOptions) => fetchApi<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, data: any, options?: FetchOptions) => fetchApi<T>(url, { ...options, method: "POST", data }),
  put: <T>(url: string, data: any, options?: FetchOptions) => fetchApi<T>(url, { ...options, method: "PUT", data }),
  patch: <T>(url: string, data: any, options?: FetchOptions) => fetchApi<T>(url, { ...options, method: "PATCH", data }),
  delete: <T>(url: string, options?: FetchOptions) => fetchApi<T>(url, { ...options, method: "DELETE" }),
};
