import React from "react";
import Select from "../select-input";

type Props = {
  actionData: (data: FormData) => Promise<void>;
  assign: number;
  status?: string;
  status_id: number;
  currentStep: number;
  comment?: string;
  buttonName: string;
  assigneeData?: { id: number; first_name: string; last_name: string }[] | [];
  showComment?: boolean;
};

function WorkFlowForm({
  actionData,
  assign,
  status = "",
  status_id,
  buttonName,
  currentStep,
  assigneeData = [],
  showComment = false,
  comment = "",
}: Props) {
  return (
    <>
      <form action={actionData}>
        <div className="p-6.5">
          <input type="hidden" value={status} name="status" />
          <input type="hidden" value={status_id} name="status_id" />
          {currentStep === 4 ? (
            <Select name="assigned_to" label="assignee">
              {assigneeData?.map((assignee) => (
                <option value={assignee.id} key={assignee.id}>
                  {assignee.first_name + assignee.last_name}
                </option>
              ))}
            </Select>
          ) : (
            <input type="hidden" defaultValue={assign} name="assigned_to" />
          )}

          {showComment ? (
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Comments
              </label>
              <textarea
                rows={3}
                name="comments"
                defaultValue={comment}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>{" "}
            </div>
          ) : (
            <input type="hidden" value={comment} name="comments" />
          )}
          <button
            type="submit"
            className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray"
          >
            {buttonName}
          </button>
        </div>
      </form>
    </>
  );
}

export default WorkFlowForm;

