import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});


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
