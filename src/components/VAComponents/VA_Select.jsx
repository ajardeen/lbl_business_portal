import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../_UItemp/button";
import { Popover, PopoverTrigger, PopoverContent } from "../_UItemp/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "../_UItemp/command";
import { Check, ChevronsUpDown } from "lucide-react";

// Small helper to merge classNames (since Vite setup doesn't use cn() from ShadCN)
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function VA_Select({
  options = [],
  value,
  onSelect,
  placeholder = "Select option",
  searchable = false,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className="w-full justify-between"
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        {/* ✅ Full-width fix (works in Vite too) */}
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0"
          sideOffset={4}
        >
          <Command>
            {searchable && (
              <CommandInput placeholder="Search..." className="h-9" />
            )}

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onSelect(opt.value);
                      setOpen(false);
                    }}
                    className="flex justify-between"
                  >
                    <span>{opt.label}</span>

                    {/* ✅ Checkmark on RIGHT SIDE */}
                    <Check
                      className={cn(
                        "h-4 w-4 text-primary transition-opacity",
                        value === opt.value ? "opacity-100" : "opacity-0"
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
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
};
