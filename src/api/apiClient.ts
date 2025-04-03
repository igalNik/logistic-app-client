import { API_BASE_URL } from '../config';

interface ApiRequestOptions extends RequestInit {
  body?: any;
}

export const apiClient = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> => {
  try {
    const requestOptions: RequestInit = {
      ...options,
      credentials: 'include', //  Ensure cookies are always included
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error('API Client Error:', error);
    throw error;
  }
};
