import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import BatchesAddForm from "./batches-add-form";

export const metadata: Metadata = {
  title: "Add New Batches | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

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

  const customers = await res1.json();

  const res2 = await fetch(`${SERVER_API_URL}/products/`,{
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${access_token?.value}`
    }
  });

  if(!res2.ok){
    console.log("error");
    redirect("/signin")
  }

  const products = await res2.json();

  return {
    customers,
    products
  };
}

export type Data = {

  products:{
    id: number;
    product_name: string | null;

  }[];
  customers:{
    id: number;
    company_name: string | null;
  }[];
  
  
};



const NewBatchesPage = async () => {
  const data:Data = await getData();
  // console.log(data);
  return (
    <>
      <Breadcrumb pageName="Add New Batches" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <BatchesAddForm data={data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBatchesPage;
