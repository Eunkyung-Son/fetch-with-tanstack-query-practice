import { useQuery } from "@tanstack/react-query";

import {
  Parameter,
  RequestFnReturn,
  QueryHookParams,
} from "../@types/tanstack-query-type";
import { CommonErrorType } from "../@types/data-contracts";
import { todosApi } from "./Todos.api";

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_BANNER_API = {
  LIST: (variables?: Parameter<typeof todosApi.todosList>) =>
    ["TODOS_LIST", variables].filter((key) => typeof key !== "undefined"),
  RETRIEVE: (variables?: Parameter<typeof todosApi.todosRetrieve>) =>
    ["TODOS_RETRIEVE", variables].filter((key) => typeof key !== "undefined"),
};

/**
 * No description
 *
 * @tags todos
 * @name TodosList
 * @summary Todos 목록 조회
 * @request GET:/todos
 * @secure */

export const useTodosListQuery = <
  TData = RequestFnReturn<typeof todosApi.todosList>
>(
  params?: QueryHookParams<typeof todosApi.todosList, CommonErrorType, TData>
) => {
  const queryKey = QUERY_KEY_BANNER_API.LIST(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => todosApi.todosList(params?.variables).then((res) => res),
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

export const useTodosRetrieveQuery = <
  TData = RequestFnReturn<typeof todosApi.todosRetrieve>
>(
  params: QueryHookParams<typeof todosApi.todosRetrieve, CommonErrorType, TData>
) => {
  const queryKey = QUERY_KEY_BANNER_API.RETRIEVE(params.variables);
  return useQuery({
    queryKey,
    queryFn: () => todosApi.todosRetrieve(params.variables),
    ...params?.options,
  });
};
