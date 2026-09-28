import React from "react";
import { FormError } from "./FormError";

interface FormFieldProps{
    label: string
    errorMessage?: string
    children: React.ReactNode 
}

export const FormField = ({
  label,
  errorMessage,
  children,
}:FormFieldProps) => {
 
  return (
    <div className="relative w-full">
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>

      {children}

      {errorMessage && <FormError message={errorMessage} />}
    </div>
  );
};
