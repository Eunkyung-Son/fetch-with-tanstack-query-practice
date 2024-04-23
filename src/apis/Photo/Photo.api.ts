import { fetchInstance } from "@/configs/fetch/fetch-instance";
import { HttpClient, RequestParams } from "../@http-client";
import { CommonErrorType, PhotoType } from "../@types/data-contracts";

export class PhotoApi<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags photo
   * @name PhotoList
   * @summary Banner 목록 조회
   * @request GET:/photos
   * @secure
   */
  photoList = (variables?: { query?: {}; params?: RequestParams }) =>
    this.request<PhotoType[], CommonErrorType>({
      path: `/photos`,
      method: "GET",
      query: variables?.query,
      secure: true,
      format: "json",
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags photo
   * @name PhotoRetrieve
   * @summary Photo 상세 조회
   * @request GET:/photos/{id}
   * @secure
   */
  photoRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<PhotoType, CommonErrorType>({
      path: `/photos/${variables.id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...variables.params,
    });
}

export const photoApi = new PhotoApi({
  customFetch: fetchInstance,
});

//
