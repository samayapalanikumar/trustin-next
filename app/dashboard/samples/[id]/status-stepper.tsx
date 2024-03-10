"use client";
import React from "react";
import { useStepper } from "headless-stepper";

const StatusStepper = () => {
  const steps = React.useMemo(
    () => [
      {
        label: "Step 1"
      },
      { label: "Step 2" },
      { label: "Step 3" },
      { label: "Step 4" },
      { label: "Step 5" },
      { label: "Step 6" }
    ],
    []
  );
  // useStepper
  const { state, stepperProps, stepsProps, progressProps } = useStepper({
    steps
  });

  const barSize = React.useMemo(
    () => Math.ceil((state.currentStep / (steps?.length - 1)) * 100),
    [state, steps]
  );

  return (
    <>
      <div className="my-4 w-100 grid grid-cols-6 relative" {...stepperProps}>
        <ol className="col-span-full flex flex-row z-1">
          {stepsProps?.map((step, index) => (
            <li className="text-center flex-[1_0_auto]" key={index}>
              <a
                className="group flex flex-col items-center cursor-pointer focus:outline-0"
                {...step}
              >
                <span
                  className={`flex items-center justify-center bg-white text-black w-8 h-8 border border-full rounded-full group-focus:ring-2 group-focus:ring-offset-2 transition-colors ease-in-out ${
                    state?.currentStep === index
                      ? "bg-sky-500 text-white ring-2 ring-offset-2"
                      : ""
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`${
                    state?.currentStep === index ? "font-bold" : ""
                  }`}
                >
                  {steps[index].label}
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div
          style={{ gridColumn: "2 / 8" }}
          className="flex items-center flex-row top-4 right-16 relative border-0.5 bg-gray-300 z-[-1] pointer-events-none row-span-full w-full h-0.5"
          {...progressProps}
        >
          <span className="h-full w=full flex" />
          <div
            style={{
              width: `${barSize}%`,
              gridColumn: 1 / -1,
              gridRow: 1 / -1
            }}
            className="flex flex-row h-full overflow-hidden border-solid border-0 bg-sky-500"
          />
        </div>
      </div>

    </>
  );
};

export default StatusStepper;
