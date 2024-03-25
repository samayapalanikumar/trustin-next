"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

type Data = {
  label: string;
  value: string;
}[]

type Props = {
  name: string;
  label: string;
  form: UseFormReturn;
  data: Data;
  emptyMessage?:string; 
};

const Combobox = ({ name, label, form, data, emptyMessage='Not Found', ...rest }: Props) => {

  const d1 = [...data ]as const;
  console.log("Form:", form);
  console.log("Data item:", d1);

  return (
    <Form {...form}>
    <FormField
     
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? d1.find(
                        (d) => d?.value === field.value,
                      )?.label
                    : "---Select---"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search language..." />
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {d1.map((d) => (
                    <CommandItem
                      value={d?.value}
                      key={d?.value}
                      onSelect={() => {
                        form.setValue("trf_id", d?.value ?? "");
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          d?.value === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {d?.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
    </Form>
  );
};

export default Combobox;
