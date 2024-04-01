// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/lib/utils";

export async function patchSampleWorkflow(
  id: string,
  prevState: any,
  formData: FormData,
) {
  let jsonObject = Object.fromEntries(formData.entries());

  jsonObject.test_params = [];
  console.log(jsonObject);
  console.log(prevState);

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 422) {
    const response = await res.json();
    console.log(response);
    console.log(response.detail[0].loc);
    console.log(response.detail[0].input);
  }
  console.log(res.status);
  if (res.status === 401) redirect("/signin");

  if (res.status !== 200) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Samples");

  if (res.status === 200) {
    console.log("Hi");
    return {
      fieldErrors: null,
      type: "Success",
      message: "Status Approve updated Successfully",
    };
  }
  // if (res.status===200) redirect("/dashboard/samples");
}

export async function patchSampleWorkflowTestResult(id: string, data: any) {
  // let jsonObject  = Object.fromEntries(formData.entries())

  // jsonObject.test_params=[];
  // console.log(jsonObject)
  console.log(data);
  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 422) {
    const response = await res.json();
    console.log(response);
    console.log(response.detail[0].loc);
    console.log(response.detail[0].input);
  }

  if (res.status === 401) redirect("/signin");

  if (res.status !== 200) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Samples");

  if (res.status === 200) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "Status updated Successfully",
    };
  }
  // if (res.status===200) redirect("/dashboard/samples");
}

export async function rejectSampleWorkflow(id: string, data: any) {
  console.log("----");
  console.log(data);
  console.log("----");
  console.log("Hi");

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
    method: "PATCH", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(data),
  });

  if (res.status === 422) {
    const response = await res.json();
    console.log(response);
    console.log(response.detail[0].loc);
    console.log(response.detail[0].input);
  }
  if (res.status === 401) redirect("/signin");

  if (res.status !== 200) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Samples");

  if (res.status === 200) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "Status updated Successfully",
    };
  }
  // if (res.status===200) redirect("/dashboard/samples");
}
