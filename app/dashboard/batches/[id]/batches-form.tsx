"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/submit-button/submit-button";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Data } from "./page";

type InitialState = {
  fieldErrors?: {} | null;
  type?: string | null;
  message?: any | string | null;
};

const initialState: InitialState = {
  fieldErrors: {},
  type: null,
  message: null,
};

type Props = {
  data: Data;
  actionFn: (
    prevState: any,
    formData: FormData,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
};

const BatchesEditForm = ({ data, actionFn }: Props) => {
  const [state, formAction] = useFormState(actionFn, initialState);
  const router = useRouter();
  useEffect(() => {
    if (state?.type === null) return;

    if (state?.type === "Error") {
      toast.error(state?.message, {
        duration: 10000,
        closeButton: true,
      });
    }
    if (state?.type === "Success") {
      toast.success(state?.message, {
        duration: 10000,
        closeButton: true,
      });
      router.push("/dashboard/batches");
    }
  }, [state, router]);
  return (
    <>
    <form action={formAction}>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Branch
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              name="batches_id"
              defaultValue={data.product.branch_id}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              {data.branches.map((branch) => (
                <option value={branch.id} key={branch.id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Product Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="Text"
            name="product_name"
            defaultValue={data.product.product_name}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block text-black dark:text-white">
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            defaultValue={data.product.description}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
        </div>

        <SubmitButton />
      </div>
    </form>
    <form action={formAction}>
      <div className="p-6.5 pt-4">
      <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Batch No <span className="text-meta-1">*</span>
          </label>
          <input
            type="Text"
            name="product_name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Customer Name
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              name="branch_id"
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              {/* {data.map((batches) => (
                <option value={batches.id} key={batches.id}>
                  {batches?.customer?.company_name}
                </option>
              ))} */}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Product Name
          </label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              name="branch_id"
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              {/* {data.map((batches,id) => (
                <option value={batches.id} key={batches.id}>
                  {batches?.product?.product_name}
                </option>
              ))} */}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        <div className="mb-4.5 md:flex items-center justify-between gap-5">
          <div className="w-full mb-4.5 md:mb-0 ">
          <label className="mb-2.5 block text-black dark:text-white">
           Manufacture Date <span className="text-meta-1">*</span>
          </label>
          <input
            type="date"
            name="product_name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          </div>
          <div className="w-full">
          <label className="mb-2.5 block text-black dark:text-white">
           Expiry Date <span className="text-meta-1">*</span>
          </label>
          <input
            type="date"
            name="product_name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          </div>
        </div>
        
    
        <div className="mb-4.5 md:flex items-center justify-between gap-5">
          <div className="w-full mb-4.5 md:mb-0">
          <label className="mb-2.5 block text-black dark:text-white">
           Batch Size <span className="text-meta-1">*</span>
          </label>
          <input
            type="Text"
            name="product_name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          </div>
          <div className="w-full">
          <label className="mb-2.5 block text-black dark:text-white">
          Receive Quantity <span className="text-meta-1">*</span>
          </label>
          <input
            type="Text"
            name="product_name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          </div>
        </div>

        <SubmitButton />
      </div>
    </form>
    </>
  );
};

export default BatchesEditForm;
