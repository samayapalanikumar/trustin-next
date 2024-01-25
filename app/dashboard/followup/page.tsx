import TableThree from "@/components/Tables/TableThree";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import FollowupTable, { FollowUP } from "./followup-table";
async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  try {
    const res = await fetch("http://localhost:8000/followups/", {
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
      redirect("/signin")
    }

    const resjson = await res.json();
    return resjson;
  } catch (e) {
    console.log(e);
  }
}

const CustomerFollowupPage = async () => {
  const data: FollowUP[] = await getData()

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Customer Followup 
        </h2>
        <Link
          href="followup/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
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
