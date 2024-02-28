import image from "@/app/image/1.svg";
import image2 from "@/app/image/2.svg";
import Image from "next/image";

const Page=() => {
    return (
        <div>
        <div className=" p-10 flex flex-col sm:flex-row justify-center items-center bg-[#e3cbbfae]  mt-20">

            <div className="basis-1/2 p-10 ">
            <h1 className="font-extrabold text-5xl">Bettter digital experience with Ninestars</h1>
           <p className="text-2xl"> We are team of talented designers making websites with Bootstrap</p>

           <div  className="pt-12">
           <button className="p-4 px-10 box-content bg-[#f2601d] text-white rounded-md">Get started</button>
           </div>
           </div>

           <div>
             <Image src={image} alt=" "  width={500} height={500}/>
             </div>

        </div>
               <div className=" bg-[#f3edeaae] flex  flex-col sm:flex-row justify-center items-center  mt-20 ">
                <div className="basis-1/2">
                <Image src={image2} alt="" width={500} height={500} />
                </div>
                <div className="p-10 grid grid-cols-2 sm:grid-row-3 basis-1/2 ">
                <div className="col-span-3 ">
                <h2 className="font-bold text-4xl">Voluptatem dignissimos provident quasi</h2>
                <p className="text-xl p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                     ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit</p>
            </div>

            <div className="p-3">
                <h2 className="font-extrabold text-2xl">Corporis voluptates sit</h2>
                <p className="text-1xl">Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
            </div>

            <div className="p-3  col-span-2  ">
                <h2 className="font-extrabold text-2xl">Ullamco laboris nisi</h2>
                <p className="text-1xl">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
            </div>
            </div>
            </div>
        </div>

    )
}
export default Page

