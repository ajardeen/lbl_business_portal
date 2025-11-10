"use client";

import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function VA_Calendar({
  mode = "single",
  value = null,
  onChange,
  placeholder = "Select date",
  disabled = false,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  const toDisplay = (date) => (date ? format(date, "MMM d, yyyy") : "");
  const toOutput = (date) => (date ? format(date, "dd/MM/yyyy") : "");

  // compute display text
  const displayText = useMemo(() => {
    if (!value) return placeholder;

    if (mode === "single") {
      return value ? toDisplay(new Date(value.split("/").reverse().join("-"))) : placeholder;
    }

    const from = value?.from;
    const to = value?.to;

    if (from && to)
      return `${toDisplay(new Date(from.split("/").reverse().join("-")))} → ${toDisplay(
        new Date(to.split("/").reverse().join("-"))
      )}`;
    if (from && !to)
      return `${toDisplay(new Date(from.split("/").reverse().join("-")))} →`;
    if (!from && to)
      return `→ ${toDisplay(new Date(to.split("/").reverse().join("-")))}`;
    return placeholder;
  }, [value, mode, placeholder]);

  // handle date selection
  const handleSelect = (val) => {
    if (typeof onChange !== "function") return;

    if (mode === "single") {
      onChange(toOutput(val));
      setOpen(false); // ✅ close popover after selecting single date
    } else if (val && typeof val === "object") {
      onChange({
        from: toOutput(val.from),
        to: toOutput(val.to),
      });

      // ✅ Close popover when both dates (from & to) are selected
    //   if (val?.from && val?.to) setOpen(false);
    } else {
      onChange(null);
    }
  };

  // convert stored value (string) to Date for calendar display
  const selectedValue =
    mode === "single"
      ? value
        ? new Date(value.split("/").reverse().join("-"))
        : undefined
      : {
          from: value?.from
            ? new Date(value.from.split("/").reverse().join("-"))
            : undefined,
          to: value?.to
            ? new Date(value.to.split("/").reverse().join("-"))
            : undefined,
        };

  return (
    <div className={cn("w-full", className)}>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            onClick={() => setOpen((prev) => !prev)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className={cn(!value ? "text-muted-foreground" : "")}>
                {displayText}
              </span>
            </span>
            <ChevronDown className="ml-2 h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={8} className="w-auto p-0">
          <div className="p-3">
            {mode === "single" ? (
              <Calendar mode="single" selected={selectedValue} onSelect={handleSelect} />
            ) : (
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={selectedValue}
                onSelect={handleSelect}
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

VA_Calendar.propTypes = {
  mode: PropTypes.oneOf(["single", "range"]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
