"use client";
import { SERVER_API_URL } from "@/app/constant";
import { useEffect, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
  Form,
  FieldValues,
} from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
import { createRegistration } from "../actions";
import Combobox from "@/components/combo-box";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form as UiForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CreateData,
  Data,
  ParametersType,
  SampleRecord,
  TestType,
} from "../typings";
import { TestDetail, TestReportForm } from "@/app/trf/typings";

const TESTTYPE = {
  1: "MICRO",
  2: "MECH",
};

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

const RegistrationForm = ({ data }: { data: Data }) => {
  // const [parameters, setParameters] = useState<TestDetail[]>([]);

  const form = useForm<CreateData>({
    defaultValues: {
      branch_id: "1",
      samples: [{ sample_id: "" }],
    },
  });
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "samples", // Name of the array in your schema
  });
  const {
    fields: paramsFields,
    append: paramsAppend,
    remove: paramsRemove,
    replace: paramsReplace,
  } = useFieldArray({
    control: form.control,
    name: "test_params", // Name of the array in your schema
  });

  const samples_watch = useWatch({
    control: form.control,
    name: "test_params",
  });

  const [samples, setSamples] = useState<SampleRecord[]>([]);

  const testingProcess = [{
    BATCH_ANALYSIS : "BATCH_ANALYSIS",
    METHOD_DEVELOPMENT : "METHOD_DEVELOPMENT",
    METHOD_VALIDATION : "METHOD_VALIDATION",
    RD_RESEARCH : "RD_RESEARCH",
    REGULATORY : "REGULATORY"
  }];

  // useEffect(() => {
  //   const ids = samples_watch.map((field, idx) => {
  //     if (field.sample_id !== "") return field.sample_id.toString();
  //   });

  //   const samples: SampleRecord[] = [];
  //   ids.forEach((id) => {
  //     const sample = data?.samples.find((t) => t.id.toString() === id);
  //     if (sample) samples.push(sample);
  //   });

  //   setSamples(samples);
  // }, [data?.samples, samples_watch]);

  const watchCompanyFieldValue = useWatch({
    control: form.control,
    name: "company_id",
  }); // Replace 'fieldName' with the actual name of your field
  // const watchedTestTypeValue = useWatch({
  //   control: form.control,
  //   name: "test_types",
  // }); // Replace 'fieldName' with the actual name of your field

  const [state, setState] = useState<InitialState | undefined>(initialState);
  const router = useRouter();

  useEffect(() => {
    // Make API call when the watched field value changes
    const getCompanyDetail = (company_id: any) => {
      const customer = data.customers.find(
        (customer) => customer.id.toString() === company_id,
      );
      form.setValue("company_name", customer?.company_name ?? "");
      form.setValue("city", customer?.city ?? "");
      form.setValue("state", customer?.state ?? "");
      form.setValue("pincode_no", customer?.pincode_no ?? "");
      form.setValue(
        "customer_address_line1",
        customer?.customer_address_line1 ?? "",
      );
      form.setValue(
        "customer_address_line2",
        customer?.customer_address_line2 ?? "",
      );
      form.setValue("gst", customer?.gst ?? "");
    };

    // Check if the field value is not empty before making the API call
    if (watchCompanyFieldValue) {
      const company_id = watchCompanyFieldValue;
      if (company_id) getCompanyDetail(company_id);
    }
  }, [watchCompanyFieldValue, form.setValue, form, data.customers]);

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
      router.push("/dashboard/registrations");
    }
  }, [state, router]);

  const handleForm = async (data: CreateData) => {
    console.log(data);
    const res = await createRegistration(data);
    console.log(res);
    setState(res);
  };

  return (
    <UiForm {...form}>
      <form onSubmit={form.handleSubmit(handleForm)}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                TRF Code
              </label>
              <input
                type="text"
                {...form.register("trf_code")}
                placeholder="Enter TRF Code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                Branch
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  {...form.register("branch_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.branches?.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.branch_name}
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
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                Company ID
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                {/* <Combobox
                data={data?.customers.map((customer)=>({label: `${customer.customer_code} - ${customer.company_name}`, value: customer.id.toString()}))}
                name="company_id"
                form={form}
                label="Company ID"
                emptyMessage="NO Customer Found"
              /> */}
                <select
                  {...form.register("company_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.customers.map((t) => (
                    <option value={t.id} key={t.id}>
                      {t.customer_code} - {t.company_name}
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
            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                {...form.register("company_name")}
                placeholder="Enter Company Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Address Line 1
              </label>
              <input
                {...form.register("customer_address_line1")}
                placeholder="Enter Address Line 1"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Address Line 2
              </label>
              <input
                {...form.register("customer_address_line2")}
                placeholder="Enter Address Line 2"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                City
              </label>
              <input
                {...form.register("city")}
                placeholder="Enter City"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                State
              </label>
              <input
                {...form.register("state")}
                placeholder="Enter State"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Pincode
              </label>
              <input
                {...form.register("pincode_no")}
                placeholder="Enter Pincode"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Gst No
              </label>
              <input
                {...form.register("gst")}
                placeholder="Enter Gst No"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full ">
              <label className="mb-2.5 block text-black dark:text-white">
                Date Of Received
              </label>
              <input
                type="date"
                {...form.register("date_of_received")}
                placeholder="Enter Date Of Recived"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full ">
              <label className="mb-2.5 block text-black dark:text-white">
                Product
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  {...form.register("product_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.products.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.product_name}
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
          </div>

          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                Test type
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                {/* <Combobox
                data={data?.customers.map((customer)=>({label: `${customer.customer_code} - ${customer.company_name}`, value: customer.id.toString()}))}
                name="company_id"
                form={form}
                label="Company ID"
                emptyMessage="NO Customer Found"
              /> */}
                <select
                  // {...form.register("company_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                 <option value="1">Micro</option>
                 <option value="2">Mech</option>
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
            
            <div className="w-full xl:w-9/12">
              <label className="mb-2.5 block text-black dark:text-white">
                Product
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  {...form.register("product_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.products.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.product_name}
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
          </div>

          <Tabs defaultValue="samples" className="w-full">
            <TabsList>
              <TabsTrigger value="samples">Samples</TabsTrigger>
              <TabsTrigger value="parameters">Test Parameters</TabsTrigger>
            </TabsList>
            <TabsContent value="samples">
              <div className="mb-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="mb-4 mt-2">
                    <div className="mb-2 flex  justify-between border-b-2">
                      <p>
                        Sample <strong>#{index + 1}:</strong>
                      </p>
                      <div>
                        <button
                          type="button"
                          className="flex  justify-center rounded-full p-2   font-medium text-black hover:bg-gray "
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Samples <span className="text-meta-1">*</span>
                        </label>

                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            {...form.register(`samples.${index}.sample_id`)}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            <option value="">------------</option>
                            {data.samples.map((t) => (
                              <option value={t.id} key={t.id}>
                                {t.name}
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
                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Batch{" "}
                        </label>
                        <h5>{samples[index]?.batch?.batch_no}</h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Product Name
                        </label>
                        <h5>{samples[index]?.batch?.product?.product_name}</h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Test Type
                        </label>
                        <h5>
                          {samples[index]?.test_type_id
                            ? samples[index]?.test_type_id === 1
                              ? "Micro"
                              : "Mech"
                            : ""}
                        </h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Received Quantity{" "}
                        </label>
                        <h5>{samples[index]?.batch?.received_quantity} </h5>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={() =>
                    append({
                      sample_id: "",
                    })
                  }
                >
                  Add Sample
                </button>
              </div>
            </TabsContent>
            <TabsContent value="parameters">
              <div className="mb-4">
                {paramsFields.map((item, index) => (
                  <div key={item.id} className="mb-4 mt-2">
                    <div className="mb-2 flex  justify-between border-b-2">
                      <p>
                         <strong>#{index + 1}:</strong>
                      </p>
                      <div>
                        <button
                          type="button"
                          className="flex  justify-center rounded-full p-2   font-medium text-black hover:bg-gray "
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Samples <span className="text-meta-1">*</span>
                        </label>

                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            {...form.register(`samples.${index}.sample_id`)}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            <option value="">------------</option>
                            {data.samples.map((t) => (
                              <option value={t.id} key={t.id}>
                                {t.name}
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
                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Batch{" "}
                        </label>
                        <h5>{samples[index]?.batch?.batch_no}</h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Product Name
                        </label>
                        <h5>{samples[index]?.batch?.product?.product_name}</h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Test Type
                        </label>
                        <h5>
                          {samples[index]?.test_type_id
                            ? samples[index]?.test_type_id === 1
                              ? "Micro"
                              : "Mech"
                            : ""}
                        </h5>
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Received Quantity{" "}
                        </label>
                        <h5>{samples[index]?.batch?.received_quantity} </h5>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={() =>
                    append({
                      sample_id: "",
                    })
                  }
                >
                  Add Sample
                </button>
              </div>
            </TabsContent>
          </Tabs>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:bg-slate-500"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </UiForm>
  );
};

export default RegistrationForm;
