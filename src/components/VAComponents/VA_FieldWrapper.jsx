"use client";

import React from "react";
import PropTypes from "prop-types";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "../_UItemp/field";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * VA_FieldWrapper
 * A reusable field container with label, description, error & success styling.
 */
export default function VA_FieldWrapper({
  label,
  description,
  descriptionPosition = "bottom",
  error,
  success,
  children,
  required = false,
  orientation = "vertical",
  className = "",
}) {
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError; // success only shown if no error

  return (
    <Field
      orientation={orientation}
      data-invalid={hasError}
      className={`w-full ${className}`}
    >
      {/* Label */}
      {label && (
        <FieldLabel className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </FieldLabel>
      )}
      {description && descriptionPosition === "top" && (
        <FieldDescription className="text-xs text-muted-foreground mt-0">
          {description}
        </FieldDescription>
      )}
      {/* Input container */}
      <div
        className={`relative flex items-center rounded-md overflow-hidden border bg-background transition-all
          ${
            hasError
              ? "border-red-500 focus-within:ring-red-500"
              : hasSuccess
              ? "border-green-500 focus-within:ring-green-500"
              : "border-input focus-within:ring-ring"
          }`}
      >
        <FieldContent className="flex-1">{children}</FieldContent>
      </div>

      {/* Message section */}
      {hasError ? (
        <FieldError className="flex items-center  gap-1 text-xs text-red-500 mt-0">
          <AlertCircle size={12} />
          {error}
        </FieldError>
      ) : hasSuccess ? (
        <div className="flex items-center  gap-1 text-xs text-green-600 mt-0">
          <CheckCircle2 size={12} />
          <p className="leading-3">{success}</p>
        </div>
      ) : (
        description &&
        descriptionPosition === "bottom" && (
          <FieldDescription className="text-xs text-muted-foreground mt-0">
            {description}
          </FieldDescription>
        )
      )}
    </Field>
  );
}

VA_FieldWrapper.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.string, // ✅ new success message prop
  required: PropTypes.bool,
  orientation: PropTypes.oneOf(["vertical", "horizontal", "responsive"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
