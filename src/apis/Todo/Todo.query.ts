import { useQuery } from "@tanstack/react-query";

import {
  Parameter,
  RequestFnReturn,
  QueryHookParams,
} from "../@types/tanstack-query-type";
import { CommonErrorType } from "../@types/data-contracts";
import { todoApi } from "./Todo.api";

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_TODO_API = {
  LIST: (variables?: Parameter<typeof todoApi.todoList>) =>
    ["TODO_LIST", variables].filter((key) => typeof key !== "undefined"),
  RETRIEVE: (variables?: Parameter<typeof todoApi.todoRetrieve>) =>
    ["TODO_RETRIEVE", variables].filter((key) => typeof key !== "undefined"),
};

/**
 * No description
 *
 * @tags todos
 * @name TodosList
 * @summary Todos 목록 조회
 * @request GET:/todos
 * @secure */

export const useTodoListQuery = <
  TData = RequestFnReturn<typeof todoApi.todoList>
>(
  params?: QueryHookParams<typeof todoApi.todoList, CommonErrorType, TData>
) => {
  const queryKey = QUERY_KEY_TODO_API.LIST(params?.variables);
  return useQuery({
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
 * @summary Banner 상세 조회
 * @request GET:/todos/{id}
 * @secure */

export const useTodoRetrieveQuery = <
  TData = RequestFnReturn<typeof todoApi.todoRetrieve>
>(
  params: QueryHookParams<typeof todoApi.todoRetrieve, CommonErrorType, TData>
) => {
  const queryKey = QUERY_KEY_TODO_API.RETRIEVE(params.variables);
  return useQuery({
    queryKey,
    queryFn: () => todoApi.todoRetrieve(params.variables),
    ...params?.options,
  });
};
