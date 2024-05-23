import Link from "next/link";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { SERVER_API_URL } from "@/app/constant";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChangePasswordForm from "./password-change-form";

export const metadata: Metadata = {
  title: "Change Password | Trustin",
  description: "This is Password Change page ",
  // other metadata
};



const BranchesPage = async () => {
  return (
    <>
    <Breadcrumb pageName="Password Change" />

    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contact Form
            </h3>
          </div> */}
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  </>
  );
};

export default BranchesPage;
