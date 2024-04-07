import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateProducts } from "../actions";
import { SERVER_API_URL } from "@/app/constant";
import ProductEditForm from "./product-edit-form";

export const metadata: Metadata = {
  title: "Edit  Product | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  const res2 = await fetch(`${SERVER_API_URL}/branch/`, {
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
  const data = await res.json();
  const branches = await res2.json();
  return {
    product: data,
    branches,
  };
}

export type Data = {
  product: {
    branch_id: number;
    product_name: string;
    description: string;
  };
  branches: {
    id: number;
    branch_name: string;
  }[];
};

const EditProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data: Data = await getData(id);
  const updateProductWithId = updateProducts.bind(null, id);

  return (
    <>
      <Breadcrumb pageName="Edit  Product" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <ProductEditForm data={data} actionFn={updateProductWithId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
