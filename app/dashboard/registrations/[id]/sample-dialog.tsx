"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, Form, useFieldArray } from "react-hook-form";

const SampleDialog = () => {
  const form = useForm();

  const handleSubmit = () => console.log("HI");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-danger p-3 font-medium text-white"
        >
          Create Sample
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Samples</DialogTitle>
          <div>
            <Form control={form.control} onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Customer Ref / Po / Trf No
                    </label>

                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        {...form.register("trf_id")}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        <option value="">------------</option>
                        {/* {data.trf.map((t: any) => (
                          <option value={t.id} key={t.id}>
                            {t.trf_code}
                          </option>
                        ))} */}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>


              </div>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SampleDialog;
