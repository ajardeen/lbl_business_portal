import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Reusable Shadcn Switch Component
 *
 * Props:
 * - id: string (unique id for label association)
 * - label: string (optional label text)
 * - checked: boolean (controlled state)
 * - onCheckedChange: function (toggle handler)
 * - disabled: boolean
 * - className: string (optional for wrapper)
 */
const VA_Switch = ({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-muted-foreground">
          {label}
        </Label>
      )}
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

export default VA_Switch;
