import Link from "next/link";
import Image from 'next/image'
import { MoveLeft } from 'lucide-react';

export default function NotFound() {
  return <>
      <div className='min-h-screen  flex flex-col items-center justify-center w-11/12 mx-auto text-center'>
        <div className='my-0 h-36 lg:h-40 xl:h-60 '>
      <Image
           className="w-full h-full"
           src={"/images/error/error-img.png"}
           alt="Logo"
           width={176}
           height={32}
           priority
        />
        </div>
        <div className='grid items-center justify-items-center gap-3'>
      <h2 className='my-0 text-2xl lg:text-3xl text-center font-bold'>Not Found</h2>
      <p className="text-xl font-bold">Could not find requested resource</p>
     
       <Link href="/dashboard"
      //  className='bg-indigo-500 py-2 px-4 text-xl text-center my-3 text-white rounded-lg'
      className='flex items-center justify-center gap-2 rounded-md px-2.5 py-3 text-sm bg-primary lg:px-4 lg:py-5 my-3 lg:text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      >
        <MoveLeft />
        Return Dashboard</Link>
        
    
      </div>
      </div>
      </>
}
