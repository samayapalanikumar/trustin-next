// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";




export async function createSamples(id, data: any) {
  let {samples}  = data

  
  console.log("CCCC")
  console.log(samples[0]["test_params"])
console.log(samples)

  const access_token = cookies().get('access_token')
 
      const res = await fetch(`${SERVER_API_URL}registrations/${id}/samples`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(samples),
      });

    console.log(res.status)

      if(res.status===401) redirect('/signin');
      if (res.status===200) redirect("/dashboard/samples");
}


export async function updateUser(id:string,formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 


  const access_token = cookies().get('access_token')

      const res = await fetch(`${SERVER_API_URL}users/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

    
      if(res.status===401) redirect('/signin');
      if (res.status===204) redirect("/dashboard/users");
}