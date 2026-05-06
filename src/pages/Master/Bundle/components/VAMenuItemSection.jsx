import React from "react";
import { Controller, useFormState } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Removed VA_Input import since quantity is now read-only
import { Info } from "lucide-react";
import Badge from "@/components/ui/Badge";
// Note: control and menuIndex are no longer strictly needed but kept for context if you expand form logic later
const VAMenuItemSection = ({ menu }) => {
  // console.log("menu", menu);

  // Use optional chaining for safe access
  const items = menu?.items;
  if (!items || items.length === 0) return null;

  // Calculate total price based on the structure provided in the prompt
  const totalMenuPrice = items.reduce((total, item) => {
    // Assuming item.itemPrice or item.itemId.price are not directly available
    // in the current shape and using 0 for price calculation for now.
    // If a price field is available on the item object in production, replace 0.
    const price = item.price || item.itemPrice || 0;
    const qty = item.qty || 1;
    return total + price * qty;
  }, 0);

  return (
    <div className="mt-3">
       
      {/* Header with tooltip */}
      <div className="text-sm font-semibold mb-2 flex items-center gap-2">
        Menu Items
        <Tooltip>
          <TooltipTrigger>
            <Info size={14} className="text-muted-foreground cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            Total Menu Items: {items.length}
            {/* If you have price on item, display it */}
            {totalMenuPrice > 0 &&
              ` | Total Menu Price: ₹ ${totalMenuPrice.toFixed(2)}`}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* TABLE */}
      <table className="w-full text-xs border-t border-border">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="text-left py-1 px-2 font-medium">Item Name</th>
            <th className="text-left py-1 px-2 font-medium">Qty</th>
            <th className="text-left py-1 px-2 font-medium">Veg/Non-Veg</th>
            <th className="text-left py-1 px-2 font-medium">Price (₹)</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, itemIdx) => {
            // Safely get item details from the nested structure
            const itemName =
              item.itemName || item.name || item.itemId?.name || "Unnamed";
            const isVegetarian = item.isVegetarian;
            const price =
              item.price || item.itemPrice || item.itemId?.price || "--";

            return (
              <tr
                key={itemIdx}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                {/* Item name */}
                <td className="py-1.5 px-2 font-medium text-foreground capitalize">
                  {itemName}
                </td>

                {/* Fixed Qty */}
                <td className="py-1.5 px-2 text-muted-foreground">
                  {item.qty || 1}
                </td>

                {/* Veg/Non-Veg */}
                <td className="py-1.5 px-2">
                  <Badge
                    variant={isVegetarian ? "success" : "destructive"}
                    text={isVegetarian ? "Veg" : "Non-Veg"}
                    className={`text-xs ${isVegetarian ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  />
                </td>

                {/* Price (Read-only) */}
                <td className="py-1.5 px-2 text-muted-foreground">
                  {item.itemId.pricing[0].value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VAMenuItemSection;
