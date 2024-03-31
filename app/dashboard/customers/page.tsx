import Link from "next/link";
import { cookies } from "next/headers";
import CustomerTable from "./customer";
import { redirect } from "next/navigation";

import { Metadata } from "next";
import { SERVER_API_URL } from "@/app/constant";


export const metadata: Metadata = {
  title: "Customers | Trustin",
  description: "This is Customers page ",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  console.log(access_token);
    const res = await fetch(`${SERVER_API_URL}/customers/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token?.value}`,
      },
      next:{
        tags:['Customers']
      }
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok ) {
      // This will activate the closest `error.js` Error Boundary
      // console.log(res)
      throw new Error("Failed to fetch data");
      console.log("error");
    }
    if(res.status===401) redirect('/signin');
    const resjson = await res.json();
    return resjson;

}

export type Data = {
  id: number;
  company_name: string;
  company_id:string;
  customer_code:string;
  email: string;
}[]

const CustomerPage = async () => {
  const data:Data = await getData();
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Customers
        </h2>
        <Link
          href="customers/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 dark:text-white dark:border-white"
        >
          New Customers
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <CustomerTable data={data} />
      </div>
    </>
  );
};

export default CustomerPage;
