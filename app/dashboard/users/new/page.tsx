import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import NewUserForm from "./new-user-form";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";
import { redirect } from "next/navigation";

import type { Role } from "@/types/role";
import type { Department } from "@/types/department";
import type { TestType } from "@/types/test-type";


export const metadata: Metadata = {
  title: "Add New User | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/roles/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res1 = await fetch(`${SERVER_API_URL}/departments/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res2 = await fetch(`${SERVER_API_URL}/testtypes/`, {
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
  if (!res1.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }
  if (!res2.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }

  if (res.status === 401) redirect("/signin");
  if (res1.status === 401) redirect("/signin");
  if (res2.status === 401) redirect("/signin");

  const roles = await res.json();
  const departments = await res1.json();
  const test_types = await res2.json();

  return {roles, departments, test_types};
}
type Data = {
  roles: Role[];
  departments: Department[];
  test_types: TestType[];
};

const NewUserPage = async () => {
  const {roles, departments, test_types}:Data = await getData();
  return (
    <>
      <Breadcrumb pageName="Add New User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
           <NewUserForm  roles={roles} departments={departments} test_types={test_types}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewUserPage;
