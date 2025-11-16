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
  SheetClose,
} from "../ui/sheet";
import { ExternalLink } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export default function VA_Sheet({
  title = "Sheet Title",
  triggerComponent = <ExternalLink size={18} />,
  description,
  onClose,
  icon,
  side = "right",
  className = "",
  sheetContentClassName = "",
  children,
  sheetFooterComponent,
}) {
  return (
    <Sheet>
      {/* === Trigger Button === */}
      <SheetTrigger asChild>{triggerComponent}</SheetTrigger>

      {/* === Sheet Content === */}
      <SheetContent side={side} className={`gap-0 ${className}`}>
        <SheetHeader className={"border-b-accent"}>
          <SheetTitle>
            {icon && <span className="mr-2"> {icon}</span>}
            {title}
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-full max-h-[70vh]">
          <div className={`mx-2 my-0 rounded-md ${sheetContentClassName}`}>{children}</div>
        </ScrollArea>

        <SheetFooter>{sheetFooterComponent}</SheetFooter>
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
