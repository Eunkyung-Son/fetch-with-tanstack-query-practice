"use server";

import { revalidateTag } from "next/cache";

export default async function createTodo() {
  // try {
  //   // create todo list
  // } catch (error) {
  //   // ...
  // }

  revalidateTag("TODO_LIST");
}
