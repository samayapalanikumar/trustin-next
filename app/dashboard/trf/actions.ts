// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function updateTRFAdmin(id:string,formData: FormData) {
  
  const nabl_logo = formData.nabl_logo === "1" ? true : false;
  formData.nabl_logo = nabl_logo;
  const bodyData = JSON.stringify(formData);
  console.log(bodyData)
  const access_token = cookies().get("access_token");

  const res = await fetch(`http://localhost:8000/trf/admin/${id}`, {
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
    resJson.detail.map((error) => {
      console.log(error.loc);
      // console.log(error.input)
    });
  }

  if(res.status===401) redirect('/signin');
  if (res.status===204) redirect("/dashboard/trf");
}
