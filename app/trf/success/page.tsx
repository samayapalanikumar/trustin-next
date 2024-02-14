import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import image from "@/app/image/image1.jpeg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "TRF | Success",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function DashboardPage() {
  return (
    <>
      <h1 className="font-extrabold text-rxl p-10 text-center ">Test Request From Submitted Successfully.</h1>
      {
      [
        1,2 
      ].map((item)=>(
        <Image src={image} alt="" key={item}/>
      ) )    
        }
    </>
  );
}

