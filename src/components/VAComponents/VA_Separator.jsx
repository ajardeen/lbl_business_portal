import React from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export default function VA_Separator({
  orientation = "horizontal", // "horizontal" | "vertical"
  text, // optional
  className,
}) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "",
        isVertical ? "flex-col h-full" : "",
        className
      )}
    >
      <Separator
        orientation={orientation}
        className={cn("", isVertical ? "min-h-[20px]" : "")}
      />

      {text && (
        <span
          className={cn(
            "",
            isVertical ? "py-2 rotate-90" : "px-4"
          )}
        >
          {text}
        </span>
      )}

      <Separator
        orientation={orientation}
        className={cn("", isVertical ? "min-h-[20px]" : "")}
      />
    </div>
  );
}
