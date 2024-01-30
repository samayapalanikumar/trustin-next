import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import TRFForm from "../client-form";
import { updateTRF } from "../actions";
export const metadata: Metadata = {
  title: "TRF | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id:string) {


  const res = await fetch(`http://localhost:8000/trf/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });



  const trf = await res.json();
  console.log(trf)
  return trf;
}


const CustomerTRFPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await getData(id)
  const updateTRFWithId = updateTRF.bind(null, id)
  return(
    <div className='flex items-center flex-col justify-center mx-auto'>
        <div>
        <h2 className="text-xl font-bold">Test Request Form</h2>
        <h5>{data.trf_code}</h5>
        </div>
        <TRFForm trf={data} updateAction={updateTRFWithId}/>
    </div>
  )
};

export default CustomerTRFPage;
