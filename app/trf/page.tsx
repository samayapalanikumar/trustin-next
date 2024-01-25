import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import TRFForm from "./client-form";
export const metadata: Metadata = {
  title: "TRF | Trustin",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};




const NewTestParameterPage = () => {
  return(
    <div>
        <TRFForm />
    </div>
  )
};

export default NewTestParameterPage;
