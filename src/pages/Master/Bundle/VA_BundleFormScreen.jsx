import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { useMenus } from "@/hooks/Master/useMenu";
import { useCreateBundle, useUpdateBundle } from "@/hooks/Master/useBundle";
import VAMenuItemSection from "@/pages/Master/Bundle/components/VAMenuItemSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { ArrowLeftToLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const itemSchema = z.object({
  itemId: z.string().min(1),
  qty: z.coerce.number().min(1, "Qty is required"),
});

const menuSchema = z.object({
  menuId: z
    .string()
    .min(1, "Menu selection is required")
    .optional()
    .refine((val) => val && val.length > 0, {
      message: "Menu selection is required",
    }),

  dayIndex: z.number().default(0),
  items: z.array(itemSchema).min(1).optional(),
});

const bundleSchema = z.object({
  name: z.string().min(1, "Bundle name is required"),
  description: z.string().min(1, "Description is required"),
  bundleType: z.enum(["weekly", "fixed"]),
  durationDays: z.coerce.number().min(1, "Duration is required"),
  repeatWeeks: z.coerce.number().min(1, "Repeat weeks is required").optional(),
  basePrice: z.coerce.number().min(1, "Base price is required"),
  status: z.enum(["active", "inactive"]),
  menus: z.array(menuSchema).nonempty("At least one menu is required"),
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
  const navigate = useNavigate();
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
      repeatWeeks: initialData?.repeatWeeks || 1,
      basePrice: initialData?.basePrice || 0,
      status: initialData?.status || "active",
      menus: [],
    },
  });
  const menusValues = watch("menus");

  useEffect(() => {
    console.log("menusValues", menusValues);
  }, [menusValues]);

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
    if (data.bundleType === "weekly" && !data.repeatWeeks) {
      return alert("Repeat weeks is required for weekly bundle");
    }

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

useEffect(() => {
  // reset selected menu UI reference
  setSelectedMenus({});

  // reset menus array to empty fresh values
  const newMenus = Array.from({ length: fixedDays }, () => ({
    menuId: "",
    dayIndex: 0,
    items: [],
  }));

  setValue("menus", newMenus, { shouldValidate: true }); // 🔥 instantly validate menus on change
}, [fixedDays, setValue]);
useEffect(() => {
  if (bundleType === "fixed") {
    setValue("repeatWeeks", 1);
  }
  setSelectedMenus({});
  setValue("menus", [], { shouldValidate: true });
}, [bundleType]);



  const renderWeeklyFields = useMemo(() => {
    const count = fixedDays || 7;
    const allowedDays = daysOfWeek.slice(0, count);

    return (
      <>
        {errors.menus?.message && (
          <div className="text-red-600 text-sm mb-2">
            {errors.menus.message}
          </div>
        )}

        <div className="w-full gap-3 border rounded-md">
          {allowedDays.map((day, idx) => {
            const dayMenus = menus.filter((m) => m.dayOfWeek === day);
            const options = dayMenus.map((m) => ({
              label: m.name,
              value: m._id,
            }));
            console.log("idx", idx);

            const selectedMenu = selectedMenus[idx];

            return (
              <div key={day} className="rounded-lg p-3 gap-5">
                <div className="max-w-50 mb-3">
                  <div className="font-semibold mb-2">{day}</div>

                  <VA_FieldWrapper
                    error={errors?.menus?.[idx]?.menuId?.message}
                  >
                    <Controller
                      name={`menus.${idx}.menuId`}
                      control={control}
                      render={({ field }) => (
                        <VA_Select
                          {...field}
                          value={field.value ?? ""}
                          options={options}
                          placeholder="Select menu"
                          onSelect={(val) => {
                            field.onChange(val); // 🔥 triggers validation for menuId
                            handleMenuSelect(idx, val);
                          }}
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
  }, [menus, selectedMenus, fixedDays, errors]);

  const fixedMenuOptions = useMemo(
    () => menus.map((m) => ({ label: m.name, value: m._id })),
    [menus]
  );

  const renderFixedFields = useMemo(() => {
    const dayArray = Array.from({ length: fixedDays || 1 }, (_, i) => i + 1);

    return (
      <div className="space-y-3">
        {dayArray.map((dayIdx) => {
          const selectedMenu = selectedMenus[dayIdx - 1];

          return (
            <div key={dayIdx} className="rounded-lg p-3 border">
              <div className="max-w-50 mb-3">
                <div className="font-semibold  mb-2">Day {dayIdx}</div>

                <VA_FieldWrapper
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
              </div>

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
    );
  }, [fixedDays, selectedMenus, menus, errors]);

  return (
    <div className="w-full pb-0">
      <div className="mb-3">
        <VA_Button
          variant="ghost"
          icon={<ArrowLeftToLine />}
          onClick={() => navigate("/master/bundles")}
        >
          Bundle List
        </VA_Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
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

            <VA_FieldWrapper
              label="Days Covered"
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
                    placeholder="Select"
                    onSelect={(val) => field.onChange(val)}
                  />
                )}
              />
            </VA_FieldWrapper>

            {bundleType === "weekly" && (
              <VA_FieldWrapper
                label="Repeat for (Weeks)"
                error={errors.repeatWeeks?.message}
              >
                <Controller
                  name="repeatWeeks"
                  control={control}
                  render={({ field }) => (
                    <VA_Select
                      {...field}
                      options={Array.from({ length: 12 }, (_, i) => ({
                        label: `${i + 1} Week${i > 0 ? "s" : ""}`,
                        value: i + 1,
                      }))}
                      placeholder="Select"
                      onSelect={(val) => field.onChange(val)}
                    />
                  )}
                />
              </VA_FieldWrapper>
            )}

            <VA_FieldWrapper
              label="Base Price"
              error={errors.basePrice?.message}
            >
              <Controller
                name="basePrice"
                control={control}
                render={({ field }) => (
                  <VA_Input min="1" {...field} type="number" />
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

          {/* RIGHT PANEL */}
          <ScrollArea className="max-h-[600px] flex-1">
            <div className="flex-1 flex flex-col gap-4">
              {/* Day / Menu section */}
              <div className="bg-muted/40 p-4 rounded-lg border">
                {bundleType === "weekly"
                  ? renderWeeklyFields
                  : renderFixedFields}
              </div>

              {/* Summary */}
              <div className="mt-2">
                <Card className="p-4 shadow-sm border bg-gradient-to-b from-muted/30 to-muted/5">
                  <div className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="border-l-4 border-primary pl-2">
                      Bundle Summary
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Days Covered
                      </span>
                      <span className="font-medium">
                        {watch("durationDays") || 0}
                      </span>
                    </div>

                    {bundleType === "weekly" && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Repeat for (Weeks)
                        </span>
                        <span className="font-medium">
                          {watch("repeatWeeks") || 0}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Menus</span>
                      <span className="font-semibold text-primary">
                        {(watch("durationDays") || 0) *
                          (watch("repeatWeeks") || 0)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Base Price (Entered)
                      </span>
                      <span className="font-semibold text-primary">
                        ₹ {watch("basePrice") || 0}
                      </span>
                    </div>

                    <div className="text-xs text-muted-foreground mt-2 italic">
                      Final price is not auto-calculated. It is manually decided
                      by you for this selected plan (Days × Weeks).
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-background flex justify-end gap-3 py-3 border-t">
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
