import TableThree from "@/components/Tables/TableThree";
import Link from "next/link";
import RegistrationTable, { RegisterType } from "./registrations-table";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration | Trustin",
  description: "This is Users page ",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}registrations/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }

  if (res.status === 401) redirect("/signin");

  const users = await res.json();

  return users;
}

const RegistrationPage = async () => {
  const data: RegisterType = await getData();
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Registrations
        </h2>
        <Link
          href="registrations/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10 dark:text-white dark:border-white"
        >
          New Registration
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <RegistrationTable data={data} />
      </div>
    </>
  );
};

export default RegistrationPage;
