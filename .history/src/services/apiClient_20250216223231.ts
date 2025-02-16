import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export function setTokenHeader(token: string) {
  apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

async function get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get(url, { ...options });
  return response.data;
}

async function post(url: string, data?: any, options?: any) {
  const response = await apiClient.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return response.data;
}

async function postMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await apiClient.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options,
  });
  return response.data;
}

async function putMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await apiClient.put(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options, 
  });
  return response.data;
}

async function put(url: string, data?: any, options?: AxiosRequestConfig) {
  const response = await apiClient.put(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return response.data;
}

async function del<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete(url, { ...options });
  return response.data;
}

async function deleteWithOptions<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete(url, { ...options });
  return response.data;
}

async function patch(url: string, data?: any, options?: AxiosRequestConfig) {
  const response = await apiClient.patch(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  return response.data;
}

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // logout
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);


