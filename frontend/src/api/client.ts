import { ApiResponse } from '../services/api';

const DEFAULT_BASE_URL = 'http://localhost:5000/api';

const getBaseUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  return url || DEFAULT_BASE_URL;
};

export class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.message = message;
  }
}

export const apiClient = {
  async request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${path}`;
    
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      let result: any = null;
      try {
        result = await response.json();
      } catch (e) {
        // Fallback for non-JSON response body
      }

      if (!response.ok) {
        const errorMsg = result?.message || `HTTP error! status: ${response.status}`;
        throw new ApiError(response.status, errorMsg);
      }

      // If the backend format doesn't envelope inside success/data (e.g. is raw array/object),
      // adapt it to match the expected ApiResponse shape.
      if (result && typeof result === 'object' && 'success' in result) {
        return result as ApiResponse<T>;
      } else {
        return {
          success: true,
          data: result as T
        };
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, error instanceof Error ? error.message : 'Network failure');
    }
  },

  get<T>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'GET', headers });
  },

  post<T>(path: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'POST', body: JSON.stringify(body), headers });
  },

  patch<T>(path: string, body: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'PATCH', body: JSON.stringify(body), headers });
  },

  delete<T>(path: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(path, { method: 'DELETE', headers });
  }
};
