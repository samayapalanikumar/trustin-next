"use client";
import { SERVER_API_URL } from "@/app/constant";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch, Form } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
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


const RegistrationForm = ({
  data,
  updateFn,
}: {
  data: any;
  updateFn: (data: any) => Promise<{ fieldErrors: null; type: string; message: string | undefined; } | undefined>;
}) => {
  const form = useForm({
    defaultValues: {
      trf_id: data?.registration?.trf_id,
      branch_id: data?.registration?.branch_id,
      product: data?.registration?.product,
      company_id: data?.registration?.company_id,
      company_name: data?.registration?.company_name,
      customer_address_line1: data?.registration?.customer_address_line1,
      customer_address_line2: data?.registration?.customer_address_line2,
      city: data?.registration?.city,
      state: data?.registration?.state,
      pincode_no: data?.registration?.pincode_no,
      gst: data?.registration?.gst,
      test_types: data?.registration?.test_types,
      date_of_received: new Date(data?.registration?.date_of_received)
        .toISOString()
        .split("T")[0],
      batches: data?.registration?.batches.map((batch: any) => ({
        id: batch.id,
        batch_no: batch.batch_no,
        manufactured_date: batch.manufactured_date,
        expiry_date: batch.expiry_date,
        batch_size: batch.batch_size,
        received_quantity: batch.received_quantity,
      })),
      test_params_micro: data?.registration?.test_params_micro.map((param: any) => ({
        test_params_id: param.test_params_id,
      })),
      test_params_mech: data?.registration?.test_params_mech.map((param: any) => ({
        test_params_id: param.test_params_id,
      })),
    },
  });
  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "batches", // Name of the array in your schema
  });
  const {
    fields: testMechFields,
    append: testMechAppend,
    remove: testMechRemove,
    replace: testMechReplace,
  } = useFieldArray({
    control: form.control,
    name: "test_params_mech", // Name of the array in your schema
  });
  const {
    fields: testMicroFields,
    append: testMicroAppend,
    remove: testMicroRemove,
    replace: testMicroReplace,
  } = useFieldArray({
    control: form.control,
    name: "test_params_micro", // Name of the array in your schema
  });
  const watchedFieldValue = useWatch({ control: form.control, name: "trf_id" }); // Replace 'fieldName' with the actual name of your field
  const watchedTestTypeValue = useWatch({
    control: form.control,
    name: "test_types",
  }); 

  const [state, setState] = useState<InitialState | undefined>(initialState);
  const router = useRouter();


  useEffect(() => {
    // Make API call when the watched field value changes
    const fetchData = async (trf_id: any) => {
      try {
        const response = await fetch(
          `${SERVER_API_URL}/trf/customer/${trf_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        console.log(data);
        // Update form value with the fetched data
        // form.setValue("branch_id", data.branch_id);
        // form.setValue("company_id", data.customer_id);
        // form.setValue("product", data.product_id);
        // form.setValue("company_name", data?.customer?.company_name);
        // form.setValue("city", data?.product?.city);
        // form.setValue("state", data?.product?.state);
        // form.setValue("pincode_no", data?.product?.pincode_no);
        // form.setValue(
        //   "customer_address_line1",
        //   data?.product?.customer_address_line1
        // );
        // form.setValue(
        //   "customer_address_line2",
        //   data?.product?.customer_address_line2
        // );
        // form.setValue("gst", data?.product?.gst);

        // data?.test_details.forEach(para=>{
        //   testAppend({'test_params_id':para?.parameter_id})
        // })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check if the field value is not empty before making the API call
    if (watchedFieldValue) {
      const { trf_code }: { trf_code: string } = data.trf?.find(
        (t: any) => t.id == watchedFieldValue,
      );
      if (trf_code) fetchData(trf_code);
    }
  }, [watchedFieldValue, form.setValue]);

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

  const handleSubmit = async ({
    formdata,
    data,
    formDataJson,
  }: {
    formdata: FormData;
    data: {};
    formDataJson: {};
  }) => {
    console.log(data);
    const res = await updateFn(data);
    console.log(res);
    setState(res);
  };
  return (
    <UiForm {...form}>
      <Form control={form.control} onSubmit={handleSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Customer Ref / Po / Trf No
              </label>
              <Combobox
                data={data?.trflist}
                name="trf_id"
                form={form}
                label="Customer Ref / Po / Trf No"
                emptyMessage="NO TRF Found"
              />
              {/* <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  {...form.register("trf_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.trf.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.trf_code}
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
              </div> */}
            </div>
            <div className="w-full xl:w-1/2">
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
                <select
                  {...form.register("company_id")}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.customers.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.customer_code}
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
                placeholder="Enter id"
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
                Pin
              </label>
              <input
                {...form.register("pincode_no")}
                placeholder="Enter Pin"
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
                  {...form.register("product")}
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

          {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full ">
            <label className="mb-2.5 block text-black dark:text-white">
              Test Type
            </label>
            <input
              type="text"
              {...form.register("test_type")}
              placeholder="Enter Test Type"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div> */}

          <div className="mb-4.5">
            <FormField
              control={form.control}
              {...form.register("test_types")}
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <label className="mb-2.5 block text-black dark:text-white">Test Type</label>
                  </div>
                  {Object.entries(TESTTYPE).map(([key, value]) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name="test_types"
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
                                    ? field.onChange([...field.value, key])
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
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Tabs defaultValue="batches" className="w-full">
            <TabsList>
              <TabsTrigger value="batches">Batches</TabsTrigger>
              <TabsTrigger value="mech-parameters">
                Mech Test Parameters
              </TabsTrigger>
              <TabsTrigger value="micro-parameters">
                Micro Test Parameters
              </TabsTrigger>            </TabsList>
            <TabsContent value="batches">
              {" "}
              <div className="mb-4">
                {fields.map((item, index) => (
                  <div key={item.id} className="mb-4 mt-2">
                    <div className="mb-2 flex  justify-between border-b-2">
                      <p>
                        Batch <strong>#{index + 1}:</strong>
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
                          Batch No <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="hidden"
                          {...form.register(`batches.${index}.id`)}
                        />
                        <input
                          type="text"
                          {...form.register(`batches.${index}.batch_no`)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Manufactured Date{" "}
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="date"
                          {...form.register(
                            `batches.${index}.manufactured_date`,
                          )}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Expiry Date <span className="text-meta-1">*</span>{" "}
                        </label>
                        <input
                          type="date"
                          {...form.register(`batches.${index}.expiry_date`)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Batch Size <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="number"
                          {...form.register(`batches.${index}.batch_size`)}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>

                      <div className="w-full xl:w-1/5">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Received Quantity{" "}
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="number"
                          {...form.register(
                            `batches.${index}.received_quantity`,
                          )}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={() =>
                    append({
                      id: null,
                      batch_no: "",
                      manufactured_date: "",
                      expiry_date: "",
                      batch_size: 0,
                      received_quantity: 0,
                    })
                  }
                >
                  Add Batches
                </button>
              </div>
            </TabsContent>
            <TabsContent value="mech-parameters">
              {" "}
              <div className="mb-4">
                {testMechFields.map((item, index) => (
                  <div key={item.id} className="mb-4 mt-2">
                    <div className="mb-2 flex  justify-between border-b-2">
                      <p>
                        Test Parameter <strong>#{index + 1}:</strong>
                      </p>
                      <div>
                        <button
                          type="button"
                          className="flex  justify-center rounded-full p-2   font-medium text-black hover:bg-gray "
                          onClick={() => testMechRemove(index)}
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/5 ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Parameter
                        </label>

                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            {...form.register(
                              `test_params_mech.${index}.test_params_id`,
                            )}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            <option value="">------------</option>
                            {data.mechParameters.map((t: any) => (
                              <option value={t.id} key={t.id}>
                                {t.testing_parameters}
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
                          Test Type
                        </label>
                        <p>Mech</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={() =>
                    testMechAppend({
                      test_params_id: "",
                    })
                  }
                >
                  Add Test Parameters
                </button>
              </div>
            </TabsContent>
            <TabsContent value="micro-parameters">
              {" "}
              <div className="mb-4">
                {testMicroFields.map((item, index) => (
                  <div key={item.id} className="mb-4 mt-2">
                    <div className="mb-2 flex  justify-between border-b-2">
                      <p>
                        Test Parameter <strong>#{index + 1}:</strong>
                      </p>
                      <div>
                        <button
                          type="button"
                          className="flex  justify-center rounded-full p-2   font-medium text-black hover:bg-gray "
                          onClick={() => testMicroRemove(index)}
                        >
                          <Trash2 className="w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full xl:w-1/5 ">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Parameter
                        </label>

                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            {...form.register(
                              `test_params_micro.${index}.test_params_id`,
                            )}
                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          >
                            <option value="">------------</option>
                            {data.microParameters.map((t: any) => (
                              <option value={t.id} key={t.id}>
                                {t.testing_parameters}
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
                          Test Type
                        </label>
                        <p>Micro</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={() =>
                    testMicroAppend({
                      test_params_id: "",
                    })
                  }
                >
                  Add Test Parameters
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
      </Form>
    </UiForm>
  );
};

export default RegistrationForm;
