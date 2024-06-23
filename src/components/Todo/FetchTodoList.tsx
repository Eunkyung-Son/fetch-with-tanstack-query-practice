"use client";

import { TodoType } from "@/apis/Photo/types/model/todo";
import { use } from "react";

interface FetchTodoListProps {
  todosPromise: Promise<TodoType[]>;
}

const FetchTodoList = ({ todosPromise }: FetchTodoListProps) => {
  // Streaming data from the server to the client
  const todos = use(todosPromise);
  return (
    <div className="flex flex-col gap-2">
      {todos?.map(({ userId, title, completed }) => (
        <div
          key={`${userId}_${title}`}
          className="flex flex-col h-36 rounded border border-gray-400 justify-center p-5"
        >
          <p>userId: {userId}</p>
          <p>title: {title}</p>
          <p>completed: {String(completed)}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchTodoList;
