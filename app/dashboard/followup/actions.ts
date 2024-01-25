// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function createFollowup(formData: FormData) {
  let jsonObject  = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );
 


  const access_token = cookies().get('access_token')
    try {
      const res = await fetch("http://localhost:8000/followups/", {
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

    redirect("/dashboard/followup");
}

export async function updateCustomers(id, formData: FormData) {
  let jsonObject  = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {}
  );
  const contact_persons = [
    {
      person_name: jsonObject.person_name,
      designation: jsonObject.designation,
      mobile_number: jsonObject.mobile_number,
      landline_number: jsonObject.landline_number,
      contact_email: jsonObject.contact_email,
    },
  ];
  delete jsonObject["person_name"];
  delete jsonObject["designation"];
  delete jsonObject["mobile_number"];
  delete jsonObject["landline_number"];
  delete jsonObject["contact_email"];

  jsonObject["contact_persons"] = contact_persons;
  console.log(jsonObject);
  const access_token = cookies().get('access_token')
      const res = await fetch(`http://localhost:8000/customers/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        // mode: "cors", // no-cors, *cors, same-origin
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          Authorization:`Bearer ${access_token?.value}`,

        },
        body: JSON.stringify(jsonObject),
      });

      if (!res.ok){
        redirect('/signin')
      }

      const resJson = await res.json();

      console.log(resJson);


    redirect("/dashboard/customers");
}
