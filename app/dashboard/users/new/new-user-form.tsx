"use client";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/submit-button/submit-button";
import { createUser } from "../actions";
import Select from "@/components/select-input";
import { Department } from "@/types/department";
import { TestType } from "@/types/test-type";
import { Role } from "@/types/role";

type Props = {
  roles: Role[];
  departments: Department[];
  test_types: TestType[];
};
const initalState = {
  fieldErrors: null,
  message: "",
};
const NewUserForm = ({ roles, departments, test_types }: Props) => {
  const [state, formAction] = useFormState(createUser, initalState);
  return (
    <form action={formAction}>
      <div className="p-6.5">
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              First name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter your first name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mb-2.5 block text-black dark:text-white">
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter your last name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Email <span className="text-meta-1">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Phone <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your email address"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Confrim Password
          </label>
          <input
            type="password"
            name="password2"
            placeholder="Confrim Password"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <Select label="Role" name="role_id">
          {roles.map((role) => (
            <option value={role.id} key={role.id}>
              {role.name}
            </option>
          ))}
        </Select>

        <Select label="Deparment" name="department_id">
          {departments.map((department) => (
            <option value={department.id} key={department.id}>
              {department.name}
            </option>
          ))}
        </Select>

        <Select label="QA Type" name="qa_type_id">
          <option value="null">-----</option>
          {test_types.map((test_type) => (
            <option value={test_type.id} key={test_type.id}>
              {test_type.name}
            </option>
          ))}
        </Select>

        <SubmitButton />
      </div>
    </form>
  );
};

export default NewUserForm;
