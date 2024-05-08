import { photoApi } from "@/apis/Photo/Photo.api";
import { todoApi } from "@/apis/Todo/Todo.api";
import ClientButton from "@/components/ClientButton";
import PhotoList from "@/components/Photo/PhotoList";
import TodoList from "@/components/Todo/TodoList";
import Link from "next/link";
import { Suspense } from "react";

export default async function FetchWithStreamingPage() {
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
      <section className="flex min-h-screen flex-row p-24">
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
        <Suspense fallback={"photo loading!!!"}>
          <PhotoList
            photosPromise={photoApi.photoList({
              params: {
                cache: "force-cache",
                next: {
                  tags: ["PHOTO_LIST"],
                },
              },
            })}
          />
        </Suspense>
      </section>
    </main>
  );
}
