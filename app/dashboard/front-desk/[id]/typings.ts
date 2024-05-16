type ContactPerson = {
    id: number;
    mobile_number: string;
    contact_email: string;
    updated_at: string | null;
    customer_id?: number;
    person_name: string;
    designation: string;
    landline_number: string;
    created_at: string;
  };
  
  export type Customer = {
    pincode_no: string; 
    gst: string;
    customer_code: string;
    website: string;
    created_at: string;
    id: number;
    company_name: string;
    email: string;
    company_id: number | null;
    nature_of_business: string;
    customer_address_line1: string;
    product_details: string;
    customer_address_line2: string;
    market: string;
    updated_at: string;
    city: string;
    regulatory: string;
    state: string;
    pan: string;
    contact_persons: ContactPerson[];
  };