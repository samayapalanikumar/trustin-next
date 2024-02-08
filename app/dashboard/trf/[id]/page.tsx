import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import TRFAdminForm from "./form";
import { updateTRFAdmin } from "../actions";
import { cookies } from "next/headers";
import { Data } from "./typings";
export const metadata: Metadata = {
  title: "Edit TRF | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id:string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  const res = await fetch(`http://localhost:8000/trf/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
      cache: 'no-store'

    },
  });
  const res2 = await fetch("http://localhost:8000/products/trf", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res3 = await fetch("http://localhost:8000/testtypes/trf", {
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
    redirect("/signin");
  }

  const trf = await res.json();
  const products = await res2.json();
  const test_types = await res3.json();
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
