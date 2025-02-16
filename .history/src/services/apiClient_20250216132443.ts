import axios, { AxiosRequestConfig } from "axios";

async function get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get(url, { ...options });
  return response.data;
}

async function post(url: string, data?: any, options?: any) {
  const response = await axios.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return response.data;
}

async function postMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options,
  });
  return response.data;
}
async function putMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await axios.put(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options, 
  });
  return response.data;
}

async function put(url: string, data?: any) {
  const response = await axios.put(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

async function delete<T>(url: string): Promise<T> {
  const response = await axios.delete(url);
  return response.data;
}

async function _deleteWithOptions<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await axios.delete(url, { ...options });
  return response.data;
}

async function _patch(url: string, data?: any, options?: any) {
  const response = await axios.patch(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  return response.data;
}

axios.interceptors.response.use(
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
)
