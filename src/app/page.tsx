import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-8 p-24 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-black">Various Examples</h1>
      <Link
        className="w-auto h-fit border border-gray-300 rounded-lg p-4 text-black hover:bg-blue-100"
        href="/dehydrate-with-streaming"
      >
        Go to Dehydrate with Streaming
      </Link>
      <Link
        className="w-auto h-fit border border-gray-300 rounded-lg p-4 text-black hover:bg-blue-100"
        href="/fetch-with-streaming"
      >
        Go to Fetch with Streaming
      </Link>
      <Link
        className="w-auto h-fit border border-gray-300 rounded-lg p-4 text-black hover:bg-blue-100"
        href="/client-tanstack-query"
      >
        Go to Client Tanstack Query
      </Link>
    </main>
  );
}
