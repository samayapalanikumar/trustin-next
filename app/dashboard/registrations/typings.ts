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