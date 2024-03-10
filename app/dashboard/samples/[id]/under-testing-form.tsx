"use client";
import { useFieldArray, useForm, Form } from "react-hook-form";

type Parameters = [
  {
    id: number;
    sample_id: number;
    test_parameter_id: number;
    test_type: string;
    value: string;
    result: true;

    created_by: number;
    updated_by: number;
    test_parameter: {
      id: number;
      branch_id: number;
      test_type_id: number;
      product_id: number;
      customer_id: number;
      created_at: "2024-03-10T08:14:48.411Z";
      updated_at: "2024-03-10T08:14:48.411Z";
      parameter_code: string;
      testing_parameters: string;
      amount: number;
      method_or_spec: string;
      group_of_test_parameters: "string";
    };
  }
];

const UnderTestingForm = ({
  parameters,
  patchFn,
  assigned_to,
  step
}: {
  parameters: Parameters;
  patchFn: (data: any) => void;
  assigned_to: number;
  step: number
}) => {
  const { control, register } = useForm({
    defaultValues: {
      status: "",
      status_id: step,
      assigned_to,
      comments: "",
      test_params: parameters.map((para) => ({
        id: para.id,
        value: para.value,
        result: para.result ? 1 : 0,
        test_name: para.test_parameter.testing_parameters,
      })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test_params",
  });

  const handleSubmit = ({ formdata, data, formDataJson }) => {
    console.log(data);
    patchFn(data);
  };

  return (
    <Form onSubmit={handleSubmit} control={control}>
      <input type="hidden" value="" name="status" />
      <input type="hidden" value="6" name="status_id" />
      <input type="hidden" value={assigned_to} name="assigned_to" />

      <input type="hidden" value="" name="comments" />

      <div className="mb-4">
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 mt-2">
            <div className="mb-2 border-b-2  flex justify-between">
              <p>
                Test Parameter <strong>#{index + 1}:</strong>
              </p>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/5">
                <input type="hidden" {...register(`test_params.${index}.id`)} />
                <label className="mb-2.5 block text-black dark:text-white">
                  Test Name
                </label>
                <input
                  type="text"
                  {...register(`test_params.${index}.test_name`)}
                  disabled
                />
              </div>
              <div className="w-full xl:w-1/5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Value <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  {...register(`test_params.${index}.value`)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/5 ">
                <label className="mb-2.5 block text-black dark:text-white">
                  Result
                </label>

                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    {...register(`test_params.${index}.result`)}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value={1}>True</option>
                    <option value={0}>False</option>
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
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray"
      >
        Submit
      </button>
    </Form>
  );
};

export default UnderTestingForm;
