import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import BranchAddForm from "./branch-add-form";



export const metadata: Metadata = {
  title: "Add New Branch | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

const NewBranchPage = () => {
  return (
    <>
      <Breadcrumb pageName="Add New Branch" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <BranchAddForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBranchPage;
