import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BranchType } from "../branch-table";
import { updateBranch } from "../actions";
import { SERVER_API_URL } from "@/app/constant";
import BranchEditForm from "./branch-edit-form";
export const metadata: Metadata = {
  title: "Edit  Branch | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/branch/${id}`, {
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
    redirect("/signin");
  }
  const branch = await res.json();
  return branch;
}

export type Data = {
  branch_name: string;
  address_line1: string;
  address_line2: string;
  mobile_number: string;
  landline_number: string;
  email: string; // Assuming EmailStr is a custom type that represents a valid email string
  pan_no: string;
  cin: string;
  gstin: string;
  bank_details: string;
  ifsc_code: string;
};

const EditBranchPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data: Data = await getData(id);
  const updateBranchWithId = updateBranch.bind(null, id);

  return (
    <>
      <Breadcrumb pageName="Edit New Branch" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <BranchEditForm actionFn={updateBranchWithId} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBranchPage;
