import { TestReportForm } from "@/app/trf/typings";
import { Customer } from "../customers/[id]/typings";
import { BranchType } from "../branches/branch-table";

type Batch = {
    batch_no: string;
    manufactured_date: string;
    expiry_date: string;
    batch_size: number;
    received_quantity: number;
  };
  
  type TestParam = {
    test_params_id: number|string;
  };
  
  type TestType = {
    test_type_id: number|string;
  };
  
  export type CreateData = {
    branch_id: number|string;
    trf_id: number|string;
    company_id: number|string;
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

  export type ParametersType = {
    id: number;
    branch: { branch_name: string };
    test_type: { name: string } ;
    test_type_id:number;
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
    trf: TestReportForm;
    trflist: { label: string; value: number }[];
    parameters: ParametersType[];
    mechParameters: ParametersType[];
    microParameters: ParametersType[];
    customers: Customer[];
    branches: BranchType;
    products: ProductsArray
  }