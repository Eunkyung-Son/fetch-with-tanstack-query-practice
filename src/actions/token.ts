"use server";

import { cookies } from "next/headers";

export async function setToken({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  cookies().set("access", access);
  cookies().set("refresh", refresh);
}

export async function deleteToken() {
  cookies().delete("access");
  cookies().delete("refresh");
}
