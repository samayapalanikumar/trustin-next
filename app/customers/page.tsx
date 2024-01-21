import TableThree from "@/components/Tables/TableThree";
import Link from "next/link";

const CustomerPage = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Customers
        </h2>
        <Link
          href="/customers/new"
          className="inline-flex items-center justify-center rounded-md border border-black py-4 px-5 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          New Customers
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default CustomerPage;
