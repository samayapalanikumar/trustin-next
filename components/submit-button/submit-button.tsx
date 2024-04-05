"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  name = "Submit",
  loading = "Loading...",
  width="w-full"
}: {
  name?: string;
  loading?: React.ReactNode | string;
  width?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${width} cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:bg-slate-500`}
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? loading : name}
    </button>
  );
};

export default SubmitButton;
