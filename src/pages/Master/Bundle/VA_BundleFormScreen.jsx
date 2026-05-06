import React, { useMemo } from "react"; // Removed useState as it wasn't used
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeftToLine } from "lucide-react"; // Removed Filter as it wasn't used
import { useNavigate } from "react-router-dom";

import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import Badge from "@/components/ui/Badge"; 

import { useMenus } from "@/hooks/Master/useMenu";
import { useCreateBundle, useUpdateBundle } from "@/hooks/Master/useBundle";
import VAMenuItemSection from "./components/VAMenuItemSection";
import VA_TextArea from "@/components/VAComponents/VA_TextArea";
import  VA_InputFile  from "@/components/VAComponents/VA_InputFile";

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
   ZOD SCHEMA
======================= */

const bundleSchema = z.object({
  name: z.string().min(1, "Bundle name is required"),
  img: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size > 0, "Image is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(1, "Price is required"),
  bundleMealType: z.enum(
    MEAL_TYPES.map((t) => t.value),
    {
      required_error: "Bundle Meal Type is required",
    }
  ),
  totalMealsCount: z.coerce.number().min(1, "Total meals count is required"),

  weeklySchedule: z.array(
    z.object({
      dayIndex: z.number().min(0).max(6),
      menuId: z.string().optional(),
    })
  ),
});

/* =======================
   COMPONENT
======================= */

