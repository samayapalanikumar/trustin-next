"use client";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
type Data = {
  products: {
    id: number;
    product_name: string;
  }[];
  test_types: {
    id: number;
    name: string;
  }[];
};

const yesOrNoSchema = z.enum(["YES", "NO"]);
const samplingBySchema = z.enum(["CUSTOMER", "LABORATORY"]);
const testingProcessSchema = z.enum([
  "BATCH_ANALYSIS",
  "METHOD_DEVELOPMENT",
  "METHOD_VALIDATION",
  "RD_RESEARCH",
  "REGULATORY",
]);
const reportSentBySchema = z.enum(["VALUE1", "VALUE2"]); // Replace with actual values
const disposalProcessSchema = z.enum(["DISCARD", "RETURN"]);
const documentsTypeSchema = z.enum(["MSDS", "COA", "IFU", "IF_ANY_OTHER"]);

const trfSchema = z.object({
  trf_code: z.string(),
  date_of_registration: z.date(),
  sample_id: z.string(),
  sample_name: z.string(),
  description: z.string(),
  manufactured_by: z.string(),
  batch_or_lot_no: z.string(),
  manufactured_date: z.date(),
  expiry_date: z.date(),
  batch_size: z.number(),
  format_name: z.string(),
  nabl_logo: z.boolean(),
  no_of_samples: z.number(),
  sample_storage_condition: z.string(),
  sampling_by: samplingBySchema,
  testing_process: z.array(testingProcessSchema),
  report_sent_by: z.array(reportSentBySchema),
  sample_disposal_process: disposalProcessSchema,
  fail_statement_sent: yesOrNoSchema,
  specific_decision_rule: yesOrNoSchema,
  binary_decision_rule: yesOrNoSchema,
  submission_of_documents: z.array(documentsTypeSchema),
  branch_id: z.number(),
  product_id: z.number(),
  customer_id: z.number(),
});

const TESTPROCESSING = {
  BATCH_ANALYSIS: "BATCH ANALYSIS",
  METHOD_DEVELOPMENT: "METHOD DEVELOPMENT",
  METHOD_VALIDATION: "METHOD VALIDATION",
  RD_RESEARCH: "RD RESEARCH",
  REGULATORY: "REGULATORY",
};

const SAMPILINGBY = {
  CUSTOMER: "CUSTOMER",
  LABORATORY: "LABORATORY",
};

const DISPOSALPROCESS = {
  DISCARD: "DISCARD",
  RETURN: "RETURN",
};

const REPORTSENT = {
  COURIER: "COURIER",
  EMAIL: "EMAIL",
};

const YESORNO = {
  YES: "YES",
  NO: "NO",
};

