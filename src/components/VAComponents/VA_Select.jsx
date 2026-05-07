import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import Badge from "../ui/Badge";

// Helper for merging classNames
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function VA_Select({
  options = [],
  value,
  onSelect,
  placeholder = "Select option",
  searchable = false,
  disabled = false,
  multiSelect = false,
  variant = "default",
}) {
  const [open, setOpen] = useState(false);

  const values = multiSelect ? value || [] : [value];

  const handleSelect = (val) => {
    if (multiSelect) {
      const newValues = values.includes(val)
        ? values.filter((v) => v !== val)
        : [...values, val];
    onSelect(newValues);
    } else {
      onSelect(val);
      setOpen(false);
    }
  };

  const selectedLabels = options
    .filter((opt) => values.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="w-full space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {variant === "badge" ? (
            <Button
              variant="outline"
              role="combobox"
              disabled={disabled}
              className="w-full justify-between h-fit"
            >
              <div className="flex flex-wrap gap-1 ">
                {selectedLabels.length > 0 &&
                  selectedLabels.map((label, index) => (
                  <Badge text={label} />
                )) || (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          ) : (
            <Button
              variant="outline"
              role="combobox"
              disabled={disabled}
              className="w-full justify-between"
            >
              {selectedLabels && selectedLabels.length > 0? (
                <span className="truncate">{selectedLabels}</span>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          )}
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0"
          sideOffset={4}
        >
          <Command>
            {searchable && (
              <CommandInput placeholder="Search..." className="h-9" />
            )}
            <CommandList className="max-h-64 overflow-y-auto">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.label} // ✅ important: let ShadCN internal matcher work
                    onSelect={() => handleSelect(opt.value)}
                    className="flex justify-between capitalize"
                  >
                    <span>{opt.label}</span>
                    <Check
                      className={cn(
                        "h-4 w-4 text-primary transition-opacity",
                        values.includes(opt.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

VA_Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  multiSelect: PropTypes.bool,
};
