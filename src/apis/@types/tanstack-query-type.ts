import {
  UseBaseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export type QueryHookParams<
  T extends CustomRequestFn,
  Error = any,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>
> = {
  options?: Omit<
    UseBaseQueryOptions<OriginData, Error, TData>,
    "queryKey" | "queryFn"
  >;
} & OptionalVariables<Variables>;

export type InfiniteQueryHookParams<
  T extends CustomRequestFn,
  Error = any,
  TData = RequestFnReturn<T>,
  OriginData = RequestFnReturn<T>,
  Variables = Parameter<T>
> = {
  options?: Partial<
    Omit<
      UseInfiniteQueryOptions<OriginData, Error, TData, OriginData, any, any>,
      "queryKey" | "queryFn"
    >
  >;
} & OptionalVariables<Variables>;

export type MutationHookParams<
  T extends CustomRequestFn,
  Error = any,
  Data = RequestFnReturn<T>,
  Variables = Parameter<T>
> = {
  options?: Omit<
    UseMutationOptions<Data, Error, Variables>,
    "mutationFn" | "mutationKey"
  >;
};

export type OptionalVariables<T> = undefined extends T
  ? { variables?: T }
  : { variables: T };

export type Parameter<T> = T extends (param: infer U) => any ? U : never;

export type CustomRequestFn = (variables?: any) => Promise<any>;

export type RequestFnReturn<T extends CustomRequestFn> = Awaited<ReturnType<T>>;
