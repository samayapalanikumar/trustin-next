import { TestReportForm } from "@/app/trf/typings";
import { Customer } from "../customers/[id]/typings";
import { BranchType } from "../branches/branch-table";
import { FullParametersType } from "@/types/parametets";

type Batch = {
  batch_no: string;
  manufactured_date: string;
  expiry_date: string;
  batch_size: number;
  received_quantity: number;
};

type UpdateBatchType = Batch & { id: string | null };

type TestParam = {
  test_params_id: number | string;
};

export type TestType = string[] | number[];
export type CreateData = {
  branch_id: number | string;
  trf_id: number | string;
  company_id: number | string;
  company_name: string;
  customer_address_line1: string;
  customer_address_line2: string;
  city: string;
  state: string;
  pincode_no: string;
  gst: string;
  date_of_received: string;
  product: number;
  batches: Batch[];
  test_params_mech: TestParam[];
  test_params_micro: TestParam[];
  test_types: TestType[];
};

export type UpdateData = {
  branch_id: number | string;
  trf_id: number | string;
  company_id: number | string;
  company_name: string;
  customer_address_line1: string;
  customer_address_line2: string;
  city: string;
  state: string;
  pincode_no: string;
  gst: string;
  date_of_received: string;
  product: number;
  batches: UpdateBatchType[];
  test_params_mech: TestParam[];
  test_params_micro: TestParam[];
  test_types: string[];
};

export type ParametersType = {
  id: number;
  branch: { branch_name: string };
  test_type: { name: string };
  test_type_id: number;
  product: { product_name: string } | null;
  parameter_code: string;
  testing_parameters: string;
  amount: number;
  method_or_spec: string;
  group_of_test_parameters: string;
}[];

type Product = {
  product_code: string;
  created_at: string;
  id: number;
  branch_id: any; // You may need to replace `any` with the appropriate type
  product_name: string;
  description: string;
  updated_at: string | null;
};

type ProductsArray = Product[];

export type Data = {
  trf: TestReportForm[];
  trflist: { label: string; value: string }[];
  parameters: FullParametersType[];
  mechParameters: FullParametersType[];
  microParameters: FullParametersType[];
  customers: Customer[];
  branches: BranchType;
  products: ProductsArray;
};

type TestTypeData = {
  id: number;
  registration_id: number;
  test_type_id: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
};

interface TestParameter {
  id: number;
  registration_id: number;
  test_params_id: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  test_parameter: {
    id: number;
    branch_id: number;
    test_type_id: number;
    product_id: number;
    customer_id: number;
    created_at: string;
    updated_at: string;
    parameter_code: string;
    testing_parameters: string;
    amount: number;
    method_or_spec: string;
    group_of_test_parameters: string;
  };
}

export type RegistrationType = {
  id: number;
  code: string;
  branch_id: number;
  trf_id: number;
  company_id: number;
  company_name: string;
  customer_address_line1: string;
  customer_address_line2: string;
  city: string;
  state: string;
  pincode_no: string;
  gst: string;
  date_of_registration: string;
  date_of_received: string;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
  product: number;
  trf: TestReportForm;
  batches: UpdateBatchType[];
  test_params: TestParameter[];
  test_params_mech: TestParameter[];
  test_params_micro: TestParameter[];
  test_types: string[];
};

export type UpdateDataType = Data & {
  registration: RegistrationType;
};
