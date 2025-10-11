import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const CONFIG = {
  baseUrl: "http://localhost:8001",
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8001/api",
} as const;


export const apiInstance = axios.create({
  baseURL: CONFIG.apiUrl ?? import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createInstance = async <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
  const response = await apiInstance({ ...config, ...options });
  return response.data;
};

export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;
export type SecondParameter<T extends (...args: never[]) => unknown> =
    Parameters<T>[1];

type MyErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<MyErrorResponse>;
  }
}
