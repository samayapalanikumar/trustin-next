"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/lib/utils";

export async function createSamples(id: string, data: any) {
  let { samples } = data;

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/registrations/${id}/samples`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(samples),
  });

  console.log(res.status);

  if (res.status == 422) {
    const resJson = await res.json();

    console.log(resJson);
    console.log(resJson.detail[0].loc);
    console.log(resJson.detail[0].input);
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
      message: "Samples created Successfully",
    };
  }
  // if (res.status===200) redirect("/dashboard/samples");
}
