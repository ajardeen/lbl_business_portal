import React from "react";
import PropTypes from "prop-types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ExternalLink } from "lucide-react";

export default function VA_Sheet({
  title = "Sheet Title",
  triggerComponent = <ExternalLink size={18} />,
  description = "Add a short description here.",
  onClose,
  side = "right",
  className = "",
  children,
  sheetFooterComponent,
}) {
  return (
    <Sheet>
      {/* === Trigger Button === */}
      <SheetTrigger asChild>{triggerComponent}</SheetTrigger>

      {/* === Sheet Content === */}
      <SheetContent side={side} className={`${className}`}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        
        <SheetFooter>
          {sheetFooterComponent}

          
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

VA_Sheet.propTypes = {
  /** Text for the trigger button */
  triggerText: PropTypes.string,
  /** Sheet title text */
  title: PropTypes.string,
  /** Description under the title */
  description: PropTypes.string,
  /** Array of field objects (label, type, placeholder, etc.) */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      defaultValue: PropTypes.string,
      onChange: PropTypes.func,
      name: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  /** Function called when "Save changes" is clicked */
  onSubmit: PropTypes.func,
  /** Function called when "Close" is clicked */
  onClose: PropTypes.func,
  /** Save button text */
  saveButtonText: PropTypes.string,
  /** Close button text */
  closeButtonText: PropTypes.string,
  /** Which side the sheet slides in from */
  side: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Extra Tailwind classes */
  className: PropTypes.string,
};
