"use client";
import { Stepper, Step } from "react-form-stepper";

const StatusStepper = ({ step }: { step: number }) => {
  return (
    <Stepper activeStep={step - 1}>
      <Step label="Draft" />
      <Step label="Review Pending" />
      <Step label="Requested" />
      <Step label="Received" />
      <Step label="Under Testing" />
      <Step label="Verification Pending" />
      <Step label="Done" />
    </Stepper>
  );
};

export default StatusStepper;
