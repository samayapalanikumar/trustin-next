import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import RegistrationForm from "./form";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";
import { redirect } from "next/navigation";
import { createRegistration } from "../actions";
// import { createBranch } from "../actions";

export const metadata: Metadata = {
  title: "Add New Registration | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/trf/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res2 = await fetch(`${SERVER_API_URL}/customers/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res3 = await fetch(`${SERVER_API_URL}/branch/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res4 = await fetch(`${SERVER_API_URL}/products/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res5 = await fetch(`${SERVER_API_URL}/parameters/`, {
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
  if (res2.status === 401) redirect("/signin");
  if (res3.status === 401) redirect("/signin");
  if (res4.status === 401) redirect("/signin");
  if (res4.status === 401) redirect("/signin");
  if (res5.status === 401) redirect("/signin");

  const trfRes = await res.json();
  const customers = await res2.json();
  const branches = await res3.json();
  const products = await res4.json();
  const parameters = await res5.json();

  const trf = trfRes.map((t:any) => ({ label: t.trf_code, value: t.id })) ;
  console.log(trf)
  return { trf: trf, customers, branches, products, parameters };
}

const NewRegistrationPage = async () => {
  const data = await getData();
  return (
    <>
      <Breadcrumb pageName="Registration Form" />

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
          <RegistrationForm data={data} />
        </div>
      </div>
    </>
  );
};

export default NewRegistrationPage;
