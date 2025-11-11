import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { InputGroup, InputGroupInput } from "../ui/input-group";

// Utility for className merge
const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function VA_InputAndSelect({
  options = [],
  selectValue,
  onSelectChange,
  searchable = false,
  selectPlaceholder = "Select option",
  inputValue,
  onInputChange,
  inputPlaceholder = "Enter text...",
  type = "text",
  disabled = false,
  className = "",
  selectClassName = "",
  inputClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === selectValue);

  return (
    <InputGroup
      role="group"
      className={cn(
        "w-full items-stretch border border-input rounded-md overflow-hidden",
        className
      )}
    >
      {/* === Left: Custom Select === */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              "min-w-25 justify-between rounded-none border-0 focus-visible:ring-0 shadow-none",
              selectClassName
            )}
          >
            {selectedOption ? selectedOption.label : selectPlaceholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
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
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onSelectChange(opt.value);
                      setOpen(false);
                    }}
                    className="flex justify-between"
                  >
                    <span>{opt.label}</span>
                    <Check
                      className={cn(
                        "h-4 w-4 text-primary transition-opacity",
                        selectValue === opt.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* === Right: Input Field === */}
      <InputGroupInput
        type={type}
        value={inputValue}
        onChange={onInputChange}
        placeholder={inputPlaceholder}
        disabled={disabled}
        className={cn("", inputClassName)}
      />
    </InputGroup>
  );
}

VA_InputAndSelect.propTypes = {
  /** Options for the Select dropdown */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ),
  /** Current select value */
  selectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Called when select value changes */
  onSelectChange: PropTypes.func.isRequired,
  /** Enables search inside dropdown */
  searchable: PropTypes.bool,
  /** Placeholder for select */
  selectPlaceholder: PropTypes.string,
  /** Input value */
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Called when input value changes */
  onInputChange: PropTypes.func.isRequired,
  /** Input placeholder */
  inputPlaceholder: PropTypes.string,
  /** Input type */
  type: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Wrapper className */
  className: PropTypes.string,
  /** Select button styling */
  selectClassName: PropTypes.string,
  /** Input styling */
  inputClassName: PropTypes.string,
};
