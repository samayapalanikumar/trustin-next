"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/lib/utils";

export async function updateTRFAdmin(id: string, formData: any) {
  const nabl_logo = formData.nabl_logo === "1" ? true : false;
  formData.nabl_logo = nabl_logo;
  const bodyData = JSON.stringify(formData);
  console.log(bodyData);
  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/trf/admin/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: bodyData,
  });

  if (res.status == 422) {
    const resJson = await res.json();
    resJson.detail.map((error: any) => {
      console.log(error.loc);
      // console.log(error.input)
    });
  }
  if (res.status === 401) redirect("/signin");

  if (res.status !== 204) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("TRF");

  if (res.status === 204) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "TRF Updated Successfully",
    };
  }
  // if (res.status===204) redirect("/dashboard/trf");
}
