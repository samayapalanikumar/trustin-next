import { FollowupData } from "@/app/dashboard/page";

const FollowupCountTable = ({ data }: { data: FollowupData[] }) => {
  return (
    <div className="mt-1 rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Followup Count
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
          <div className="py-2.5 pl-2.5 xl:p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              S.NO
            </h5>
          </div>
          <div className="p-2.5  xl:p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Assigned User
            </h5>
          </div>
          <div className="p-2.5  xl:p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Followup Count
            </h5>
          </div>
        </div>

        {data.map((d, idx) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-3 ${
              idx === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={d.user_id}
          >
            <div className="flex items-center gap-1 p-2.5 xl:p-2">
              <p className="hidden text-center text-black dark:text-white sm:block ">
                {idx + 1}
              </p>
            </div>

            <div className="flex items-center gap-1 p-2.5 xl:p-5">
              <p className="hidden text-center text-black dark:text-white sm:block ">
                {d.user_name}
              </p>
            </div>

            <div className="flex items-center  gap-1 p-2.5 text-center  xl:p-5 ">
              <p className="text-black dark:text-white ">{d.followup_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowupCountTable;
