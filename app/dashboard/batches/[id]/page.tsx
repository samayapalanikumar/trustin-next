import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateBatches } from "../actions";
import { SERVER_API_URL } from "@/app/constant";
import BatchesEditForm from "./batches-form";

export const metadata: Metadata = {
  title: "Edit  Batches | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/batches/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
    redirect("/signin");
  }

  const res1 = await fetch(`${SERVER_API_URL}/customers/`,{
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token?.value}`
    }
  })

  if(!res1.ok){
    console.log("error");
    redirect("/signin");
  }

 

  const res2 = await fetch(`${SERVER_API_URL}/products/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  if(!res2.ok){
    console.log("error");
    redirect("/signin");
  }

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

 
  const data = await res.json();
  const customer = await res1.json();
  const product = await res2.json();
  
  return {
    batches: data,
    customer,
    product
  };
}

export type Data = {
  batches:{
    id: number;
  product:{
    product_name: string | null;

  };
  customer:{
    company_name: string | null;
  };
  } 
  product:{
    product_name: string | null;

  };
  customer:{
    company_name: string | null;
  };
  
  
};
const BatchesEditPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data: Data = await getData(id);
  const updateBatchesWithId = updateBatches.bind(null, id);

  return (
    <>
      <Breadcrumb pageName="Edit Batches" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <BatchesEditForm data={data} actionFn={updateBatchesWithId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BatchesEditPage;
