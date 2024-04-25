import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-24">
      <h1>Various examples</h1>
      <Link
        className="w-auto h-fit border-white-100 rounded-12 p-12 text-black hover:bg-blue-100"
        href="/dehydrate-with-streaming"
      >
        go to dehydrate-with-steaming
      </Link>
      <Link href="/fetch-with-streaming">go to fetch-with-streaming</Link>
      <Link href="/client-tanstack-query">go to client-tanstack-query</Link>
      <Link href="/client-tanstack-query-2">go to client-tanstack-query-2</Link>
    </main>
  );
}
