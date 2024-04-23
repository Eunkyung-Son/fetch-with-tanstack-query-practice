import { fetchInstance } from "@/configs/fetch/fetch-instance";
import { HttpClient, RequestParams } from "../@http-client";
import { CommonErrorType, TodoType } from "../@types/data-contracts";

export class TodoApi<
  SecurityDataType = unknown
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags todos
   * @name TodoType
   * @summary Banner 목록 조회
   * @request GET:/todos
   * @secure
   */
  todoList = (variables?: { query?: {}; params?: RequestParams }) =>
    this.request<TodoType[], CommonErrorType>({
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
   * @tags todo
   * @name TodoRetrieve
   * @summary todo 상세 조회
   * @request GET:/todo/{id}
   * @secure
   */
  todoRetrieve = (variables: { id: number; params?: RequestParams }) =>
    this.request<TodoType, CommonErrorType>({
      path: `/todos/${variables.id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...variables.params,
    });
}

export const todoApi = new TodoApi({
  customFetch: fetchInstance,
});

//
