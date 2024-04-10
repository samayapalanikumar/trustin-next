type Followup = {
    id: number;
    product_id: number;
    date: string;
    trf_id: number;
    updated_at: string;
    customer_id: number;
    marketing_status: string;
    assign_to: number;
    remarks: string;
    created_at: string;
  };
  
  type TestType = {
    name: string;
    created_at: string;
    updated_at: string | null;
    id: number|string;
    description: string;
  };
  
  export type TestDetail = {
    priority_order: number;
    parameter_id: number; 
    id: number;
    trf_id: number;
  };
  
  type Product = {
    product_code: string;
    product_name: string;
    created_at: string;
    id: number;
    branch_id: number; // You may need to replace `any` with the appropriate type
    description: string;
    updated_at: string | null;
  };
  
  type Customer = {
    company_id: number; // You may need to replace `any` with the appropriate type
    nature_of_business: string;
    id: number;
    customer_address_line1: string;
    product_details: string;
    customer_address_line2: string;
    market: string;
    updated_at: string;
    regulatory: string;
    city: string;
    state: string;
    pan: string;
    customer_code: string;
    pincode_no: string;
    gst: string;
    website: string;
    created_at: string;
    company_name: string;
    email: string;
  };
  
  export type TestReportForm = {
    id: number;
    trf_code: string;
    expiry_date: string;
    report_sent_by: string[]; // You may need to replace `any[]` with the appropriate type
    created_at: string;
    batch_size: number;
    updated_at: string;
    sample_id: string;
    format_name: string;
    sample_disposal_process: string;
    branch_id: number; // You may need to replace `any` with the appropriate type
    product_id: number;
    sample_name: string;
    nabl_logo: boolean;
    fail_statement_sent: string;
    customer_id: number;
    description: string;
    no_of_samples: number;
    specific_decision_rule: string;
    manufactured_by: string;
    sample_storage_condition: string;
    binary_decision_rule: string;
    batch_or_lot_no: string;
    sampling_by: string;
    submission_of_documents: string[];
    date_of_registration: string; // You may need to replace `any` with the appropriate type
    manufactured_date: string;
    testing_process: string[];
    product: Product;
    customer: Customer;
    followup: Followup[];
    test_types: TestType[];
    test_details: TestDetail[];
  };
  