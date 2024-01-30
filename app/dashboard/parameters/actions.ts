// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function createParameters(formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 


  const access_token = cookies().get('access_token')
      const res = await fetch("http://localhost:8000/parameters/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

  
   
    if(res.status===401) redirect('/signin');
    if (res.status===201) redirect("/dashboard/parameters");
}


export async function updateParameter(id:string,formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries())
 


  const access_token = cookies().get('access_token')
      const res = await fetch(`http://localhost:8000/parameters/${id}`, {
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
    if (res.status===204) redirect("/dashboard/parameters");
}