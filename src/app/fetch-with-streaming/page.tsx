import { Suspense } from "react";
import { revalidateTag } from "next/cache";
import Link from "next/link";

import ClientComponent from "app/fetch-with-streaming/_source/components/ClientComponent";
import ListSkeleton from "@/components/ListSkeleton";
import FetchPhotoList from "@/components/Photo/FetchPhotoList";
import PromiseResolveHelper from "@/components/PromiseResolveHelper";
import RevalidateButton from "app/fetch-with-streaming/_source/components/RevalidateButton";
import FetchTodoList from "@/components/Todo/FetchTodoList";
import { todoApi } from "@/apis/Todo/Todo.api";
import { PhotoType } from "@/apis/Todo/types/model/photo";
import { photoApi } from "@/apis/Photo/Photo.api";

export default async function FetchWithStreamingPage() {
  async function revalidateTodo() {
    "use server";
    revalidateTag("TODO_LIST");
  }

  return (
    <div className="flex flex-col items-center p-6">
      <p className="text-5xl font-bold mb-6">fetch with streaming</p>
      <Link href="/" className="text-blue-500 mb-6">
        go to example list
      </Link>
      <ClientComponent>
        <div className="flex w-full max-w-screen-xl gap-10 justify-center flex-wrap">
          <div className="flex flex-col items-center w-full max-w-md">
            <div className="flex flex-col items-center gap-4 w-full mb-4">
              <p className="text-2xl font-medium">Todo List</p>
              <div className="flex gap-2">
                <RevalidateButton revalidate={revalidateTodo} />
              </div>
            </div>
            <Suspense fallback={<ListSkeleton />}>
              <FetchTodoList
                todosPromise={todoApi.todoList({
                  params: {
                    cache: "force-cache",
                  },
                })}
              />
            </Suspense>
          </div>
          <div className="flex flex-col items-center w-full max-w-md">
            <p className="text-2xl font-medium mb-4">Photo List</p>
            <Suspense fallback={<ListSkeleton />}>
              <PromiseResolveHelper<PhotoType[]>
                promise={photoApi.photoList({
                  params: {
                    cache: "force-cache",
                  },
                })}
              >
                {({ data }) => <FetchPhotoList photos={data} />}
              </PromiseResolveHelper>
            </Suspense>
          </div>
        </div>
      </ClientComponent>
    </div>
  );
}
