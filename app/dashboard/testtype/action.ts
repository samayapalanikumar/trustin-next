

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { getErrorMessage } from "@/lib/utils";
import { revalidateTag } from "next/cache";




export async function createTestType(prevState:any,formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 


  const access_token = cookies().get('access_token')
  
      const res = await fetch(`${SERVER_API_URL}/testtypes/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

      if (res.status === 401) redirect("/signin");

      if (res.status !== 201) {
        const error = await res.json();
        return {
          fieldErrors: null,
          type: "Error",
          message: getErrorMessage(error.detail),
        };
      }
    
      revalidateTag("TestType");
    
      if (res.status === 201) {
        return {
          fieldErrors: null,
          type: "Success",
          message: "Test Type Created Successfully",
        };
      }
    // if (res.status===201) redirect("/dashboard/testtype");
}


export async function updateTestType(prevState:any, id:string,formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 


  const access_token = cookies().get('access_token')
      const res = await fetch(`${SERVER_API_URL}/testtypes/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

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
    
      revalidateTag("TestType");
    
      if (res.status === 204) {
        return {
          fieldErrors: null,
          type: "Success",
          message: "Test Type Updated Successfully",
        };
      }
    // if (res.status===204) redirect("/dashboard/testtype");
}