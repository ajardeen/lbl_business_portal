import React from "react";
import { Controller, useFormState } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VA_Input from "@/components/VAComponents/VA_Input";
import { Info } from "lucide-react";

const VAMenuItemSection = ({ control, menuIndex, menu }) => {
  if (!menu || !menu.items || menu.items.length === 0) return null;

  const { errors } = useFormState({ control });
  const totalMenuPrice = menu.items.reduce(
    (total, item) =>
      total + ((item.itemPrice || item.price || 0) * (item.qty || 1)),
    0
  );

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
            Total Menu Cost ₹ {totalMenuPrice}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* TABLE */}
      <table className="w-full text-xs border-t border-border">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="text-left py-1 px-2 font-medium">Item Name</th>
            <th className="text-left py-1 px-2 font-medium">Qty</th>
            <th className="text-left py-1 px-2 font-medium">Price (₹)</th>
            <th className="text-left py-1 px-2 font-medium">UOM</th>
            <th className="text-left py-1 px-2 font-medium">Prep Time (min)</th>
          </tr>
        </thead>

        <tbody>
          {menu.items.map((item, itemIdx) => {
            const qtyError =
              errors?.menus?.[menuIndex]?.items?.[itemIdx]?.qty?.message;

            return (
              <tr
                key={itemIdx}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                {/* Item name */}
                <td className="py-1.5 px-2 font-medium text-foreground capitalize">
                  {item.itemName || item.name || "Unnamed"}
                </td>

                {/* Editable Qty */}
                <td className="py-1.5 px-2 w-24">
                  <Controller
                    name={`menus.${menuIndex}.items.${itemIdx}.qty`}
                    control={control}
                    defaultValue={item.qty || 1}
                    render={({ field }) => (
                      <VA_Input
                        {...field}
                        type="number"
                        min={1}
                        className="h-7"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  {qtyError && (
                    <div className="text-red-600 text-xs mt-1">{qtyError}</div>
                  )}
                </td>

                {/* Price */}
                <td className="py-1.5 px-2 text-muted-foreground">
                  ₹{item.itemPrice || item.price || "--"}
                </td>

                {/* UOM */}
                <td className="py-1.5 px-2 text-muted-foreground">
                  {item.uom || "—"}
                </td>

                {/* Prep Time */}
                <td className="py-1.5 px-2 text-muted-foreground">
                  {item.prepTimeMinutes || item.prepTime || 0}
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
