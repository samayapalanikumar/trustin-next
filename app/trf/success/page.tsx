import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TRF | Success",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function DashboardPage() {
  return (
    <>
      <h1 className="font-extrabold text-4xl">Test Request From Submitted Successfully.</h1>
    </>
  );
}
