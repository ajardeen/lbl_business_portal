import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeftToLine, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Badge from "@/components/ui/Badge"; // Ensure Badge is imported without 'text' prop if not supported

import { useMenus } from "@/hooks/Master/useMenu";
import { useCreateBundle, useUpdateBundle } from "@/hooks/Master/useBundle";
import VAMenuItemSection from "./components/VAMenuItemSection";

/* =======================
   CONSTANTS
======================= */
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MEAL_TYPES = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Snacks", value: "snacks" },
  { label: "All Day", value: "all_day" },
];

/* =======================
   ZOD SCHEMA (Updated for dayIndex and bundleMealType)
======================= */

const bundleSchema = z.object({
  name: z.string().min(1, "Bundle name is required"),
  price: z.coerce.number().min(1, "Price is required"),
  // New field to define the primary meal context for the bundle
  bundleMealType: z.enum(
    MEAL_TYPES.map((t) => t.value),
    {
      required_error: "Bundle Meal Type is required",
    }
  ),
  totalMealsCount: z.coerce.number().min(1, "Total meals count is required"),

  weeklySchedule: z.array(
    z.object({
      dayIndex: z.number().min(0).max(6), // dayIndex is 0 (Monday) to 6 (Sunday)
      menuId: z.string().optional(), // Menu ID can be empty
    })
  ),
});

/* =======================
   COMPONENT
======================= */

