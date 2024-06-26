import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import SamplesAddForm from "./samples-add-form";


export const metadata: Metadata = {
  title: "Add New Sample | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/batches/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res1 = await fetch(`${SERVER_API_URL}/parameters/`, {
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

  const batches = await res.json();
  const parameters = await res1.json();
 
  return { batches, test_params: parameters };
}

export type Data = {
  id: number;
  branch_name: string;
}[];

const NewSamplePage = async () => {
  const data = await getData();
  return (
    <>
      <Breadcrumb pageName="Add New Sample" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <SamplesAddForm data={data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSamplePage;
