// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { SERVER_API_URL } from "../constant";

export async function updateTRF(trf_code: string, formData) {
  console.log(formData);
  //  const data = Object.fromEntries(formData.entries())
  //  const testDetails = []
  //  const filteredTestDetails = Object.keys(data)
  //  .filter(key => key.match(/^test_details\.\d+\./))
  //  .reduce((result, key) => {
  //    result[key] = data[key];
  //    return result;
  //  }, {});

  //  for (const key in filteredTestDetails) {
  //   if (key.startsWith('test_details.')) {
  //     const index = parseInt(key.match(/\d+/)[0], 10);
  //     const property = key.split('.').slice(2).join('.');

  //     if (!testDetails[index]) {
  //       testDetails[index] = {};
  //     }

  //     testDetails[index][property] = parseInt(filteredTestDetails[key], 10);
  //   }
  // }

  // for (const key in data) {
  //   if (key.startsWith('test_details.')) {
  //     delete data[key];
  //   }
  // }
  // data.test_details = testDetails
  const nabl_logo = formData.nabl_logo === "1" ? true : false;
  formData.nabl_logo = nabl_logo;
  const bodyData = JSON.stringify(formData);

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/trf/${trf_code}`, {
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

  if (res.status == 204) {
    permanentRedirect("/trf/success");
  }
}
