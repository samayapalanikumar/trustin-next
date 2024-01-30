// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const contactPersonsSchema = z.object({
  person_name: z.string(),
  designation: z.string(),
  mobile_number: z.string().refine((value) => /\d{10}/.test(value), {
    message: "Mobile number must be a 10-digit numeric value.",
  }),
  landline_number: z.string().optional(), // Optional field
  contact_email: z.string().email(),
});

const customerSchema = z.object({
  company_name: z.string(),
  customer_address_line1: z.string(),
  customer_address_line2: z.string(),
  city: z.string(),
  state: z.string(),
  pincode_no: z.string(),
  website: z.string(),
  email: z.string().email(),
  nature_of_business: z.string(),
  product_details: z.string(),
  market: z.string(),
  regulatory: z.string(),
  pan: z.string(),
  gst: z.string(),
  contact_persons: z.array(contactPersonsSchema),
});

export async function createCustomers(formData: FormData) {
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

      const res = await fetch("http://localhost:8000/customers/", {
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
    if (res.status===201) redirect("/dashboard/customers");
}

export async function updateCustomers(id, formData: FormData) {
  let jsonObject  = Object.fromEntries(formData.entries());
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

    

    if(res.status===401) redirect('/signin');

    if (res.status===204) redirect("/dashboard/customers");
}
