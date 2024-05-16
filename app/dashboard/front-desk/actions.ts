"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SERVER_API_URL } from "@/app/constant";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "@/lib/utils";

const contactPersonsSchema = z.object({
  person_name: z.string(),
  designation: z.string(),
  mobile_number: z.string().refine((value) => /\d{10}/.test(value), {
    message: "Mobile number must be a 10-digit numeric value.",
  }),
  landline_number: z.string().optional(), // Optional field
  contact_email: z.string().email(),
});

export async function createFrontDesk(prevState: any, formData: FormData) {
  let jsonObject = Object.fromEntries(formData.entries());

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/front-desk/`, {
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

  if (res.status !== 200) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Front-desk");

  if (res.status === 200) {
    const error = await res.json();
    console.log(error);
    return {
      fieldErrors: null,
      type: "Success",
      message: "Front Desk Created Successfully",
    };
  }
  // if (res.status===201) redirect("/dashboard/customers");
}

export async function updateCustomers(
  id: any,
  pervState: any,
  formData: FormData,
) {
  let jsonObject = Object.fromEntries(formData.entries());

  const access_token = cookies().get("access_token");
  const res = await fetch(`${SERVER_API_URL}/front-desk/${id}`, {
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

  if (res.status !== 200) {
    const error = await res.json();

    console.log(error);
    return {
      fieldErrors: null,
      type: "Error",
      message: getErrorMessage(error.detail),
    };
  }

  revalidateTag("Front-desk");

  if (res.status === 200) {
    return {
      fieldErrors: null,
      type: "Success",
      message: "Front Desk Page Updated Successfully",
    };
  }
  // if (res.status===204) redirect("/dashboard/customers");
}
