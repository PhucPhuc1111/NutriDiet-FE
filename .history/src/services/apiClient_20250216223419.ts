import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export function setTokenHeader(token: string) {
  apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export const get = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const post = async <T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const push = async <T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const del = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


async function putMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await apiClient.put(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options, 
  });
  return response.data;
}







