import TableThree from "@/components/Tables/TableThree";
import { cookies } from "next/headers";
import Link from "next/link";

import { redirect } from "next/navigation";
import TRFTable, { TRFType } from "./trf-table";
import { Metadata } from "next";
import { SERVER_API_URL } from "@/app/constant";


export const metadata: Metadata = {
  title: "TRF | Trustin",
  description: "This is TRF page ",
  // other metadata
};
async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
    const res = await fetch(`${SERVER_API_URL}/trf/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token?.value}`,
      },
      next:{tags:['TRF']}
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // console.log(res)
      // throw new Error("Failed to fetch data");
      console.log("error");
    }
    if (res.status===401) redirect('/signin')
    const resjson = await res.json();
    return resjson;
 
}

const TRFPage = async () => {
  const data: TRFType = await getData();
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          TRF
        </h2>
        {/* <Link
          href="trf/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          New TRF
        </Link> */}
      </div>
      <div className="flex flex-col gap-10">
        <TRFTable data={data} />
      </div>
    </>
  );
};

export default TRFPage;
