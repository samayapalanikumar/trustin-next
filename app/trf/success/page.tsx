import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
// import image from "@/app/image/logi.png"
import Image from "next/image";

export const metadata: Metadata = {
  title: "TRF | Success",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function DashboardPage() { 
  return (
    <> 
    <div >
  <div className="flex justify-center items-center  mt-50  md:flex-1 sm:flex">
    <div className="p-15 flex flex-col justify-center items-center shadow-xl bg-gray-100">
    <Image className="p-2" src={"/images/trf/img3.webp"} width={150} height={130} alt="success"/>
      <p className="font-black italic text-2xl text-left md:text-center">Test Request Form Submitted Successfully..!</p>
    </div>
  </div>
  </div>
    </> 
    
  );
}