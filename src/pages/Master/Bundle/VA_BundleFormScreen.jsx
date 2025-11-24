// DEDICATED SCREEN VERSION BELOW
// Updated full code with all required field validation and error display

"use client";
import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Edit, PlusCircle, AlertTriangle } from "lucide-react";
import { useMenus } from "@/hooks/Master/useMenu";
import { useCreateBundle, useUpdateBundle } from "@/hooks/Master/useBundle";
import VAMenuItemSection from "@/pages/Master/Bundle/components/VAMenuItemSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const itemSchema = z.object({
  itemId: z.string().min(1),
  qty: z.coerce.number().min(1, "Qty is required"),
});

const menuSchema = z.object({
  menuId: z.string().min(1, "Menu selection is required"),
  dayIndex: z.number().default(0),
  items: z.array(itemSchema).min(1),
});

const bundleSchema = z.object({
  name: z.string().min(1, "Bundle name is required"),
  description: z.string().min(1, "Description is required"),
  bundleType: z.enum(["weekly", "fixed"], {
    required_error: "Bundle type is required",
  }),
  durationDays: z.coerce.number().min(1, "Duration is required"),
  basePrice: z.coerce.number().min(1, "Base price is required"),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
  menus: z.array(menuSchema).min(1, "At least one menu is required"),
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const VA_BundleFormScreen = ({ mode = "create", initialData }) => {
  const { data: menus = [] } = useMenus();
  const createMutation = useCreateBundle();
  const updateMutation = useUpdateBundle();
  const [selectedMenus, setSelectedMenus] = useState({});

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      bundleType: initialData?.bundleType || "weekly",
      durationDays: initialData?.durationDays || 7,
      basePrice: initialData?.basePrice || 0,
      status: initialData?.status || "active",
      menus: [],
    },
  });

  const bundleType = watch("bundleType");
  const fixedDays = watch("durationDays");

  const handleMenuSelect = (index, menuId) => {
    const selectedMenu = menus.find((m) => m._id === menuId);
    if (!selectedMenu) return;

    const mappedItems = selectedMenu.items.map((i) => ({
      itemId: i.itemId._id,
      qty: i.qty || 1,
    }));

    setValue(`menus.${index}`, {
      dayIndex: bundleType === "weekly" ? index : 0,
      menuId,
      items: mappedItems,
    });

    setSelectedMenus((prev) => ({
      ...prev,
      [index]: { ...selectedMenu, mappedItems },
    }));
  };

  const onSubmit = async (data) => {
    console.log("data", data);

    const payload = {
      ...data,
      menus: data.menus.map((m, idx) => ({
        dayIndex: bundleType === "weekly" ? idx : 0,
        menuId: m.menuId,
        items: m.items,
      })),
    };

    if (mode === "create") await createMutation.mutateAsync(payload);
    else await updateMutation.mutateAsync({ id: initialData._id, payload });
  };

  const renderWeeklyFields = useMemo(() => {
    const availableDays = [];
    const missingDays = [];

    daysOfWeek.forEach((day) => {
      const exists = menus.some((m) => m.dayOfWeek === day);
      if (exists) availableDays.push(day);
      else missingDays.push(day);
    });

    return (
      <>
        {errors.menus?.message && (
          <div className="text-red-600 text-sm mb-2">
            {errors.menus.message}
          </div>
        )}

        {missingDays.length > 0 && (
          <div className="flex items-center gap-2  border border-destructive p-2 rounded-md mb-2  text-sm">
            <AlertTriangle size={16} className="text-destructive" />
            <span>
              Missing days: <strong>{missingDays.join(", ")}</strong>
            </span>
          </div>
        )}

        <div className="w-full gap-3 border rounded-md">
          {availableDays.map((day, idx) => {
            const dayMenus = menus.filter((m) => m.dayOfWeek === day);
            const options = dayMenus.map((m) => ({
              label: m.name,
              value: m._id,
            }));
            const selectedMenu = selectedMenus[idx];

            return (
              <div key={day} className=" rounded-lg p-3 gap-5">
                <div className="max-w-50 mb-3">
                  <div className="font-semibold mb-2">{day}</div>

                  <VA_FieldWrapper
                    // label="Select Menu"
                    error={errors?.menus?.[idx]?.menuId?.message}
                  >
                    <Controller
                      name={`menus.${idx}.menuId`}
                      control={control}
                      render={({ field }) => (
                        <VA_Select
                          {...field}
                          options={options}
                          placeholder="Select menu"
                          onSelect={(val) => handleMenuSelect(idx, val)}
                        />
                      )}
                    />
                  </VA_FieldWrapper>
                </div>

                {selectedMenu && (
                  <VAMenuItemSection
                    control={control}
                    menuIndex={idx}
                    menu={selectedMenu}
                  />
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }, [menus, control, selectedMenus, errors]);

  const fixedMenuOptions = useMemo(
    () => menus.map((m) => ({ label: m.name, value: m._id })),
    [menus]
  );

  const renderFixedFields = useMemo(() => {
    const dayArray = Array.from({ length: fixedDays || 1 }, (_, i) => i + 1);

    return (
      <div className="space-y-3 ">
        <VA_FieldWrapper
          label="Number of Days"
          error={errors.durationDays?.message}
        >
          <Controller
            name="durationDays"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                options={Array.from({ length: 7 }, (_, i) => ({
                  label: `${i + 1} Day(s)`,
                  value: i + 1,
                }))}
                placeholder="Select number of days"
                onSelect={(val) => field.onChange(val)}
              />
            )}
          />
        </VA_FieldWrapper>

        <div className="grid grid-cols-3 gap-3">
          {dayArray.map((dayIdx) => {
            const selectedMenu = selectedMenus[dayIdx - 1];
            return (
              <div key={dayIdx} className="border rounded-lg p-3">
                <div className="font-semibold mb-2">Day {dayIdx}</div>

                <VA_FieldWrapper
                  // label="Select Menu"
                  error={errors?.menus?.[dayIdx - 1]?.menuId?.message}
                >
                  <Controller
                    name={`menus.${dayIdx - 1}.menuId`}
                    control={control}
                    render={({ field }) => (
                      <VA_Select
                        {...field}
                        options={fixedMenuOptions}
                        placeholder="Select menu"
                        onSelect={(val) => handleMenuSelect(dayIdx - 1, val)}
                      />
                    )}
                  />
                </VA_FieldWrapper>

                {selectedMenu && (
                  <VAMenuItemSection
                    control={control}
                    menuIndex={dayIdx - 1}
                    menu={selectedMenu}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [fixedDays, selectedMenus, menus, errors]);

  return (
    <div className="w-full pb-0">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        {/* MAIN LAYOUT */}
        <div className="flex gap-8">
          {/* LEFT PANEL */}
          <div className="w-[280px] flex flex-col gap-4">
            <VA_FieldWrapper label="Bundle Name" error={errors.name?.message}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <VA_Input {...field} placeholder="Name" />
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
                  <VA_Input {...field} placeholder="Description" />
                )}
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper
              label="Bundle Type"
              error={errors.bundleType?.message}
            >
              <Controller
                name="bundleType"
                control={control}
                render={({ field }) => (
                  <VA_Select
                    {...field}
                    options={[
                      { label: "Weekly Recurring", value: "weekly" },
                      { label: "Fixed Menu", value: "fixed" },
                    ]}
                    onSelect={(val) => field.onChange(val)}
                  />
                )}
              />
            </VA_FieldWrapper>
          </div>
          <ScrollArea className={"max-h-[600px] flex-1"}>
            {/* RIGHT PANEL */}
            <div className="flex-1 flex flex-col gap-4 ">
              {/* Days / Menu Selection */}
              <div className="bg-muted/40 p-4 rounded-lg border">
                {bundleType === "weekly"
                  ? renderWeeklyFields
                  : renderFixedFields}
              </div>

              {/* Price + Status Row */}
              <div className="grid grid-cols-1 gap-4 max-w-40">
                <VA_FieldWrapper
                  label="Base Price"
                  error={errors.basePrice?.message}
                >
                  <Controller
                    name="basePrice"
                    control={control}
                    render={({ field }) => (
                      <VA_Input {...field} type="number" />
                    )}
                  />
                </VA_FieldWrapper>

                <VA_FieldWrapper label="Status" error={errors.status?.message}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <VA_Select
                        {...field}
                        options={[
                          { label: "Active", value: "active" },
                          { label: "Inactive", value: "inactive" },
                        ]}
                        onSelect={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </VA_FieldWrapper>
              </div>
              {/* Summary */}
              <div className="justify-end flex bg-accent">
                <Card className="p-4 ">
                  <div className="font-semibold mb-2">Bundle Summary</div>
                  <div className="text-sm">
                    Total Menus: {watch("menus")?.length || 0}
                  </div>

                  <div className="text-sm">
                    Total Price: ₹ {watch("basePrice") || 0}
                  </div>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* FOOTER BUTTONS */}
        <div className=" sticky bottom-0 bg-background flex justify-end gap-3 py-3 border-t ">
          <VA_Button type="submit" loading={createMutation.isPending}>
            {mode === "create" ? "Create Bundle" : "Update"}
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
