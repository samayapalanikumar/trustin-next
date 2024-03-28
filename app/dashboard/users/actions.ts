// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";

import { z } from "zod";

const schema = z
  .object({
    firstname: z
      .string()
      .min(1, 'First Name Required')
      .trim(),
    firstname: z
      .string()
      .min(1, 'Last Name Required')
      .trim(),
    email: z
      .string()
      .email('Invalid Required')
      .trim(),
    
    phone: z.string().trim().min(1, "Password Required").max(10, "Enter valid 10 digit phone number"),
  })


export async function createUser(prevState, formData: FormData) {
  let jsonObject = Object.fromEntries(formData.entries());

  if (1 === 0) {
    return {
      fieldErrors: null,
      message: "",
    };
  }
  console.log(jsonObject)
  if(jsonObject['qa_type_id'] == 'null')
    jsonObject['qa_type_id'] = null
    // delete jsonObject["qa_type_id"]
  console.log(jsonObject)
  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 401) redirect("/signin");
  if (res.status === 201) redirect("/dashboard/users");
}

export async function updateUser(id: string, formData: FormData, ) {
  console.log(formata)
  let jsonObject = Object.fromEntries(formData.entries());

  if(jsonObject['qa_type_id'] == 'null')
  jsonObject['qa_type_id'] = null

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 401) redirect("/signin");
  if (res.status === 204) redirect("/dashboard/users");
}
