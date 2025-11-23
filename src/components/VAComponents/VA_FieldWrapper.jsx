import React from "react";
import PropTypes from "prop-types";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "../ui/field";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * VA_FieldWrapper
 * A reusable field container with label, description, error & success styling.
 */
export default function VA_FieldWrapper({
  label,
  description,
  descriptionPosition = "bottom",
  error,
  toolTipText,
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
      className={`w-full gap-2 ${className}`}
    >
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between">
          <FieldLabel className="text-sm gap-1 font-medium text-muted-foreground">
            {label}
            {required && <span className="text-red-500 ml-0">*</span>}
             {toolTipText && (
            <Tooltip>
              <TooltipTrigger>
                <Info size={14} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>{toolTipText}</TooltipContent>
            </Tooltip>
          )}
          </FieldLabel>
         
        </div>
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
  toolTipText: PropTypes.string,
  success: PropTypes.string, // ✅ new success message prop
  required: PropTypes.bool,
  orientation: PropTypes.oneOf(["vertical", "horizontal", "responsive"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
