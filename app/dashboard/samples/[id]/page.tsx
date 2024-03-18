import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";
import StatusStepper from "./status-stepper1";
import { patchSampleWorkflow, patchSampleWorkflowTestResult } from "../actions";
import UnderTestingForm from "./under-testing-form";
import WorkFlowForm,{Assignee} from "@/components/WorkFlowForms/workflowform";
export const metadata: Metadata = {
  title: "Edit  Product | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

async function getData(id: string) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}samples/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });

  const res2 = await fetch(`${SERVER_API_URL}branch/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
  });
  const res3 = await fetch(`${SERVER_API_URL}users/`, {
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
  }
  const sample = await res.json();
  const branches = await res2.json();
  const users = await res3.json();
  return {
    sample,
    branches,
    users,
  };
}

type Data = {
  sample: {
    id: number;
    sample_id: string;
    name: string;
    registration_id: number;
    status_id: number;
    department: string;
    assigned_to: number;
    batch_id: number;

    created_by: number;
    updated_by: number;
    status: string;
    sample_test_parameters: [
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
      },
    ];
    sample_workflows: [
      {
        id: number;
        sample_status_id: number;
        assigned_to: number;
        status: string;
      },
    ];
    sample_history: [
      {
        id: number;
        from_status_id: number;
        to_status_id: number;
        comments: string;
        created_at: string;
        created_by: number;
      },
    ];
    status_data: {
      id: number;
      name: string;
    };
    assignee: {
      first_name: string;
      last_name: string;
      department: string;
    };
    batch: {
      id: number;
      registration_id: number;
      batch_no: string;
      manufactured_date: string;
      expiry_date: string;
      batch_size: number;
      received_quantity: number;
      created_by: number;
      updated_by: number;
    };
  };
  branches: {
    id: number;
    branch_name: string;
  }[];
  users: {
    id: number;
    first_name: string;
    last_name: string;
  }[];
};

const EditSamplePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data: Data = await getData(id);
  //   const updateProductWithId = updateProducts.bind(null, id);
  const patchSampleWorkflowWithId = patchSampleWorkflow.bind(null, id);
  const patchSampleWorkflowResultWithId = patchSampleWorkflowTestResult.bind(
    null,
    id,
  );

  const workFlowFormData = [
    {
      value:"1",
      buttonName:" Submit for Review",
      status:"status",
      submit:"Submitted"
    },
    {
      value:"2",
      buttonName:"Reject",
      status:"status",
      submit:""
    },
    {
      value:"3",
      buttonName:"Approve",
      status:"status",
      submit:""
    },
    {
      value:"4",
      buttonName:"Sample Received",
      status:"status",
      submit:""
    }
  ]

  return (
    <>
      <Breadcrumb pageName="Sample WorkFlow" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-2 py-4 dark:border-strokedark">
              <h3 className="font-bold text-black dark:text-white">Status</h3>
            </div>
            <div className="mb-5  flex   w-full flex-col">
              <StatusStepper step={data.sample.status_id} />

              <div className="mt-2 w-full ">
                {data.sample.status_id === 1 && (
                  <WorkFlowForm actiondata={patchSampleWorkflowWithId} assign={data.sample.assigned_to} formdata={workFlowFormData[0]}/>
                )}
                {data.sample.status_id === 2 && (
                  <>
                    <WorkFlowForm actiondata={patchSampleWorkflowWithId} assign={data.sample.assigned_to} formdata={workFlowFormData[1]}/>
                    <WorkFlowForm actiondata={patchSampleWorkflowWithId} assign={data.sample.assigned_to} formdata={workFlowFormData[2]}/>
                  </>
                )}

                {data.sample.status_id === 3 && (
                  <WorkFlowForm actiondata={patchSampleWorkflowWithId} assign={data.sample.assigned_to} formdata={workFlowFormData[3]}/>
                )}

                {data.sample.status_id === 4 && (
                  <Assignee actiondata={patchSampleWorkflowWithId} assign={data.sample.assigned_to} formdata={workFlowFormData[3]} users={data?.users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.first_name + user.last_name}
                    </option>
                  ))}/>
                )}

                {data.sample.status_id === 5 && (
                  <UnderTestingForm
                    assigned_to={data.sample.assigned_to}
                    parameters={data.sample.sample_test_parameters}
                    patchFn={patchSampleWorkflowResultWithId}
                    step={6}
                  />
                )}
                {data.sample.status_id === 6 && (
                  <UnderTestingForm
                    assigned_to={data.sample.assigned_to}
                    parameters={data.sample.sample_test_parameters}
                    patchFn={patchSampleWorkflowResultWithId}
                    step={7}
                  />
                )}
                {data.sample.status_id === 7 && (
                  <div className="text-center text-title-xl2 font-bold">
                    <h4>Sample WorkFlow Completed</h4>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4.5 ml-2 flex flex-col gap-6 p-2 xl:flex-row">
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Sample ID:
                </p>
                <p>{data.sample.sample_id}</p>
              </div>
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Sample Name:
                </p>
                <p>{data.sample.name}</p>
              </div>

              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Registration ID:
                </p>
                <p>REG{data.sample.registration_id}</p>
              </div>

              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Department:
                </p>
                <p>{data.sample.department}</p>
              </div>

              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Status
                </p>
                <p>
                  <strong>{data.sample.status}</strong>
                </p>
              </div>
            </div>

            <div className="mb-4.5 ml-2 flex flex-col gap-6 p-2 xl:flex-row">
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Batch No:
                </p>
                <p>{data.sample.batch.batch_no}</p>
              </div>
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Manufactured Date:
                </p>
                <p>
                  {
                    new Date(data.sample.batch.manufactured_date)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>

              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Expiry Date:
                </p>
                <p>
                  {
                    new Date(data.sample.batch.expiry_date)
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Batch Size:
                </p>
                <p>{data.sample.batch.batch_size}</p>
              </div>
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Receiverd Quantity:
                </p>
                <p>{data.sample.batch.received_quantity}</p>
              </div>
            </div>

            <div className="mb-4.5 ml-2 flex flex-col gap-6 p-2 xl:flex-row">
              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Assignee:
                </p>
                <p>
                  {data.sample.assignee.first_name +
                    " " +
                    data.sample.assignee.last_name}
                </p>
              </div>

              <div className="w-full xl:w-1/5">
                <p className="mb-2.5 block font-semibold text-black dark:text-white">
                  Department:
                </p>
                <p>{data.sample.assignee.department}</p>
              </div>
            </div>

            <div className="border-b border-stroke px-2 py-4 dark:border-strokedark">
              <h3 className="font-bold text-black dark:text-white">
                Test Parameters
              </h3>
            </div>

            {data.sample.sample_test_parameters.map((testParameter) => (
              <div
                className="mb-4.5 ml-2 flex flex-col gap-6 p-2 xl:flex-row"
                key={testParameter.id}
              >
                <div className="w-full xl:w-1/5">
                  <p className="mb-2.5 block font-semibold text-black dark:text-white">
                    Test Paramenter Code:
                  </p>
                  <p>{testParameter.test_parameter.parameter_code}</p>
                </div>

                <div className="w-full xl:w-1/5">
                  <p className="mb-2.5 block font-semibold text-black dark:text-white">
                    Test Paramenter Name:
                  </p>
                  <p>{testParameter.test_parameter.testing_parameters}</p>
                </div>
                <div className="w-full xl:w-1/5">
                  <p className="mb-2.5 block font-semibold text-black dark:text-white">
                    Test Method:
                  </p>
                  <p>{testParameter.test_type}</p>
                </div>
                {data.sample.status_id >= 6 && (
                  <>
                    {" "}
                    <div className="w-full xl:w-1/5">
                      <p className="mb-2.5 block font-semibold text-black dark:text-white">
                        Value
                      </p>
                      <p>{testParameter?.value ?? ""}</p>
                    </div>
                    <div className="w-full xl:w-1/5">
                      <p className="mb-2.5 block font-semibold text-black dark:text-white">
                        Result
                      </p>
                      <p>{testParameter?.result ? "true" : "false"}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSamplePage;
