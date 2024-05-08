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
