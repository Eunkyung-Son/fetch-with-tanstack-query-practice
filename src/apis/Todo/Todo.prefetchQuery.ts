import { QueryClient } from "@tanstack/react-query";
import {
  RequestFnReturn,
  QueryHookParams,
} from "../@types/tanstack-query-type";
import { CommonErrorType } from "../@types/data-contracts";
import { todoApi } from "./Todo.api";
import { QUERY_KEY_TODO_API } from "./Todo.query";

export class TodoPrefetchQuery {
  private queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.queryClient = queryClient;
  }

  /**
   * No description
   *
   * @tags todos
   * @name TodosList
   * @summary Todos 목록 조회
   * @request GET:/todos
   * @secure */

  public useTodoListPrefetchQuery = <
    TData = RequestFnReturn<typeof todoApi.todoList>
  >(
    params?: QueryHookParams<typeof todoApi.todoList, CommonErrorType, TData>
  ) => {
    const queryKey = QUERY_KEY_TODO_API.LIST(params?.variables);
    return this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => todoApi.todoList(params?.variables),
      ...params?.options,
    });
  };

  /**
   * No description
   *
   * @tags todos
   * @name TodosRetrieve
   * @summary Todos 상세 조회
   * @request GET:/todos/{id}
   * @secure */

  public useTodoRetrievePrefetchQuery = <
    TData = RequestFnReturn<typeof todoApi.todoRetrieve>
  >(
    params: QueryHookParams<typeof todoApi.todoRetrieve, CommonErrorType, TData>
  ) => {
    const queryKey = QUERY_KEY_TODO_API.RETRIEVE(params.variables);
    return this.queryClient.prefetchQuery({
      queryKey,
      queryFn: () => todoApi.todoRetrieve(params.variables),
      ...params?.options,
    });
  };
}
