"use client";

import createTodo from "@/actions/createTodo";

interface RevalidateButtonProps {
  revalidate: () => Promise<void>;
}
export default function RevalidateButton({
  revalidate,
}: RevalidateButtonProps) {
  const handleRevalidate = async () => {
    await createTodo();
  };
  return (
    <form action={revalidate}>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        revalidate (form action)
      </button>
      <button
        type="button"
        className="bg-blue-100 text-black px-4 py-2 rounded"
        onClick={handleRevalidate}
      >
        revalidate (event handler)
      </button>
    </form>
  );
}
