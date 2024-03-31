"use client";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Data } from "./typings";
import { SERVER_API_URL } from "@/app/constant";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ParametersType = {
  id: number;
  testing_parameters: string;
  test_type: {
    name: string;
  };
}[];

const yesOrNoSchema = z.enum(["YES", "NO"]);
const samplingBySchema = z.enum(["CUSTOMER", "LABORATORY"]);
const testingProcessSchema = z.enum([
  "BATCH_ANALYSIS",
  "METHOD_DEVELOPMENT",
  "METHOD_VALIDATION",
  "RD_RESEARCH",
  "REGULATORY",
]);
const reportSentBySchema = z.enum(["COURIER", "EMAIL"]); // Replace with actual values
const disposalProcessSchema = z.enum(["DISCARD", "RETURN"]);
const documentsTypeSchema = z.enum(["MSDS", "COA", "IFU", "IF_ANY_OTHER"]);

const testDetailSchema = z.object({
  priority_order: z.coerce.number(),
  parameter_id: z.coerce.number(),
});

export const trfSchema = z.object({
  sample_id: z.string(),
  sample_name: z.string(),
  description: z.string(),
  manufactured_by: z.string(),
  batch_or_lot_no: z.string(),
  manufactured_date: z.coerce.date(),
  expiry_date: z.coerce.date(),
  batch_size: z.coerce.number().nonnegative(),
  format_name: z.string(),
  nabl_logo: z.string(),
  no_of_samples: z.coerce.number(),
  sample_storage_condition: z.string(),
  sampling_by: samplingBySchema,
  testing_process: z.array(testingProcessSchema),
  report_sent_by: z.array(reportSentBySchema),
  sample_disposal_process: disposalProcessSchema,
  fail_statement_sent: yesOrNoSchema,
  specific_decision_rule: yesOrNoSchema,
  binary_decision_rule: yesOrNoSchema,
  submission_of_documents: z.array(documentsTypeSchema),
  test_types_ids: z.array(z.coerce.number()),
  testing_details: z.array(testDetailSchema),
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

const TRFAdminForm = ({
  data,
  updateAction,
}: {
  data: Data;
  updateAction: (
    data: any,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
}) => {
  //   const data: Data = await getData();
  //   const [data, setData] = useState<Data>();
  const [parameters, setParameters] = useState<ParametersType>();
  const form = useForm<z.infer<typeof trfSchema>>({
    resolver: zodResolver(trfSchema),
    defaultValues: {
      sample_name: data.trf?.sample_name ?? "",
      sample_id: data.trf?.sample_id ?? "",
      description: data.trf?.description,
      no_of_samples: data.trf?.no_of_samples,
      manufactured_by: data.trf?.manufactured_by,
      manufactured_date: data.trf?.manufactured_date,
      expiry_date: data.trf?.expiry_date,
      batch_or_lot_no: data.trf?.batch_or_lot_no,
      batch_size: data.trf?.batch_size,
      format_name: data.trf?.format_name,
      sample_storage_condition: data.trf?.sample_storage_condition,
      sample_disposal_process: data.trf?.sample_disposal_process,
      sampling_by: data.trf?.sampling_by,
      binary_decision_rule: data.trf?.binary_decision_rule,
      fail_statement_sent: data.trf?.fail_statement_sent,
      specific_decision_rule: data.trf?.specific_decision_rule,
      test_types_ids: data.trf?.test_types_ids,

      testing_process: data.trf?.testing_process,
      report_sent_by: data.trf?.report_sent_by,
      submission_of_documents: data.trf?.submission_of_documents,
      nabl_logo: data.trf?.nabl_logo ? "1" : "0",
      testing_details: data.trf?.test_details,
    },
  });
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "testing_details", // Name of the array in your schema
  });

  const {
    formState: { isLoading },
  } = form;

  const testTypes = useWatch({
    control: form.control,
    name: "test_types_ids", // Replace with the actual name of your checkbox group
    defaultValue: data.trf.test_types_ids,
  });

  const [state, setState] = useState<InitialState | undefined>(initialState);
  const router = useRouter();

  async function fetchTestParameters(query: string, product: string) {
    let res = await fetch(
      `${SERVER_API_URL}/parameters/trf/${data.trf.product_id}/?${query}`,
    );
    const response: ParametersType = await res.json();
    setParameters(response);
  }

  useEffect(() => {
    if (testTypes) {
      if (testTypes.length > 0) {
        const query = testTypes
          .map((value, index) => `test_type=${encodeURIComponent(value)}`)
          .join("&");

        fetchTestParameters(query, data.trf.product_id.toString());
      }
    }
  }, [testTypes]);

  const getTestTypeName = () => {
    return "";
  };

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
      router.push("/dashboard/trf");
    }
  }, [state, router]);

  const handleFormSubmit = async (data: {}) => {
    console.log(data);
    const res = await updateAction(data);
    console.log(res);
    setState(res);
  };

  return (
    <>
      {/* <Breadcrumb pageName="Add New Test Parameter" /> */}

      <div>
        {Object.keys(form.formState.errors).length > 0 && (
          <ul>
            {Object.entries(form.formState.errors).map(
              ([fieldName, fieldError]) => (
                <li key={fieldName}>{fieldError.message}</li>
              ),
            )}
          </ul>
        )}
      </div>

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
                onSubmit={form.handleSubmit(handleFormSubmit)}
                // action={updateAction}
              >
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      {/* <label className="mb-2.5 block text-black dark:text-white">
                        Sample ID
                      </label> */}
                      <input
                        type="hidden"
                        {...form.register("sample_id")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      {/* <label className="mb-2.5 block text-black dark:text-white">
                        Sample Name
                      </label> */}
                      <input
                        type="hidden"
                        {...form.register("sample_name")}
                        name="sample_name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      {...form.register("description")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        No of Samples
                      </label>
                      <input
                        type="number"
                        {...form.register("no_of_samples")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Manufactured by
                      </label>
                      <input
                        type="text"
                        {...form.register("manufactured_by")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Manufactured Date
                      </label>
                      <input
                        type="date"
                        {...form.register("manufactured_date")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        {...form.register("expiry_date")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Batch or Lot No
                      </label>
                      <input
                        type="text"
                        {...form.register("batch_or_lot_no")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Batch Size
                      </label>
                      <input
                        type="number"
                        {...form.register("batch_size")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Format Name
                    </label>
                    <input
                      type="text"
                      {...form.register("format_name")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Sample storage condition (if any)
                    </label>
                    <textarea
                      rows={6}
                      {...form.register("sample_storage_condition")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    ></textarea>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      SAMPILING BY
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...form.register("sampling_by")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(SAMPILINGBY).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
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
                    <FormField
                      control={form.control}
                      {...form.register("testing_process")}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Testing Process
                            </label>
                          </div>
                          {Object.entries(TESTPROCESSING).map(
                            ([key, value]: [any, any]) => (
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
                                                    (value) => value !== key,
                                                  ),
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
                            ),
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
                    <FormField
                      control={form.control}
                      {...form.register("report_sent_by")}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Report Sent
                            </label>
                          </div>
                          {Object.entries(REPORTSENT).map(
                            ([key, value]: [any, any]) => (
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
                                                    (value) => value !== key,
                                                  ),
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
                            ),
                          )}
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
                        {...form.register("sample_disposal_process")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(DISPOSALPROCESS).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
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
                      Fail Statement Sent{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...form.register("fail_statement_sent")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
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
                      Specific Decision Rule{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...form.register("specific_decision_rule")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
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
                      Binary Decision Rule{" "}
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...form.register("binary_decision_rule")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {Object.entries(YESORNO).map(([key, value]) => (
                          <option value={key} key={key}>
                            {value}
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
                    <FormField
                      control={form.control}
                      {...form.register("submission_of_documents")}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Submission of Documents
                            </label>
                          </div>
                          {Object.entries(DOCTYPE).map(
                            ([key, value]: [any, any]) => (
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
                                                    (value) => value !== key,
                                                  ),
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
                            ),
                          )}
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
                    <FormField
                      control={form.control}
                      name="nabl_logo"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <label className="mb-2.5 block text-black dark:text-white">
                            NABL Logo
                          </label>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={"0"} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-b border-stroke px-2 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Test Parameters
                    </h3>
                  </div>

                  <div className="mb-4.5 mt-2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Product Name:
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <p className="font-extrabold">
                        {data.trf?.product?.product_name}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <FormField
                      control={form.control}
                      {...form.register("test_types_ids")}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Test Type
                            </label>
                          </div>
                          {data?.test_types.map((test) => (
                            <FormField
                              key={test.id}
                              control={form.control}
                              name="test_types_ids"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={test.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(test.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                test.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== test.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {test.name}
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
                  </div>

                  <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                              S.NO
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                              Test Parameter Name
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                              Test Type
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                              Priority Order
                            </th>
                            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                              Remove?
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {fields.map((item, index) => (
                            <tr key={item.id}>
                              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {index + 1}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                {/* <h5 className="font-medium text-black dark:text-white">
                                  {
                                    data.trf?.test_details?.[index]?.parameter
                                      ?.testing_parameters
                                  }
                                </h5>
                                <input
                                  type="hidden"
                                  {...form.register(
                                    `testing_details.${index}.parameter_id`
                                  )}
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                /> */}
                                <div className="relative z-20 bg-transparent dark:bg-form-input">
                                  <select
                                    {...form.register(
                                      `testing_details.${index}.parameter_id`,
                                    )}
                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  >
                                    {parameters?.map((parameter) => (
                                      <option
                                        value={parameter.id}
                                        key={parameter.id}
                                        defaultValue={parameter.id}
                                      >
                                        {parameter.testing_parameters}
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
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                <h5 className="font-medium text-black dark:text-white">
                                  {getTestTypeName()}
                                </h5>
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                <input
                                  type="text"
                                  {...form.register(
                                    `testing_details.${index}.priority_order`,
                                  )}
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                              </td>
                              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        type="button"
                        className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                        onClick={() =>
                          append({
                            parameter_id: 1,
                            priority_order: 0,
                          })
                        }
                      >
                        Add Test
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                    disabled={form.formState.isLoading}
                  >
                    {form.formState.isLoading ? "Loading..." : "Submit"}
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

export default TRFAdminForm;
