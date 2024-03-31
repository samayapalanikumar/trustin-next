import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getErrorMessage = (error:string|string[]|Object) => {
  if (typeof error === "string") return error;
  if (Array.isArray(error)) return error.join(", ");
  if (typeof error === "object") {
    // TODO: Need Imporement Here
    console.log(error);
    return "Something Went Wrong, Check field again.";
  }
};