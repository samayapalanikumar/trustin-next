// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";




export async function createRegistration(jsonObject) {
 

  console.log(jsonObject)
  const access_token = cookies().get('access_token')
 
      const res = await fetch(`${SERVER_API_URL}registrations/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

      const response = await res.json()
      console.log(response)
     

      if(res.status===401) redirect('/signin');
      if (res.status===201) redirect("/dashboard/registrations");
}


export async function updateRegistration(id:string, data) {
  let jsonObject  = data


  const access_token = cookies().get('access_token')

      const res = await fetch(`${SERVER_API_URL}registrations/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

      if (res.status==422){
        const resJson =  await res.json()

        console.log(resJson)
        console.log(resJson.loc)
        console.log(resJson.input)
      }

      if(res.status===401) redirect('/signin');
      if (res.status===204) redirect("/dashboard/registrations");
}