import Link from "next/link";
import QueryPhotoList from "@/components/Photo/QueryPhotoList";
import QueryTodoList from "@/components/Todo/QueryTodoList";

export default function ClientTanstackQueryPage() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-5xl font-bold mb-4">client-side useQuery</p>
      <Link href="/" className="text-blue-500 mb-4">
        go to example list
      </Link>

      <div className="flex justify-between w-full max-w-screen-xl">
        <div className="flex flex-row justify-center gap-8 w-full">
          <div className="flex flex-col w-full max-w-md">
            <p className="text-2xl font-medium mb-4">Todo List</p>
            <QueryTodoList />
          </div>
          <div className="flex flex-col w-full max-w-md">
            <p className="text-2xl font-medium mb-4">Photo List</p>
            <QueryPhotoList />
          </div>
        </div>
      </div>
    </div>
  );
}
