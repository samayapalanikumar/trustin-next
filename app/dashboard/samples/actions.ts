// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { json } from "stream/consumers";




export async function patchSampleWorkflow(id:string,formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 
  jsonObject.test_params=[];
  console.log(jsonObject)

  const access_token = cookies().get('access_token')
 
      const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

      if(res.status===422){
        const response = await res.json()
        console.log(response)
        console.log(response.detail[0].loc)
        console.log(response.detail[0].input)
      }

      if(res.status===401) redirect('/signin');
      if (res.status===200) redirect("/dashboard/samples");
}

export async function patchSampleWorkflowTestResult(id:string,data:any) {
  // let jsonObject  = Object.fromEntries(formData.entries())
 
  // jsonObject.test_params=[];
  // console.log(jsonObject)
  console.log(data)
  const access_token = cookies().get('access_token')
 
      const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(data),
      });

      if(res.status===422){
        const response = await res.json()
        console.log(response)
        console.log(response.detail[0].loc)
        console.log(response.detail[0].input)
      }

      if(res.status===401) redirect('/signin');
      if (res.status===200) redirect("/dashboard/samples");
}

export async function rejectSampleWorkflow(id:string,data:any) {
  console.log("----")
  console.log(data)
  console.log("----")
  console.log("Hi")

  const access_token = cookies().get('access_token')
 
      const res = await fetch(`${SERVER_API_URL}/samples/${id}`, {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(data),
      });

      if(res.status===422){
        const response = await res.json()
        console.log(response)
        console.log(response.detail[0].loc)
        console.log(response.detail[0].input)
      }

      if(res.status===401) redirect('/signin');
      if (res.status===200) redirect("/dashboard/samples");
}

