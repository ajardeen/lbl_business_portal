"use client";

import { Textarea } from "@/components/_UItemp/textarea";

export function VA_Textarea({
  value,
  onChange,
  placeholder = "Type your message here...",
  ...props
}) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <Textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
