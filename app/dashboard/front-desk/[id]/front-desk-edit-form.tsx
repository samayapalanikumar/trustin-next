"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createFrontDesk } from "../actions";
import SubmitButton from "@/components/submit-button/submit-button";
import { Customer } from "./typings";
import Select from "@/components/select-input";

const Customers = [
  { id: 1, name: "Muthu" },
  { id: 2, name: "Krishna" },
  { id: 2, name: "Karthi" },
  { id: 2, name: "Ram" },
];

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

const FrontDeskEditForm = ({
  data,
  actionFn,
}: {
  data: any;
  actionFn: (
    prevState: any,
    formData: FormData,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
}) => {
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
      router.push("/dashboard/front-desk");
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      <div className="p-6.5">
        <div className="mb-4.5">
          <Select
            label="Customer"
            name="customer_id"
            defaultValue={data.frontDesk.customer_id}

          >
            {data.customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.company_name}
              </option>
            ))}
          </Select>
        </div>
        {/* <label className="mb-2.5 block text-black dark:text-white">
            Customer
          </label>
          <input
            type="text"
            name="customer_id"
            placeholder=" Customer"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          /> */}

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Courier Name
          </label>
          <input
            type="text"
            name="courier_name"
            placeholder="Courier Name"
            defaultValue={data.frontDesk.courier_name}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Date Received
          </label>
          <input
            type="date"
            name="date_of_received"
            placeholder="Date Received"
            defaultValue={new Date(data.frontDesk.date_of_received).toISOString().split("T")[0]}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
          Temperature
          </label>
          <input
            type="text"
            name="temperature"
            placeholder="Temperature"
            defaultValue={data.frontDesk.temperature}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <Select label="Parcel Recived" name="parcel_received"  defaultValue={data.frontDesk.parcel_received}>
           <option value="SAMPLE">Sample</option>
           <option value="Material">Material</option>
          </Select>
        </div>
        <div className="mb-4.5">
          <Select label="Received Condition" name="received_condition"  defaultValue={data.frontDesk.received_condition}>
            
              <option value="GOOD" >
              Good
              </option>
              <option value="DAMAGED">Damaged</option>
              
           
          </Select>
        </div>
        
        <div className="mb-4.5">
          <Select label="Department" name="deparment_id"  defaultValue={data.frontDesk.deparment_id}>
            {data?.departments.map((department) => (
              <option value={department.id} key={department.id}>
                {department.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4.5">
          <Select label="Status" name="status"  defaultValue={data.frontDesk.status}>
          <option value="Not_REGISTRATION">
                Not Registration
              </option>
              <option value="REGISTRATION">
                Registration
              </option>
          </Select>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default FrontDeskEditForm;
