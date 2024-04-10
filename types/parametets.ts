type Product = {
    branch_id: number;
    product_code: string;
    description: string;
    updated_at: string | null;
    id: number;
    product_name: string;
    created_at: string;
};

type Branch = {
    id: number;
    address_line2: string | null;
    landline_number: string | null;
    pan_no: string | null;
    gstin: string | null;
    ifsc_code: string | null;
    branch_name: string;
    address_line1: string | null;
    mobile_number: string | null;
    email: string | null;
    cin: string | null;
    bank_details: string | null;
};

type TestType = {
    name: string;
    description: string;
    updated_at: string | null;
    id: number;
    created_at: string;
};

export type FullParametersType = {
    product_id: number|null;
    updated_at: string | null;
    customer_id: string | null;
    parameter_code: string;
    testing_parameters: string;
    amount: number;
    branch_id: number;
    method_or_spec: string;
    group_of_test_parameters: string | null;
    id: number;
    test_type_id: number;
    created_at: string;
    product: Product;
    branch: Branch;
    test_type: TestType;
};