import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { updateCustomers } from "../actions";
import { SERVER_API_URL } from "@/app/constant";
import CustomerEditForm from "./customer-edit-form";
import { Customer } from "./typings";

export const metadata: Metadata = {
  title: "Edit  Customer | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");
  console.log(access_token);
  try {
    const res = await fetch(`${SERVER_API_URL}/customers/${id}`, {
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

    const resjson = await res.json();
    return resjson;
  } catch (e) {
    console.log(e);
  }
}

const EditCustomerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data:Customer = await getData(id);
  const updateWithId = updateCustomers.bind(null, id)
  console.log(data);
  return (
    <>
      <Breadcrumb pageName="Edit  Customer" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
           <CustomerEditForm data={data} actionFn={updateWithId}/>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default EditCustomerPage;
