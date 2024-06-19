Next.js 에서 데이터 페칭 시 고민한 문제들에 대해서 이야기 해보겠습니다.

App Router를 사용하면서 기존에 사용하던 tanstack-query를 제거하고 오직 fetch 만을 사용하여 데이터 캐시 관리를 했습니다.

1. fetch의 기능이 강력하므로 tanstack-query가 꼭 필요하지 않았습니다.
2. tanstack-query 공식 문서에서 아래의 권장사항을 발견했습니다.

> It's hard to give general advice on when it makes sense to pair React Query with Server Components and not. **If you are just starting out with a new Server Components app, we suggest you start out with any tools for data fetching your framework provides you with and avoid bringing in React Query until you actually need it.** This might be never, and that's fine, use the right tool for the job!
> 

🤔 위와 같은 이유로 라이브러리 도움 없이 fetch 를 사용하다가 다음과 같은 고민이 생겼습니다.

# **1. API 호출 비용을 최대한 줄이면서 유저에게 빠르게 데이터를 보여줄 수 있는 방법이 있을까?**

- 이전 글에서 언급한 대로, 개인화된 요청은 원격 서버에 캐싱 되어서는 안 됩니다. 따라서 fetch를 사용할 때 `no-store` 옵션을 설정합니다. 이 경우, 새로고침 및 라우트 캐시가 만료될 때 마다 API 호출이 발생하므로 client-side에서 tanstack-query를 사용하여 브라우저 메모리에 개인화된 요청에 대한 응답을 캐시 하고 queryKey와 staleTime으로 캐시를 관리합니다.
- 개인화 되지 않은 요청은 server-side에서 force-cache 옵션을 사용하여 API를 호출하고, 적절한 방법을 통해 갱신합니다.

|  | 개인화 되지 않은 요청 | 개인화 된 요청 |
| --- | --- | --- |
| server-side | fetch | x |
| client-side | x | tanstack-query |

1번 고민에 대한 결과를 정리하면, 개인화 된 요청은 검색 엔진에 노출될 필요가 없으므로 client-side 에서 tanstack-query로 요청 후 캐시를 관리합니다. **Suspense의 fallback** 을 이용하여 유저에게 데이터를 가져오는 중임을 알립니다. 그 반대의 경우 server-side에서 fetch 하고 원격 서버에 캐싱하므로 유저에게 빠르게 데이터를 보여줄 수 있습니다. 두 가지 방법을 적절히 섞어 사용하면 API 호출 비용을 줄이고, 유저에게 빠르게 데이터를 보여줄 수 있습니다.

이 때, 2번의 고민이 발생합니다.

# 2. server-side에서 fetching 한 데이터를 사용하는 곳까지 props drilling 하는 것을 최소화 할 수 있는 방법이 있을까?

props drilling 방식으로 데이터를 전달하면 상위 컴포넌트가 변경되면 하위 컴포넌트 까지 변경해야 하는 문제가 있습니다. 이는 유지보수 관점에서 좋지 않습니다.

## 2-1. tanstack-query 를 사용하여 prefetch 및 de/hydrating 하기

### 개발환경

*(next14.2.2, react18^, typescript^5.1.3, tanstack-query^5.29.2)*

### 초기 설정

```jsx
const queryClientOptions = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

export default queryClientOptions;

```

```jsx
import { QueryClient } from "@tanstack/react-query";
import queryClientOptions from "@/configs/tanstack-query/query-client-options";

function makeQueryClient() {
  return new QueryClient(queryClientOptions);
}

let browserQueryClient: QueryClient | undefined = undefined;
export default function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

```

```jsx
"use client";

import { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import getQueryClient from "@/configs/tanstack-query/get-query-client";

function AppProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default AppProvider;

```

### Prefetch + de/hydrating data

서버에서는 마크업을 생성/렌더링 하기 전에 data를 **prefetch** 하고, 해당 데이터를 마크업에 포함할 수 있는 **직렬화 가능한 형식으로 de/hydration** 하며, 클라이언트에서는 해당 데이터를 React 쿼리 캐시로 **hydration** 합니다.

PhotoPrefetchQuery 클래스를 생성하고, QueryClient 인스턴스를 받습니다.

```jsx
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

  constructor() {
    this.queryClient = new QueryClient();
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

export const todoPrefetchQuery = new TodoPrefetchQuery();
```

```jsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { QUERY_KEY_TODO_API } from "@/apis/Todo/Todo.query";
import { todoApi } from "@/apis/Todo/Todo.api";
import TodoList from "./TodoList";

export default async function HydratedTodoList() {
	// Next.js는 이미 fetch()를 활용하는 요청을 중복 제거하므로 data를 fetch 하는 각 서버 컴포넌트에
	// 새로운 queryClient를 만듭니다.
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_TODO_API.LIST(),
    queryFn: () =>
      todoApi.todoList({
        params: {
          cache: "force-cache",
        },
      }),
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoList />
    </HydrationBoundary>
  );
}

```

