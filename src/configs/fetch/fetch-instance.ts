import { ENV } from "@/configs/env";
import { returnFetchInterceptors } from "./fetch-interceptors";

export const fetchInstance = returnFetchInterceptors({
  baseUrl: ENV.API_BASE_URL,
});
