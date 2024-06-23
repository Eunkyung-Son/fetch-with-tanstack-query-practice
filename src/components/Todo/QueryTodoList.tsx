"use client";

import { useTodoListQuery } from "@/apis/Todo/Todo.query";
interface QueryTodoListProps {
  isSuspense?: boolean;
}
const QueryTodoList = ({ isSuspense }: QueryTodoListProps) => {
  const { data: todos } = useTodoListQuery({
    options: {
      staleTime: 1000 * 5,
      suspense: isSuspense,
    },
  });

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

export default QueryTodoList;
