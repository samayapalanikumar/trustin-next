"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { URLSearchParams } from "url";
import { SERVER_API_URL } from "@/app/constant";

export async function signin(formData: any) {
  console.log("HI");
  const username = formData.get("username");
  const password = formData.get("password");

  const res = await fetch(`${SERVER_API_URL}/auth/login/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const resJson = await res.json();

  console.log(resJson);
  cookies().set("access_token", resJson.access_token);
  redirect("/");
}

export async function signinJwt(formData: any) {

  const username = formData.get("username");
  const password = formData.get("password");
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "");
  params.append("client_id", "");
  params.append("client_secret", "");

  try {
    const res = await fetch(`${SERVER_API_URL}auth/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const resJson = await res.json();

    console.log(resJson);
    cookies().set("access_token", resJson.access_token);
  } catch (e) {
    console.log(e);
  }

  redirect("/dashboard");
}
