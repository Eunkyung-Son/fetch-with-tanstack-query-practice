import { getCookie } from "@/actions/cookie";
import { deleteToken, setToken } from "@/actions/token";
import { ENV } from "@/configs/env";

import fetchHelper, { type FetchHelper } from "./fetch-helper";

export const returnFetchInterceptors: FetchHelper = (args) =>
  fetchHelper({
    ...args,
    interceptors: {
      request: async (args) => {
        const access = await getCookie("access").then((v) => v?.value);
        if (access) {
          const headers = new Headers(args[1]?.headers);
          headers.set("Authorization", `Bearer ${access}`);
          return [
            args[0],
            {
              ...args[1],
              headers,
            },
          ];
        }
        return args;
      },
      response: async (response, requestArgs, fetch) => {
        const isUnAuthorized = response.status === 401;
        const isExpiredToken = response.status === 444;
        if (isUnAuthorized) {
          await deleteToken();
          if (typeof window !== "undefined") {
            window.location.replace("/");
          }
        }
        if (typeof window !== "undefined" && isExpiredToken) {
          const [url, requestInit] = requestArgs;
          const access = await getCookie("access").then((v) => v?.value);
          const refresh = await getCookie("refresh").then((v) => v?.value);
          const tryRefresh = await fetch(
            `${ENV.API_BASE_URL}/v1/user/refresh/`,
            {
              method: "POST",
              body: JSON.stringify({
                refresh,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const newToken = await tryRefresh.json();
          const { access: newAccess, refresh: newRefresh } = newToken;
          setToken({ access: newAccess, refresh: newRefresh });

          const modifiedRequestInit = {
            ...requestInit,
            headers: {
              ...requestInit?.headers,
              Authorization: `Bearer ${access}`,
            },
          };

          return fetch(url, modifiedRequestInit);
        }

        return response;
      },
    },
  });
