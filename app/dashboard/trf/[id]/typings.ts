enum YesOrNo {
  YES = "YES",
  NO = "NO",
}

enum SamplingBy {
  CUSTOMER = "CUSTOMER",
  LABORATORY = "LABORATORY",
}

enum TestingProcess {
  BATCH_ANALYSIS = "BATCH_ANALYSIS",
  METHOD_DEVELOPMENT = "METHOD_DEVELOPMENT",
  METHOD_VALIDATION = "METHOD_VALIDATION",
  RD_RESEARCH = "RD_RESEARCH",
  REGULATORY = "REGULATORY",
}

enum ReportSentBy {
  COURIER = "COURIER",
  EMAIL = "EMAIL",
  // Add actual values if available
}

enum DisposalProcess {
  DISCARD = "DISCARD",
  RETURN = "RETURN",
}

enum DocumentsType {
  MSDS = "MSDS",
  COA = "COA",
  IFU = "IFU",
  IF_ANY_OTHER = "IF_ANY_OTHER",
}
type TestDetail = {
  id: number;
  priority_order: number;
  parameter_id: number;
};
export type Data = {
  products: {
    id: number;
    product_name: string;
  }[];
  test_types: {
    id: number;
    name: string;
  }[];
  trf: {
    sample_id: string;
    sample_name: string;
    description: string;
    manufactured_by: string;
    batch_or_lot_no: string;
    manufactured_date: Date;
    expiry_date: Date;
    batch_size: number;
    format_name: string;
    nabl_logo: boolean;
    no_of_samples: number;
    sample_storage_condition: string;
    sampling_by: SamplingBy;
    testing_process: TestingProcess[];
    report_sent_by: ReportSentBy[];
    sample_disposal_process: DisposalProcess;
    fail_statement_sent: YesOrNo;
    specific_decision_rule: YesOrNo;
    binary_decision_rule: YesOrNo;
    submission_of_documents: DocumentsType[];
    test_types_ids: number[];
    test_details: TestDetail[];
    product_id: number;
    product:{
      id:number;
      product_name: string;
    }
  };
};
type ParametersType = {
  id: number;
  testing_parameters: string;
  test_type: {
    name: string;
  };
}[];
