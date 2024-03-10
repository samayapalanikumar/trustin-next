"use client";
import { SERVER_API_URL } from "@/app/constant";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch, Form } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

const SamplesForm = ({
  data,
  createFn,
}: {
  data: any;
  createFn: (data: any) => void;
}) => {
  const { control, register } = useForm({
    defaultValues: {
      samples: data.batches.map((batch: any) => ({
        sample_id: "",
        name: "",
        batch_id: batch.id,
        department: "",
        test_params: [
          {
            test_parameter_id: "",
            test_type: "",
          },
        ],
      })),
    },
  });
  const { fields, append, remove, replace } = useFieldArray({
    control: control,
    name: "samples", // Name of the array in your schema
  });

  const handleSubmit = ({ formdata, data, formDataJson }) => {
    console.log(data);
    createFn(data);
  };

  return (
    <Form control={control} onSubmit={handleSubmit}>
      <div className="p-6.5">
        {fields.map((item, index) => (
          <div key={item.id}>
            <div className="mb-2 border-b-2  flex justify-between">
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
                  Batch
                </label>

                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register(`samples.${index}.batch_id`)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value={0}>------------</option>
                    {data?.batches?.map((t: any) => (
                      <option value={t.id} key={t.id}>
                        {t.batch_no}
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
              <div className="w-full xl:w-1/5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Sample Id
                </label>
                <input
                  type="text"
                  {...register(`samples.${index}.sample_id`)}
                  placeholder="Enter Test Type"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Sample Name
                </label>
                <input
                  type="text"
                  {...register(`samples.${index}.name`)}
                  placeholder="Enter Test Type"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Department
                </label>
                <input
                  type="text"
                  {...register(`samples.${index}.department`)}
                  placeholder="Enter Test Type"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
            </div>

            {/* // Test Params */}
            <TestParamsForm
              nestIndex={index}
              data={data}
              {...{ control, register }}
            />
          </div>
        ))}
        <button
          type="button"
          className="flex mt-2  mb-4 justify-center rounded bg-primary p-3 font-medium text-gray"
          onClick={() => append({
            sample_id: "",
            name: "",
            batch_id: 0,
            department: "",
            test_params: [
              {
                test_parameter_id: "",
                test_type: "",
              },
            ],
          })}
        >
          Add Batch
        </button>
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};

const TestParamsForm = ({ nestIndex, control, register, data }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `samples.${nestIndex}.test_params`,
  });

  return (
    <div className="mb-4">
      {fields.map((item, index) => (
        <div key={item.id} className="mb-4 mt-2">
          <div className="mb-2 border-b-2  flex justify-between">
            <p>
              Test Parameter <strong>#{index + 1}:</strong>
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
            <div className="w-full xl:w-1/5 ">
              <label className="mb-2.5 block text-black dark:text-white">
                Test Parameter Name
              </label>

              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  {...register(
                    `samples.${nestIndex}.test_params.${index}.test_parameter_id`
                  )}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">------------</option>
                  {data.test_params?.map((t: any) => (
                    <option value={t.id} key={t.id}>
                      {t.test_parameter.testing_parameters}
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
            <div className="w-full xl:w-1/5">
              <label className="mb-2.5 block text-black dark:text-white">
                Test Type
              </label>
              <input
                type="text"
                {...register(
                  `samples.${nestIndex}.test_params.${index}.test_type`
                )}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="flex mt-2 mb-4 justify-center rounded bg-primary p-3 font-medium text-gray"
        onClick={() =>
          append({ test_parameter_id: "",  test_type: "", })
        }
      >
        Add Test parameter
      </button>
    </div>
  );
};

export default SamplesForm;