const VA_BundleFormScreen = ({ mode = "create", initialData }) => {
  const navigate = useNavigate();
  const { data: menus = [] } = useMenus();
  const createMutation = useCreateBundle();
  const updateMutation = useUpdateBundle();

  /* =======================
     DEFAULT VALUES SETUP
  ======================= */
  const getInitialSchedule = () => {
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
setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: initialData?.name || "",
      img: initialData?.img || null,
      description: initialData?.description || "",
      price: initialData?.price || 0,
      bundleMealType: initialData?.bundleMealType || MEAL_TYPES[1].value, 
      totalMealsCount: initialData?.totalMealsCount || 30,
      weeklySchedule: getInitialSchedule(),
    },
  });

  const weeklySchedule = watch("weeklySchedule");
  const totalMealsCount = watch("totalMealsCount");
  const bundleMealType = watch("bundleMealType");

  // Helper to find the full menu object for display purposes
  const getSelectedMenu = (menuId) => {
    return menus.find((m) => m._id === menuId);
  };

  /* =======================
     HELPER: Calculate Menu Item Price Total (FIXED)
  ======================= */
  const calculateMenuItemPriceTotal = (selectedMenu) => {
    // Check the 'items' array, based on the provided object structure.
    if (!selectedMenu || !selectedMenu.items) {
      return 0;
    }

    // Iterate over the 'items' array and access price via 'itemId.price'.
    const total = selectedMenu.items.reduce((sum, item) => {
      const itemPrice = item.itemId?.price || 0;
      const quantity = item.qty || 1; // Use item quantity, default to 1
      
      return sum + (itemPrice * quantity);
    }, 0);

    return total;
  };

  /* =======================
     CALCULATION: Total Calculated Price (Weekly Schedule Cost)
  ======================= */
  const totalCalculatedBundlePrice = useMemo(() => {
    const selectedMenuIds = weeklySchedule
      .map(s => s.menuId)
      .filter(Boolean);
    
    // Use a Set to calculate the cost of unique menus only
    const uniqueMenuIds = Array.from(new Set(selectedMenuIds));
    
    let totalCost = 0;
    
    uniqueMenuIds.forEach(menuId => {
        const menu = getSelectedMenu(menuId);
        if (menu) {
            totalCost += calculateMenuItemPriceTotal(menu);
        }
    });

    return totalCost;

  }, [weeklySchedule, menus]); 


  /* =======================
     HELPER: Filter Menus
  ======================= */
  const getFilteredMenuOptions = (dayName) => {
    return menus
      .filter((m) => {
        // 1. Filter by Bundle's Meal Type (Primary Context)
        if (bundleMealType && m.mealType !== bundleMealType) return false;

        // 2. Filter by Suggested Day (Smart Match)
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
     SUBMIT HANDLER
  ======================= */
const onSubmit = async (data) => {
  const formData = new FormData();

  // Append simple fields
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("price", data.price);
  formData.append("bundleMealType", data.bundleMealType);
  formData.append("totalMealsCount", data.totalMealsCount);

  // 1. Handle the Image File
  // data.img is usually a FileList from react-hook-form; take the first file
  const imageFile = data.img?.[0] || data.img; 
  if (imageFile) {
    formData.append("img", imageFile);
  }

  // 2. Handle the Schedule (Arrays must be stringified for FormData)
  const schedule = data.weeklySchedule
    .map((s) => ({
      dayIndex: s.dayIndex,
      menuId: s.menuId || null,
    }))
    .filter((s) => s.menuId);
  
  formData.append("schedule", JSON.stringify(schedule));


  if (mode === "create") {
    await createMutation.mutateAsync(formData);
    navigate("/master/bundles");
  } else {
    await updateMutation.mutateAsync({
      id: initialData._id,
      payload: formData,
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
            <Card className="p-4  border-dashed">
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
            <VA_FieldWrapper label="Bundle Image" error={errors.img?.message}>
  <Controller
    name="img"
    control={control}
    render={({ field: { onChange, value, ref } }) => (
      <VA_InputFile
        ref={ref}            // Connect the ref for RHF focus management
        value={value}        // Pass value so the "reset" useEffect triggers
        onChange={onChange}  // Pass the File object back to RHF
        showPreview={true}
      />
    )}
  />
</VA_FieldWrapper>
            <VA_FieldWrapper
              label="Description"
              error={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <VA_TextArea
                    {...field}
                    placeholder="A short description for the bundle."
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

            {/* SUMMARY CARD (UPDATED with calculated price) */}
            <Card className="p-4 ">
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

                {/* CALCULATED COST */}
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold text-green-700">Calculated Cost (Unique Menus)</span>
                  <span className="font-bold text-md text-green-700">
                    ₹ {totalCalculatedBundlePrice.toFixed(2)} 
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold">Bundle Price (Manual)</span>
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
                
                // Calculate the price for the current day's selected menu
                const menuPriceTotal = calculateMenuItemPriceTotal(selectedMenu);

                return (
                  <div
                    key={scheduleItem.dayIndex}
                    className="border  rounded-md p-3 shadow-sm"
                  >
                    {/* Day Label & Selector */}
                    <div className="flex gap-4 items-center">
                      <div className="flex gap-2 flex-grow">

                      <div className="w-24 flex-shrink-0">
                        <div className="font-bold text-sm text-primary">
                          {dayName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Day Index {scheduleItem.dayIndex}
                        </div>
                      </div>

                      <div className="">
                        <Controller
                          name={`weeklySchedule.${idx}.menuId`}
                          control={control}
                          
                          render={({ field }) => (
                            <VA_Select
                              {...field}
                              options={getFilteredMenuOptions(dayName)}
                              placeholder={`Select ${bundleMealType} menu`}
                              onSelect={(value) => {
                                  // 1. Set the individual field value
                                  field.onChange(value); 

                                   // 2. IMPORTANT: Force RHF and React to recognize the change 
                                   // by setting the entire array again with the existing data.
                                   // This creates a new array reference, triggering the useMemo.
                                   const updatedSchedule = [...weeklySchedule];
                                   updatedSchedule[idx] = { 
                                       ...updatedSchedule[idx], 
                                       menuId: value 
                                   };
                                   setValue("weeklySchedule", updatedSchedule);
                              }}
                             
                              isClearable
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
                      
                      {/* Menu Price Total Display */}
                      <div className="w-40 text-right flex-shrink-0">
                        <div className="text-xs text-muted-foreground">
                          Menu Item Total:
                        </div>
                        <div className="font-bold text-base text-primary">
                          ₹ {menuPriceTotal.toFixed(2)}
                        </div>
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