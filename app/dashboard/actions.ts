// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";

export async function logout() {
  cookies().delete("access_token");
  redirect("/signin");
}
