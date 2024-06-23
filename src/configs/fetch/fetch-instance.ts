import { ENV } from "@/configs/env";
import { returnFetchInterceptors } from "../../utils/fetch/fetch-interceptors";

export const fetchInstance = returnFetchInterceptors({
  baseUrl: ENV.API_BASE_URL,
});
