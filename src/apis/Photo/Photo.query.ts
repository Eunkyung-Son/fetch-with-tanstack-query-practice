import { useQuery } from "@tanstack/react-query";

import {
  Parameter,
  RequestFnReturn,
  QueryHookParams,
} from "../@types/tanstack-query-type";
import { photoApi } from "./Photo.api";

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_PHOTO_API = {
  LIST: (variables?: Parameter<typeof photoApi.photoList>) =>
    ["PHOTO_LIST", variables].filter((key) => typeof key !== "undefined"),
  RETRIEVE: (variables?: Parameter<typeof photoApi.photoRetrieve>) =>
    ["PHOTO_RETRIEVE", variables].filter((key) => typeof key !== "undefined"),
};

/**
 * No description
 *
 * @tags photos
 * @name PhotosList
 * @summary photo 목록 조회
 * @request GET:/photos
 * @secure */

export const usePhotoListQuery = <
  TData = RequestFnReturn<typeof photoApi.photoList>
>(
  params?: QueryHookParams<typeof photoApi.photoList, TData>
) => {
  const queryKey = QUERY_KEY_PHOTO_API.LIST(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => photoApi.photoList(params?.variables),
    ...params?.options,
  });
};

/**
 * No description
 *
 * @tags photos
 * @name PhotoRetrieve
 * @summary photo 상세 조회
 * @request GET:/photos/{id}
 * @secure */

export const useTodosRetrieveQuery = <
  TData = RequestFnReturn<typeof photoApi.photoRetrieve>
>(
  params: QueryHookParams<typeof photoApi.photoRetrieve, TData>
) => {
  const queryKey = QUERY_KEY_PHOTO_API.RETRIEVE(params.variables);
  return useQuery({
    queryKey,
    queryFn: () => photoApi.photoRetrieve(params.variables),
    ...params?.options,
  });
};
