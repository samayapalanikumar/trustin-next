import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import SamplesForm from "./sample-form";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";
import { redirect } from "next/navigation";
import { createRegistration, updateRegistration } from "../../actions";
import { createSamples } from "./actions";
// import { createBranch } from "../actions";

export const metadata: Metadata = {
  title: "New Samples | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}registrations/${id}/batches/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res1 = await fetch(`${SERVER_API_URL}registrations/${id}/`, {
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
  const reg = await res1.json();
 
  return { batches, test_params: reg.test_params };
}

const EditRegistrationPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await getData(id);
  const createSamplesWithRegId = createSamples.bind(null, id)
  return (
    <>
      <Breadcrumb pageName="Samples Form" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
          </div>
          <SamplesForm data={data} createFn={createSamplesWithRegId}/>
        </div>
      </div>
    </>
  );
};

export default EditRegistrationPage;
