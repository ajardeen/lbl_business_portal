import { Info } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function VA_Tooltip({
  tooltipContent = "tool tip content",
  tooltipTrigger = (
    <Info size={14} className="text-muted-foreground cursor-pointer" />
  ),
}) {
  return (
    <Tooltip>
      <TooltipTrigger>{tooltipTrigger}</TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}

export default VA_Tooltip;
