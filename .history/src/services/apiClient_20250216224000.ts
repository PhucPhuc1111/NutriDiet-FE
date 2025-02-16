import axios, { AxiosRequestConfig } from "axios";


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});


export function setTokenHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

async function _get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get(url, { ...options });
  return response.data;
}

async function _post(url: string, data?: any, options?: any) {
  const response = await axios.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return response.data;
}

async function _postMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options,
  });
  return response.data;
}
async function _putMultiPart(url: string, formData: FormData, options?: AxiosRequestConfig) {
  const response = await axios.put(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options, 
  });
  return response.data;
}

async function _put(url: string, data?: any) {
  const response = await axios.put(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}

async function _delete<T>(url: string): Promise<T> {
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


  get: _get,
  post: _post,
  postMultiPart: _postMultiPart,
  putMultiPart: _putMultiPart,
  put: _put,
  delete: _delete,
  deleteWithOptions: _deleteWithOptions,
  patch: _patch,
};

