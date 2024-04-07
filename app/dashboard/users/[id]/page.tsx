import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { updateUser } from "../actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import { User } from "@/types/user";
import { Department } from "@/types/department";
import { TestType } from "@/types/test-type";
import { Role } from "@/types/role";
import EditUserForm from "./edit-user-form";

export const metadata: Metadata = {
  title: "Edit  User | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
    next:{
      tags:['Users']
    }
  });
  const res1 = await fetch(`${SERVER_API_URL}/roles/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res2 = await fetch(`${SERVER_API_URL}/departments/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res3 = await fetch(`${SERVER_API_URL}/testtypes/`, {
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
  const roles = await res1.json();
  const departments = await res2.json();
  const test_types = await res3.json();
  return { user, roles, departments, test_types };
}

type Data = {
  user: User;
  roles: Role[];
  departments: Department[];
  test_types: TestType[];
};

const EditUserPage = async ({ params: { id } }: { params: { id: string } }) => {
  const { user, roles, departments, test_types }: Data = await getData(id);
  const updateUserWithId = updateUser.bind(null, id );
  return (
    <>
      <Breadcrumb pageName="Edit New User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <EditUserForm
              roles={roles}
              departments={departments}
              test_types={test_types}
              user={user}
              actionFn={updateUserWithId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserPage;
