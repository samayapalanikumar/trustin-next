import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { createTestType } from "../action";
export const metadata: Metadata = {
  title: "Add New Test Type  | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

const NewTestTypePage = () => {
  return (
    <>
      <Breadcrumb pageName="Add New Test Type " />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <form action={createTestType}>
              <div className="p-6.5">
                

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Test Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="Text"
                    name = "name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

               

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    name="description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTestTypePage;
