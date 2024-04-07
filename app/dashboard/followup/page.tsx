import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import FollowupTable, { FollowUP } from "./followup-table";
import { SERVER_API_URL } from "@/app/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Followup | Trustin",
  description: "This is Customer Followup page ",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  const res = await fetch(`${SERVER_API_URL}/followups/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
    next: { tags: ["Followup"] },
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
  console.log(resjson);
  return resjson;
}

const CustomerFollowupPage = async () => {
  const data: FollowUP[] = await getData();

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Customer Followup
        </h2>
        <Link
          href="followup/new"
          className="inline-flex items-center justify-center rounded-md border border-black px-5 py-4 text-center font-medium text-black hover:bg-opacity-90 dark:border-white dark:text-white lg:px-8 xl:px-10"
        >
          New Customer Followup
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <FollowupTable data={data} />
      </div>
    </>
  );
};

export default CustomerFollowupPage;
