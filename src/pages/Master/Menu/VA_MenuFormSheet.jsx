import React, { useMemo } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";

import { useItems } from "@/hooks/Master/useItem";
import { useCreateMenu, useUpdateMenu } from "@/hooks/Master/useMenu";
import { Edit, PlusCircle } from "lucide-react";
import z from "zod";

const VA_MenuFormSheet = ({ mode = "create", initialData }) => {
  const { data: items = [] } = useItems();
  const createMutation = useCreateMenu();
  const updateMutation = useUpdateMenu();

  const menuSchema = z.object({
    name: z.string().min(1, "Menu name is required"),
    description: z.string().optional(),

    mealType: z.enum(["breakfast", "lunch", "dinner", "snacks", "all_day"], {
      required_error: "Meal type is required",
    }),

    suggestedDay: z
      .enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "Any",
      ])
      .optional(),

    isActive: z.boolean().default(true),

    items: z
      .array(
        z.object({
          itemId: z.string(),
          qty: z.number().min(1),
        })
      )
      .min(1, "Select at least one item"),
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      mealType: initialData?.mealType || "lunch",
      suggestedDay: initialData?.suggestedDay || "Any",
      isActive: initialData?.isActive ?? true,
      items:
        initialData?.items?.map((i) => ({
          itemId: typeof i.itemId === "object" ? i.itemId._id : i.itemId,
          qty: i.qty || 1,
        })) || [],
    },
  });

  const selectedItems = useWatch({ control, name: "items" });

  const itemOptions = items
    .filter((i) => i.isActive)
    .map((i) => ({
      label: i.name,
      value: i._id,
    }));

  const itemMap = useMemo(() => {
    const map = {};
    items.forEach((i) => (map[i._id] = i));
    return map;
  }, [items]);

  const onItemsSelect = (ids) => {
    const existing = selectedItems || [];

    const updated = ids.map((id) => {
      const found = existing.find((e) => e.itemId === id);
      return found || { itemId: id, qty: 1 };
    });

    setValue("items", updated, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      items: data.items.map((i) => ({
        itemId: i.itemId,
        name: itemMap[i.itemId]?.name || "",
        qty: i.qty,
        isVegetarian: itemMap[i.itemId]?.isVegetarian ?? false,
      })),
    };

    if (mode === "create") {
      await createMutation.mutateAsync(payload);
      reset();
    } else {
      await updateMutation.mutateAsync({
        id: initialData._id,
        payload,
      });
    }
  };

  return (
    <VA_Sheet
      title={mode === "create" ? "Create Menu" : "Update Menu"}
      className="min-w-[500px]"
      triggerComponent={
        mode === "create" ? (
          <VA_Button icon={<PlusCircle />}>Create Menu</VA_Button>
        ) : (
          <VA_Button variant="ghost" size="sm" icon={<Edit />} />
        )
      }
      sheetFooterComponent={
        <>
          <VA_Button
            loading={createMutation.isPending || updateMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {mode === "create" ? "Create" : "Update"}
          </VA_Button>
          <VA_Button variant="outline" onClick={handleSubmit(onSubmit)}>
            Cancel
          </VA_Button>
        </>
      }
    >
      <form className="space-y-4">
        {/* Name */}
        <VA_FieldWrapper label="Menu Name" error={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <VA_Input {...field} />}
          />
        </VA_FieldWrapper>

        {/* Description */}
        <VA_FieldWrapper
          label="Menu Description"
          error={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <VA_Input
                {...field}
                as="textarea"
                rows={3}
                placeholder="Describe this menu (optional)"
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Meal Type */}
        <VA_FieldWrapper label="Meal Type" error={errors.mealType?.message}>
          <Controller
            name="mealType"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                onSelect={field.onChange}
                options={[
                  { label: "Breakfast", value: "breakfast" },
                  { label: "Lunch", value: "lunch" },
                  { label: "Dinner", value: "dinner" },
                  { label: "Snacks", value: "snacks" },
                  { label: "All Day", value: "all_day" },
                ]}
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Suggested Day */}
        <VA_FieldWrapper label="Suggested Day">
          <Controller
            name="suggestedDay"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                onSelect={field.onChange}
                options={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                  "Any",
                ].map((d) => ({ label: d, value: d }))}
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Item Select */}
        <VA_FieldWrapper label="Menu Items" error={errors.items?.message}>
          <VA_Select
            multiSelect
            searchable
            options={itemOptions}
            value={selectedItems?.map((i) => i.itemId)}
            onSelect={onItemsSelect}
          />
        </VA_FieldWrapper>

        {/* Qty Table */}
        {selectedItems?.length > 0 && (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-left">Qty</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">UOM</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((row, index) => {
                  const item = itemMap[row.itemId] || {};
                  return (
                    <tr key={row.itemId} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 w-24">
                        <VA_Input
                          type="number"
                          min={1}
                          value={row.qty}
                          onChange={(e) => {
                            const updated = [...selectedItems];
                            updated[index].qty = Number(e.target.value);
                            setValue("items", updated);
                          }}
                        />
                      </td>
                      <td className="p-2">₹{item.pricing[0].value ?? "—"}</td>
                      <td className="p-2">{item.uom ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </form>
    </VA_Sheet>
  );
};

export default VA_MenuFormSheet;
