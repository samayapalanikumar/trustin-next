import TableThree from "@/components/Tables/TableThree";
import Link from "next/link";

const CustomerFollowupPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Customer Followup 
        </h2>
        <Link
          href="/followup/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          New Customer Followup 
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default CustomerFollowupPage;
