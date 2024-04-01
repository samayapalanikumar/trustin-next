import { Data } from "./page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatusStepper from "./status-stepper1";
import UnderTestingForm from "./under-testing-form";
import WorkFlowForm from "@/components/WorkFlowForms/workflowform";
type Props = {
  data: Data;
  actionFn: (
    prevState: any,
    data: FormData,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
  actionFnResult: (
    data: any,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
  actionFnReject: (
    data: any,
  ) => Promise<
    { fieldErrors: null; type: string; message: string | undefined } | undefined
  >;
};

type Workflow = {
  id: number;
  sample_status_id: number;
  assigned_to: number | null;
  status: string;
  assignee: { first_name: string; last_name: string } | null;
  department: { id: number; name: string } | null;
  role: { id: number; name: string } | null;
  updated_at: string;
}[];

type History = {
  id: number;
  from_status_id: number;
  to_status_id: number;
  assigned_to: number | null;
  comments: string | null;
  created_at: string;
  created_by: number;
  from_status: { id: number; name: string } | null;
  to_status: { id: number; name: string } | null;
  assignee: { first_name: string; last_name: string } | null;
  created_by_user: { first_name: string; last_name: string } | null;
}[];
const status = [
  "Draft",
  "Review Pending",
  "Requested",
  "Received",
  "Under Testing",
  "Verification Pending",
  "Done",
];
const SampleWorkflowForm = ({
  data,
  actionFn,
  actionFnResult,
  actionFnReject,
}: Props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <Tabs defaultValue="status" className="mt-1 w-full p-4">
        <TabsList>
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="status">
          <div className="mb-3 w-full flex-col">
            <StatusStepper step={data?.sample?.status_id} />

            <div className="mt-1 flex flex-col gap-9 ">
              {data?.sample?.status_id === 1 && (
                <WorkFlowForm
                  rejectActionData={actionFnReject}
                  currentStep={data?.sample?.status_id}
                  actionData={actionFn}
                  assign={data?.sample?.assigned_to}
                  status="Submitted"
                  status_id={2}
                  buttonName="Submit for Review"
                />
              )}
              {data?.sample?.status_id === 2 && (
                <>
                  <WorkFlowForm
                    showRejectButton={true}
                    rejectActionData={actionFnReject}
                    currentStep={data?.sample?.status_id}
                    actionData={actionFn}
                    assign={data.sample.assigned_to}
                    status_id={3}
                    buttonName="Approve"
                  />
                </>
              )}

              {data.sample.status_id === 3 && (
                <WorkFlowForm
                  showRejectButton={true}
                  rejectActionData={actionFnReject}
                  currentStep={data?.sample?.status_id}
                  actionData={actionFn}
                  assign={data.sample.assigned_to}
                  status_id={4}
                  buttonName="Sample Received"
                  showComment={true}
                />
              )}

              {data.sample.status_id === 4 && (
                <WorkFlowForm
                  showRejectButton={true}
                  rejectActionData={actionFnReject}
                  currentStep={data?.sample?.status_id}
                  actionData={actionFn}
                  assign={data.sample.assigned_to}
                  status_id={5}
                  buttonName="Assign"
                  assigneeData={data.users}
                  showComment={true}
                />
              )}

              {data.sample.status_id === 5 && (
                <UnderTestingForm
                  showRejectButton={true}
                  rejectActionData={actionFnReject}
                  currentStep={data?.sample?.status_id}
                  assigned_to={data.sample.assigned_to}
                  parameters={data.sample.sample_test_parameters}
                  patchFn={actionFnResult}
                  step={6}
                />
              )}
              {data.sample.status_id === 6 && (
                <UnderTestingForm
                  showRejectButton={true}
                  rejectActionData={actionFnReject}
                  currentStep={data?.sample?.status_id}
                  assigned_to={data.sample.assigned_to}
                  parameters={data.sample.sample_test_parameters}
                  patchFn={actionFnResult}
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
              <p>{data.sample?.registration?.code}</p>
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
                {data?.sample?.assignee?.first_name +
                  " " +
                  data?.sample?.assignee?.last_name}
              </p>
            </div>

            <div className="w-full xl:w-1/5">
              <p className="mb-2.5 block font-semibold text-black dark:text-white">
                Department:
              </p>
              <p>{data?.sample?.assignee?.department}</p>
            </div>
          </div>
          <div className="mb-4.5 ml-2 flex flex-col gap-6 p-2 xl:flex-row">
            <div className="w-full xl:w-1/5">
              <p className="mb-2.5 block font-semibold text-black dark:text-white">
                Company Name:
              </p>
              <p>{data.sample?.registration?.company_name}</p>
            </div>

            <div className="w-full xl:w-1/5">
              <p className="mb-2.5 block font-semibold text-black dark:text-white">
                Department:
              </p>
              <p>{data?.sample?.assignee?.department}</p>
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
                <p>{testParameter.test_parameter.method_or_spec}</p>
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
        </TabsContent>
        <TabsContent value="workflow">
          <div className="min-h-28">
            <WorkflowTable workflow={data.sample.sample_workflows} />
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="min-h-28">
            <HistoryTable history={data.sample.sample_history} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SampleWorkflowForm;

const WorkflowTable = ({ workflow }: { workflow: Workflow }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Status
              </th>
              <th className="w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Updated At
              </th>
              <th className="w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Assignee
              </th>
              <th className="w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Status
              </th>
              <th className="w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Role
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Department
              </th>
            </tr>
          </thead>
          <tbody>
            {workflow?.map((flow, idx) => (
              <tr key={flow.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {status[idx]}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {new Date(flow.updated_at).toLocaleString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {flow.assignee
                      ? `${flow.assignee.first_name} ${flow.assignee.last_name}`
                      : "---"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {flow.status ?? "---"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {flow?.role?.name ?? "---"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-base font-medium text-black dark:text-white">
                    {flow?.department?.name ?? "---"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HistoryTable = ({ history }: { history: History }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="w-[200px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Assignee
              </th>
              <th className="min-w-[130px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Created by
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Comments
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                From
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                To
              </th>
            </tr>
          </thead>
          <tbody>
            {history?.map((h, idx) => (
              <tr key={h.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {new Date(h.created_at).toLocaleString()}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {h.assignee
                      ? `${h.assignee.first_name} ${h.assignee.last_name}`
                      : "No Name"}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {h.created_by_user
                      ? `${h.created_by_user.first_name} ${h.created_by_user.last_name}`
                      : "No Name"}{" "}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {h?.comments ?? "---"}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {h?.from_status?.name ?? "---"}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {h?.to_status?.name ?? "---"}
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
