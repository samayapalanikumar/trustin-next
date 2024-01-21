"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function signin(formData: any) {
  console.log("HI");
  const username = formData.get("username");
  const password = formData.get("password");

  const res = await fetch("http://localhost:8000/auth/login/", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
        "Content-Type": "application/json",
    //   "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
        username,
        password
    })
  });

  const resJson = await res.json();

  console.log(resJson);
  cookies().set('access_token', resJson.access_token, )
  redirect('/')
}
