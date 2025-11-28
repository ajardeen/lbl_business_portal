import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { ChevronDown, Apple } from "lucide-react";

// ✅ Vision Action Components
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";

// shadcn components (used only if VA version not available)
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

export default function NutritionCollapse({
  control,
  errors = {},
  defaultOpen = false,
  className = "",
}) {
  const nutrition = useWatch({
    control,
    name: "nutrition",
    defaultValue: { calories: 0, protein: 0, carbs: 0, fat: 0 },
  });

  const summary = `Cal ${nutrition?.calories ?? 0} kcal · P ${
    nutrition?.protein ?? 0
  } g · C ${nutrition?.carbs ?? 0} g · F ${nutrition?.fat ?? 0} g`;

  return (
    <div className={cn("w-full mt-3 ", className)}>
      <Collapsible defaultOpen={defaultOpen}>
        <div className="border rounded-md overflow-hidden">
          <CollapsibleTrigger className="w-full cursor-pointer flex items-start justify-between gap-3 p-3 hover:bg-slate-50">
            <div className="flex items-start gap-0">
              <div className="flex gap-2">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Apple className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium w-fit">Nutrition</div>
                  <div className="text-xs text-slate-500">{summary}</div>
                </div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 bg-white">
            <div className="grid grid-cols-2 gap-4">
              {/* Calories */}
              <Controller
                name="nutrition.calories"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Calories (kcal)"
                    error={errors?.nutrition?.calories?.message}
                  >
                    <VA_Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 250"
                      {...field}
                    />
                  </VA_FieldWrapper>
                )}
              />

              {/* Protein */}
              <Controller
                name="nutrition.protein"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Protein (g)"
                    error={errors?.nutrition?.protein?.message}
                  >
                    <VA_Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 12"
                      {...field}
                    />
                  </VA_FieldWrapper>
                )}
              />

              {/* Carbs */}
              <Controller
                name="nutrition.carbs"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Carbs (g)"
                    error={errors?.nutrition?.carbs?.message}
                  >
                    <VA_Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 30"
                      {...field}
                    />
                  </VA_FieldWrapper>
                )}
              />

              {/* Fat */}
              <Controller
                name="nutrition.fat"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Fat (g)"
                    error={errors?.nutrition?.fat?.message}
                  >
                    <VA_Input
                      type="number"
                      inputMode="numeric"
                      placeholder="e.g. 10"
                      {...field}
                    />
                  </VA_FieldWrapper>
                )}
              />
            </div>

          
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
