"use client";

import { Fragment, PropsWithChildren, useState } from "react";

export default function ClientComponent({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);
  return (
    <Fragment>
      <p>{count}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setCount((prev) => prev + 1)}
      >
        up
      </button>
      {children}
    </Fragment>
  );
}