```jsx
"use client";

import revalidate from "@/actions/revalidate";
import { TodoType } from "@/apis/@types/data-contracts";
import { QUERY_KEY_TODO_API, useTodoListQuery } from "@/apis/Todo/Todo.query";
import { useQueryClient } from "@tanstack/react-query";
import { use } from "react";

interface TodoListProps {
  todosPromise?: Promise<TodoType[]>;
}
export default function TodoList({ todosPromise }: TodoListProps) {
  const queryClient = useQueryClient();
  const todos = todosPromise && use(todosPromise);
	
  // This useQuery could just as well happen in some deeper
  // child to <TodoList>, data will be available immediately either way
  const { data: todoList } = useTodoListQuery({
    options: {
      suspense: true,
      initialData: todos,
    },
  });

  const handleRevalidate = () => {
    revalidate();
    queryClient.invalidateQueries({
      queryKey: QUERY_KEY_TODO_API.LIST(),
    });
  };

  return (
    <div>
      <button onClick={handleRevalidate}>revalidate</button>
      {todoList?.map(({ userId, title, completed }) => (
        <div key={`${userId}-${title}`}>
          <p>{userId}</p>
          <p>{title}</p>
          <p>{completed}</p>
        </div>
      ))}
    </div>
  );
};
```

```jsx
import ParentA from "@/components/ParentA";
import HydratedPhotoList from "@/components/Photo/hydratedPhotoList";
import { RenderingPageSkeleton } from "@/components/RenderingPageSkeleton";
import { SkeletonCard } from "@/components/SkeletonCard";
import Link from "next/link";
import { Suspense } from "react";

export default async function DehydrateWithStreamingPage() {
  return (
    <main className="flex min-h-screen h-full flex-row p-24">
      <h1>tanstack-query dehydrate & fetch & streaming</h1>
      <Link href="/">go to home</Link>
      <section className="flex min-h-screen flex-row p-24">
        <Suspense fallback={<SkeletonCard />}>
				  {/* 
            ParentA 컴포넌트에서 발생하는 props drilling을 피하기 위해
            ParentC 컴포넌트에서 prefetch 및 de/hydrate를 수행합니다.
          */}
          <ParentA />
        </Suspense>
        <Suspense fallback={<RenderingPageSkeleton />}>
          {/* 
            실제 사용되는 곳과 가까운 위치에서 prefetch 할 수 있는
            HydratedPhotoList 컴포넌트를 렌더링합니다.
          */}
          <HydratedPhotoList />
        </Suspense>
      </section>
    </main>
  );
}
```

```jsx
import ParentB from "./ParentB";

export default function ParentA() {
  return <ParentB />;
}

///////////////////////////////////////////////////////////

import ParentC from "./ParentC";

export default function ParentB() {
  return <ParentC />;
}

///////////////////////////////////////////////////////////

import HydratedTodoList from "./Todo/hydratedTodoList";

export default function ParentC() {
  return <HydratedTodoList />;
}
```

`ParentC` 컴포넌트(사용하는 곳과 가까운 위치)에서 prefetch 및 de/hydrate를 수행하여 props drilling을 피하고 코드를 더 깔끔하게 유지할 수 있습니다.

하지만 이 방법은 보일러 플레이트 코드가 길어지고, fetch와 useQuery 두 곳에서 캐시 관리를 해줘야 하는 단점이 있습니다.

그렇다면 좀 더 좋은 방법이 있을까요?

## 2-2. 서버와 클라이언트 컴포넌트 인터리빙 하기

```jsx
"use client";

import { Fragment, PropsWithChildren, useState } from "react";

export default function ClientButton({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>up</button>
      {children}
    </Fragment>
  );
}
```

```jsx
import { photoApi } from "@/apis/Photo/Photo.api";
import { todoApi } from "@/apis/Todo/Todo.api";
import ClientButton from "@/components/ClientButton";
import PhotoList from "@/components/Photo/PhotoList";
import TodoList from "@/components/Todo/TodoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function ComponentInterLeavingPage() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>fetch with streaming</h1>
      <Link href="/">go to home</Link>
      <ClientButton>
        <Suspense fallback={"todo loading!!!"}>
          <TodoList
            todosPromise={todoApi.todoList({
              params: {
                cache: "force-cache",
                next: {
                  tags: ["TODO_LIST"],
                },
              },
            })}
          />
        </Suspense>
      </ClientButton>
    </main>
  );
}
```


# 결론

여러가지 시행착오를 겪은 후 fetch 와 tanstack-query를 Win-Win 하면서 사용하는 방법은 아래와 같습니다.

- Case 1 - Authorization 을 포함한 `GET` 요청
    - fetch cache option `no-store` + tanstack-query `staleTime` 설정 및 Client-Side에서 `useQuery` 사용을 권장합니다.
- Case 2 - Authorization 을 포함하지 않는 `GET` 요청
    - fetch 를 독립적으로 사용하는 것을 권장합니다.
- Case 3 - mutate 요청
    - fetch cache option `no-store` + Client-Side에서 `useMutation` 사용을 권장합니다.
- Case 4 - props drilling 깊은 컴포넌트
    - 서버와 클라이언트 컴포넌트의 InterLeaving 을 권장합니다.
    - tanstack-query `Dehydrate`
        - 해당 방식은 사용 가능하지만, 보일러 플레이트 코드가 길어지고, 별도의 캐시 관리가 필요하므로 권장하지 않습니다.
