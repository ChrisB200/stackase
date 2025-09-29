import { type AxiosInstance } from "axios";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import env from "../config/constants";
import { setToken, getToken, generateToken } from "./jwt";
import AppError from "./appError";

const api: AxiosInstance = axios.create({
  baseURL: env.FLASK_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface RequestML<T = any> {
  method: "post" | "get" | "put" | "delete";
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

export async function requestML<T = any>(
  options: RequestML,
): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.params,
    headers: options.headers,
  };

  let response;

  try {
    response = await api.request<T>(config);
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        const token = generateToken({}, 3600, env.APP_SECRET_KEY);
        setToken("googoogaga");
        response = await api.request<T>(config);
      } catch (retryError: any) {
        throw new AppError(
          retryError.response?.data?.error ||
            retryError.message ||
            "Unauthorized after retry",
          retryError.response?.status || 401,
          "ML_SERVER_UNAUTHORIZED",
        );
      }
    } else {
      throw new AppError(
        error.response?.data?.error ||
          error.message ||
          "Could not connect to ML server",
        error.response?.status || 500,
        "ML_SERVER_ERROR",
      );
    }
  }

  return response;
}
export default api;
