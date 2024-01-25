// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function createParameters(formData: FormData) {
  let jsonObject  = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );
 


  const access_token = cookies().get('access_token')
    try {
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

      const resJson = await res.json();

      console.log(resJson);
    } catch (e) {
      console.log(e);
    }

    redirect("/dashboard/parameters");
}
