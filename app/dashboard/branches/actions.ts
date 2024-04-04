
"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { getErrorMessage } from "@/lib/utils";
import { revalidateTag } from "next/cache";



export async function createBranch(prevState:any, formData: FormData) {
  let jsonObject = Object.fromEntries(formData.entries());

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/branch/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status == 422) {
    const resJson = await res.json()
    console.log(resJson)
    resJson.detail.map((error:any) => {
      console.log(error.loc);
      // console.log(error.input)
    });
  }

  if (res.status === 401) redirect("/signin");

  if (res.status !== 201) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Branch");

  if (res.status === 201) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "Branch Created Successfully",
    };
  }
  // if (res.status === 201) redirect("/dashboard/branches");
}

export async function updateBranch(id: string, prevState:any, formData: FormData) {
  let jsonObject = Object.fromEntries(formData.entries());

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/branch/${id}`, {
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

  if (res.status !== 204) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Branch");

  if (res.status === 204) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "Branch Updated Successfully",
    };
  }
  // if (res.status === 204) redirect("/dashboard/branches");
}
