'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import Image from 'next/image'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='h-52 sm:h-72 lg:h-96'>
      <Image
           className="w-full h-full"
           src={"/images/error/error-img-two.webp"}
           alt="Logo"
           width={176}
           height={32}
           priority
        />
        </div>
        <div className='grid items-center justify-items-center'>
      <h2 className='text-2xl lg:text-3xl mb-3 text-center font-bold'>Something went wrong!</h2>
     
      <button
      //  className='bg-indigo-500 py-2 px-4 text-xl text-center my-3 text-white rounded-lg'
      className='rounded-md bg-primary px-3.5 py-2.5 lg:px-4 lg:py-3 my-3 text-sm lg:text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
      </div>
      </div>
  )
}