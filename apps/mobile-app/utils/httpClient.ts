import { AxiosRequestConfigWithMetadata } from "@whatTodo/models";
import axios, { AxiosResponse } from "axios";

if (process.env.EXPO_PUBLIC_IS_PRODUCTION == undefined) throw new Error("EXPO_PUBLIC_IS_PRODUCTION is not set");
if (process.env.EXPO_PUBLIC_API_URL == undefined) throw new Error("EXPO_PUBLIC_API_URL is not set");

export const httpClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

function interceptRequest(config: AxiosRequestConfigWithMetadata) {
  if (process.env.EXPO_PUBLIC_IS_PRODUCTION) {
    config.metadata = { startTime: new Date() };
  }
  return config;
}
function interceptErrorRequest(error: any) {
  return Promise.reject(error);
}

function interceptResponse(response: AxiosResponse) {
  if (process.env.EXPO_PUBLIC_IS_PRODUCTION) {
    response.config.metadata.endTime = new Date();
  }
  return response;
}
function interceptErrorResponse(error: any) {
  return Promise.reject(error);
}

httpClient.interceptors.request.use(interceptRequest, interceptErrorRequest);
httpClient.interceptors.response.use(interceptResponse, interceptErrorResponse);

export const updateHttpClientBearerToken = (token: string) => {
  httpClient.defaults.headers.common.authorization = `Bearer ${token}`;
};