const VA_BundleFormScreen = ({ mode = "create", initialData }) => {
  const navigate = useNavigate();
  // Ensure your useMenus returns an array of menu objects
  const { data: menus = [] } = useMenus();
  const createMutation = useCreateBundle();
  const updateMutation = useUpdateBundle();

  /* =======================
     DEFAULT VALUES SETUP (Using dayIndex)
  ======================= */
  const getInitialSchedule = () => {
    // We iterate from 0 to 6 (Monday to Sunday)
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const existing = initialData?.weeklySchedule?.find(
        (s) => s.dayIndex === dayIndex
      );
      return {
        dayIndex: dayIndex,
        menuId: existing
          ? typeof existing.menuId === "object"
            ? existing.menuId._id
            : existing.menuId
          : "",
      };
    });
  };

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      bundleMealType: initialData?.bundleMealType || MEAL_TYPES[1].value, // Default to 'lunch'
      totalMealsCount: initialData?.totalMealsCount || 30,
      weeklySchedule: getInitialSchedule(),
    },
  });

  const weeklySchedule = watch("weeklySchedule");
  const totalMealsCount = watch("totalMealsCount");
  const bundleMealType = watch("bundleMealType"); // Watch the meal type from the form

  // Helper to find the full menu object for display purposes
  const getSelectedMenu = (menuId) => {
    return menus.find((m) => m._id === menuId);
  };

  /* =======================
     HELPER: Filter Menus
  ======================= */
  const getFilteredMenuOptions = (dayName) => {
    return menus
      .filter((m) => {
        // 1. Filter by Bundle's Meal Type (Primary Context)
        if (bundleMealType && m.mealType !== bundleMealType) return false;

        // 2. Filter by Suggested Day (Smart Match)
        // Allow 'Any' or exact match to the current dayName (e.g. "Monday")
        if (
          m.suggestedDay &&
          m.suggestedDay !== "Any" &&
          m.suggestedDay !== dayName
        ) {
          return false;
        }
        return true;
      })
      .map((m) => ({
        label: m.name,
        value: m._id,
      }));
  };

  /* =======================
     SUBMIT HANDLER (Updated to send dayIndex)
  ======================= */
  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      price: data.price,
      bundleMealType: data.bundleMealType, // Send the meal type
      totalMealsCount: data.totalMealsCount,
      // Map back to dayIndex and menuId, filtering out empty entries
      schedule: data.weeklySchedule
        .map((s) => ({
          dayIndex: s.dayIndex,
          menuId: s.menuId || null,
        }))
        .filter((s) => s.menuId),
    };

    if (mode === "create") {
      console.log("payload",payload);
      
      await createMutation.mutateAsync(payload);
      // navigate("/master/bundles");
    } else {
      await updateMutation.mutateAsync({
        id: initialData._id,
        payload,
      });
      navigate("/master/bundles");
    }
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="w-full pb-4">
      {/* Back Button */}
      <VA_Button
        variant="ghost"
        icon={<ArrowLeftToLine />}
        onClick={() => navigate("/master/bundles")}
        className="mb-3"
      >
        Bundle List
      </VA_Button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-8">
          {/* LEFT PANEL: CONFIGURATION */}
          <div className="w-[300px] flex flex-col gap-5">
            <Card className="p-4 bg-white border-dashed">
              <VA_FieldWrapper
                label="Bundle Meal Type"
                description={"This type is used to filter menus below."}
                error={errors.bundleMealType?.message}
              >
                <Controller
                  name="bundleMealType"
                  control={control}
                  render={({ field }) => (
                    <VA_Select
                      {...field}
                      options={MEAL_TYPES}
                      onSelect={field.onChange}
                      placeholder="Select Type"
                    />
                  )}
                />
              </VA_FieldWrapper>
            </Card>

            <VA_FieldWrapper label="Bundle Name" error={errors.name?.message}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <VA_Input
                    {...field}
                    placeholder="e.g. Monthly Lunch Standard"
                  />
                )}
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Price" error={errors.price?.message}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <VA_Input {...field} type="number" min="0" />
                )}
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper
              label="Total Meals (Credits)"
              description={
                " Subscription ends when this many meals are served."
              }
              error={errors.totalMealsCount?.message}
            >
              <Controller
                name="totalMealsCount"
                control={control}
                render={({ field }) => (
                  <VA_Input {...field} type="number" min="1" placeholder="30" />
                )}
              />
            </VA_FieldWrapper>

            {/* SUMMARY CARD */}
            <Card className="p-4 bg-slate-50">
              <div className="font-semibold mb-2">Bundle Summary</div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Meal Type</span>
                  <Badge
                    variant="secondary"
                    className="bg-white"
                    text={bundleMealType.toUpperCase()}
                  />
                </div>
                <div className="flex justify-between">
                  <span>Pattern</span>
                  <span>7 Days</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Credits</span>
                  <Badge variant="secondary" text={totalMealsCount} />
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total Price</span>
                  <span className="font-bold text-lg">₹ {watch("price")}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT PANEL: WEEKLY PATTERN */}
          <ScrollArea className="flex-1 max-h-[700px]">
            <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-lg">
                  Weekly Schedule
                </div>
                <Badge
                  variant="outline"
                  text={` Menus filtered by: ${bundleMealType.toUpperCase()}`}
                  className="bg-white"
                />
              </div>

              {weeklySchedule.map((scheduleItem, idx) => {
                const dayName = DAYS_OF_WEEK[scheduleItem.dayIndex];
                const selectedMenu = getSelectedMenu(scheduleItem.menuId);

                return (
                  <div
                    key={scheduleItem.dayIndex}
                    className="border bg-white rounded-md p-3 shadow-sm"
                  >
                    {/* Day Label & Selector */}
                    <div className="flex gap-4 items-center">
                      <div className="w-24 flex-shrink-0">
                        <div className="font-bold text-sm text-primary">
                          {dayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Day Index {scheduleItem.dayIndex}
                        </div>
                      </div>

                      <div className="flex-1">
                        <Controller
                          name={`weeklySchedule.${idx}.menuId`}
                          control={control}
                          render={({ field }) => (
                            <VA_Select
                              {...field}
                              options={getFilteredMenuOptions(dayName)}
                              placeholder={`Select ${bundleMealType} menu for ${dayName}`}
                              onSelect={field.onChange}
                              isClearable // Allows user to remove selection
                            />
                          )}
                        />
                        {errors?.weeklySchedule?.[idx]?.menuId && (
                          <span className="text-xs text-red-500">
                            {errors.weeklySchedule[idx].menuId.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Menu Items Table */}
                    {selectedMenu && <VAMenuItemSection menu={selectedMenu} />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-3 border-t mt-4">
          <VA_Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {mode === "create" ? "Create Bundle" : "Update Bundle"}
          </VA_Button>
          <VA_Button variant="outline" onClick={() => reset()}>
            Reset
          </VA_Button>
        </div>
      </form>
    </div>
  );
};

export default VA_BundleFormScreen;
