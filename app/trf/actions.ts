
"use server";
import { permanentRedirect } from "next/navigation";
import { SERVER_API_URL } from "../constant";

export async function updateTRF(trf_code: string, formData:any) {
  console.log(formData);

  const nabl_logo = formData.nabl_logo === "1" ? true : false;
  formData.nabl_logo = nabl_logo;
  const bodyData = JSON.stringify(formData);


  const res = await fetch(`${SERVER_API_URL}/trf/${trf_code}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyData,
  });


  if (res.status == 422) {
    const resJson = await res.json()
    resJson.detail.map((error:any) => {
      console.log(error.loc);
      // console.log(error.input)
    });
  }

  if (res.status == 204) {
    permanentRedirect("/trf/success");
  }
}
