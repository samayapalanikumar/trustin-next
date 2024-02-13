import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { updateTestType } from "../action";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";
export const metadata: Metadata = {
  title: "Edit  Test Type | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id:string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}testtypes/${id}`, {
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
  const user = await res.json();
  return user;
}

type Data = {
  name: string;
  description:string;
}

const EditTestTypePage =  async ({
  params: { id },
}: {
  params: { id: string };
}) => {

  const data:Data = await getData(id)
  const updateTestTypeWithId = updateTestType.bind(null, id)

  return (
    <>
      <Breadcrumb pageName="Edit  Test Type" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <form action={updateTestTypeWithId}>
              <div className="p-6.5">
                

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Test Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="Text"
                    name = "name"
                    defaultValue={data.name}
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
                    defaultValue={data.description}
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

export default EditTestTypePage;
