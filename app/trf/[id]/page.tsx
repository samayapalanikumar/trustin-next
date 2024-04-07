import { Metadata } from "next";
import TRFForm from "../client-form";
import { updateTRF } from "../actions";
import { SERVER_API_URL } from "@/app/constant";
import { TestReportForm } from "../typings";

export const metadata: Metadata = {
  title: "TRF | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const res = await fetch(`${SERVER_API_URL}/trf/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const trf = await res.json();
  console.log(trf);
  return trf;
}

const CustomerTRFPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data:TestReportForm = await getData(id);
  const updateTRFWithId = updateTRF.bind(null, id);
  return (
    <div className="mx-auto flex flex-col items-center justify-center bg-boxdark-2 text-bodydark">
      <div>
        <h2 className="p-1 text-xl font-bold">Test Request Form</h2>
        <h5 className="p-1 text-center">{data.trf_code}</h5>
      </div>
      <TRFForm trf={data} updateAction={updateTRFWithId} />
    </div>
  );
};

export default CustomerTRFPage;
