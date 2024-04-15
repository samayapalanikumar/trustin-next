import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import TRFAdminForm from "./trf-edit-form";
import { updateTRFAdmin } from "../actions";
import { cookies } from "next/headers";
import { Data } from "./typings";
import { SERVER_API_URL } from "@/app/constant";
export const metadata: Metadata = {
  title: "Edit TRF | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id:string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  const res = await fetch(`${SERVER_API_URL}/trf/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
      cache: 'no-store'

    },
    next:{
      tags:["TRF"]
    }
  });
  const res2 = await fetch(`${SERVER_API_URL}/products/trf`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res3 = await fetch(`${SERVER_API_URL}/testtypes/trf`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res2.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }

  if(!res.ok){
    console.log(res)
  }

  const trf = await res.json();
  const products = await res2.json();
  const test_types = await res3.json();
  console.log(trf)
  return({
    products,
    test_types,
    trf,
  });
}


const EditTestParameterPage = async({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data:Data = await getData(id)
  const updateTRFWithId = updateTRFAdmin.bind(null, id)
  return (
    <>
      <Breadcrumb pageName="Edit  TRF" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
           <TRFAdminForm data={data} updateAction={updateTRFWithId}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTestParameterPage;
