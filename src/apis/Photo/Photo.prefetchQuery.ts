import { QueryClient } from "@tanstack/react-query";
import {
  RequestFnReturn,
  QueryHookParams,
} from "../@types/tanstack-query-type";
import { CommonErrorType } from "../@types/data-contracts";
import { photoApi } from "./Photo.api";
import { QUERY_KEY_PHOTO_API } from "./Photo.query";

export class PhotoPrefetchQuery {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  /**
   * No description
   *
   * @tags photo
   * @name PhotoList
   * @summary photo 목록 조회
   * @request GET:/photos
   * @secure
   */
  public usePhotoListPrefetchQuery = <
    TData = RequestFnReturn<typeof photoApi.photoList>
  >(
    params?: QueryHookParams<typeof photoApi.photoList, CommonErrorType, TData>
  ) => {
    const queryKey = QUERY_KEY_PHOTO_API.LIST(params?.variables);
    return this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => photoApi.photoList(params?.variables),
      ...params?.options,
    });
  };

  /**
   * No description
   *
   * @tags photo
   * @name PhotoRetrieve
   * @summary photo 상세 조회
   * @request GET:/photos/{id}
   * @secure
   */
  public usePhotoRetrievePrefetchQuery = <
    TData = RequestFnReturn<typeof photoApi.photoRetrieve>
  >(
    params: QueryHookParams<
      typeof photoApi.photoRetrieve,
      CommonErrorType,
      TData
    >
  ) => {
    const queryKey = QUERY_KEY_PHOTO_API.RETRIEVE(params.variables);
    return this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => photoApi.photoRetrieve(params.variables),
      ...params?.options,
    });
  };
}
