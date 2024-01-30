import TableThree from "@/components/Tables/TableThree";
import Link from "next/link";

import { redirect } from "next/navigation";
import TestTypeTable, { TestTypeData } from "./testtype-table";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Type | Trustin",
  description: "This is Test Type page ",
  // other metadata
};
async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  const res = await fetch("http://localhost:8000/testtypes/", {
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
  const resjson = await res.json();
  return resjson;
}

const TestTypePage = async () => {
  const data: TestTypeData[] = await getData();
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Test Types
        </h2>
        <Link
          href="testtype/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          New Test Type
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <TestTypeTable data={data} />
      </div>
    </>
  );
};

export default TestTypePage;
