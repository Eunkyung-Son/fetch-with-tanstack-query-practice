import { fetchInstance } from "@/configs/fetch/fetch-instance";
import { HttpClient, RequestParams } from "../@http-client";
import { CommonErrorType, TodosType } from "../@types/data-contracts";
import { ENV } from "@/configs/env";

export class TodosApi<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags banner
   * @name BannerList
   * @summary Banner 목록 조회
   * @request GET:/todos
   * @secure
   */
  todosList = (variables?: { query?: {}; params?: RequestParams }) =>
    this.request<TodosType[], CommonErrorType>({
      path: `/todos`,
      method: "GET",
      query: variables?.query,
      secure: true,
      format: "json",
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags banner
   * @name BannerRetrieve
   * @summary Banner 상세 조회
   * @request GET:/todos/{id}
   * @secure
   */
  todosRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<TodosType, CommonErrorType>({
      path: `/todos/${variables.id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...variables.params,
    });
}

export const todosApi = new TodosApi({
  customFetch: fetchInstance,
});

//