const DOCTYPE = {
  MSDS: "MSDS",
  COA: "COA",
  IFU: "IFU",
  IF_ANY_OTHER: "IF ANY OTHER",
};

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const TRFForm = () => {
  //   const data: Data = await getData();
  const [data, setData] = useState<Data>();
  const form = useForm<z.infer<typeof trfSchema>>({
    resolver: zodResolver(trfSchema),
    defaultValues: {
      testing_process: [],
      report_sent_by: [],
      submission_of_documents: [],
    },
  });

  useEffect(() => {
    async function getData() {
      const res2 = await fetch("http://localhost:8000/products/trf", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res3 = await fetch("http://localhost:8000/testtypes/trf", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

      if (!res2.ok) {
        // This will activate the closest `error.js` Error Boundary
        // console.log(res)
        // throw new Error("Failed to fetch data");
        console.log("error");
        redirect("/signin");
      }

      const products = await res2.json();
      const test_types = await res3.json();
      setData({
        products,
        test_types,
      });
    }
    getData();
  }, []);

  return (
    <>
      {/* <Breadcrumb pageName="Add New Test Parameter" /> */}

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div> */}
            <Form {...form}>
              <form
                action={"#"}
                onSubmit={form.handleSubmit((data) => console.log(data))}
              >
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sample Id
                      </label>
                      <input
                        type="text"
                        {...form.register("sample_id")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sample Name
                      </label>
                      <input
                        type="text"
                        {...form.register("sample_name")}
                        name="sample_name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      name="description"
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        No of Samples
                      </label>
                      <input
                        type="number"
                        name="no_of_samples"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Sampling By
                      </label>
                      <input
                        type="text"
                        name="sampling_by"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sample storage condition (if any)
                    </label>
                    <textarea
                      rows={6}
                      name="sample_storage_condition"
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      SAMPILING BY
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="sampling_by"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(SAMPILINGBY).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                    <FormField
                      control={form.control}
                      name="testing_process"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Sidebar</FormLabel>
                            <FormDescription>
                              Select the items you want to display in the
                              sidebar.
                            </FormDescription>
                          </div>
                          {Object.entries(TESTPROCESSING).map(
                            ([key, value]) => (
                              <FormField
                                key={key}
                                control={form.control}
                                name="testing_process"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={key}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(key)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  key,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== key
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {value}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            )
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* {Object.entries(TESTPROCESSING).map(([key, value]) => (
                      <Checkbox key={key} /> */}
                    {/* ))} */}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Report Sent
                    </label>

                    <FormField
                      control={form.control}
                      name="report_sent_by"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Sidebar</FormLabel>
                            <FormDescription>
                              Select the items you want to display in the
                              sidebar.
                            </FormDescription>
                          </div>
                          {Object.entries(REPORTSENT).map(([key, value]) => (
                            <FormField
                              key={key}
                              control={form.control}
                              name="report_sent_by"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={key}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(key)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                key,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== key
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {value}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* {Object.entries(REPORTSENT).map(([key, value]) => (
                      <CheckboxThree
                        label={value}
                        value={key}
                        name="report_sent_by"
                        key={key}
                      />
                    ))} */}
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sample Disposal Process
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="sample_disposal_process"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(DISPOSALPROCESS).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                      Fail Statement Sent{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="fail_statement_sent"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                      Specific Decision Rule{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="specific_decision_rule"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                      Binary Decision Rule{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="binary_decision_rule"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                      Submission of Documents
                    </label>
                    <FormField
                      control={form.control}
                      name="submission_of_documents"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Sidebar</FormLabel>
                            <FormDescription>
                              Select the items you want to display in the
                              sidebar.
                            </FormDescription>
                          </div>
                          {Object.entries(DOCTYPE).map(([key, value]) => (
                            <FormField
                              key={key}
                              control={form.control}
                              name="submission_of_documents"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={key}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(key)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                key,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== key
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {value}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* {Object.entries(DOCTYPE).map(([key, value]) => (
                      <CheckboxThree
                        label={value}
                        value={key}
                        name="submission_of_documents"
                        key={key}
                      />
                    ))} */}
                  </div>

                  {/* NABL Check box */}
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      NABL Logo
                    </label>
                    <CheckboxThree label="NABL Logo" name="nabl_logo" />
                  </div>

                  <div className="border-b border-stroke py-4 px-2 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Test Parameters
                    </h3>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Product
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="product_id"
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {data?.products.map((product) => (
                          <option value={product.id} key={product.id}>
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
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
                      Test Type
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      {data?.test_types.map((test) => (
                        <CheckboxThree
                          label={test.name}
                          value={test.id}
                          name="test_types_ids"
                          key={test.id}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                              S.NO
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                              Test Parameter Name
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                              Test Type
                            </th>
                            <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                              Priority Order
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1].map((packageItem, key) => (
                            <tr key={key}>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {key + 1}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {packageItem.test_name}
                                </h5>
                                <input
                                  type="hidden"
                                  name="priority_order"
                                  value={packageItem.id}
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {packageItem.testtype}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <input
                                  type="text"
                                  name="priority_order"
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TRFForm;
