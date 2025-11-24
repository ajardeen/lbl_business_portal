import React from "react";
import { Controller, useFormState } from "react-hook-form";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const VAMenuItemSection = ({ control, menuIndex, menu }) => {
  console.log(menu);

  if (!menu || !menu.items || menu.items.length === 0) return null;

  const { errors } = useFormState({ control });
  const totalMenuPrice = menu.items.reduce((total, item) => {
    return total + (item.itemPrice || 0) * (item.qty || 1);
  }, 0);

  return (
    <div className=" border-t pt-3 rounded-md bg-background p-3 w-full">
      <div className="text-sm font-semibold mb-2 flex items-center  gap-2">
        Menu Items
        <Tooltip>
          <TooltipTrigger>
            <Info size={14} className="text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Total Menu Cost{` ₹ ${totalMenuPrice}`}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-3 grid grid-cols-5 gap-3">
        {menu.items.map((item, itemIdx) => {
          const qtyError =
            errors?.menus?.[menuIndex]?.items?.[itemIdx]?.qty?.message;

          return (
            <div key={itemIdx} className=" pb-2 ">
              <div className="font-medium capitalize mb-1 gap-3 flex justify-between">
                {item.itemName}
              </div>

              <VA_FieldWrapper label="Qty" error={qtyError}>
                <Controller
                  name={`menus.${menuIndex}.items.${itemIdx}.qty`}
                  control={control}
                  defaultValue={item.qty || 1}
                  render={({ field }) => (
                    <VA_Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </VA_FieldWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VAMenuItemSection;
