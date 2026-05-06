import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_TextArea from "@/components/VAComponents/VA_TextArea";
import VA_Button from "@/components/VAComponents/VA_Button";
import NutritionCollapse from "./components/NutritionCollapse";

import { useCreateItem, useUpdateItem } from "@/hooks/Master/useItem";
import { useCategorys } from "@/hooks/Master/useCategory";
import { Edit, Plus } from "lucide-react";

// ⭐ Pricing Types UI
const pricingTypes = [
  { label: "Base Price", type: "base" },
  { label: "Online Price", type: "online" },
  { label: "Parcel Price", type: "parcel" },
  { label: "Delivery Price", type: "delivery" },
  { label: "Premium Price", type: "premium" },
];

const pricingTierSchema = z.object({
  type: z.enum(["base", "online", "parcel", "delivery", "premium"]),
  value: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v || 0))
    .refine((v) => v >= 0, { message: "Price must be 0 or above" }),
});

const schema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  uom: z.string().min(1, "UOM is required"),
  prepTimeMinutes: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),
  pricing: z
    .array(pricingTierSchema)
    .min(1, "At least one pricing tier is required"),
  nutrition: z.object({
    calories: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
    protein: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
    carbs: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
    fat: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
  }),
  image: z.string().optional(),
  isVegetarian: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

const uomOptions = [
  { label: "Piece (Pcs)", value: "Pcs" },
  { label: "Kilogram (Kg)", value: "Kg" },
  { label: "Liter (L)", value: "L" },
  { label: "Box (Box)", value: "Box" },
];

const VA_ItemFormSheet = ({ mode = "create", initialData }) => {
  const { data: categorys = [], isLoading: loadingCategory } = useCategorys();
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();
  const [sheetOpen, setSheetOpen] = useState(false);
console.log("initialData",initialData);

  const form = useForm({
    
    resolver: zodResolver(schema),
    defaultValues:
      mode === "update"
        ? {
            ...initialData,
            categoryId: initialData?.categoryId?._id,

            // map pricing array → { base: 100, online: 0, ... }
            pricing: pricingTypes.map((p) => {
              const found = initialData?.pricing?.find((x) => x.type === p.type);
              return { type: p.type, value: found?.value || 0 };
            }),
          }
        : {
            categoryId: "",
            sku: "",
            name: "",
            description: "",
            uom: "Pcs",
            prepTimeMinutes: 0,
            pricing: pricingTypes.map((p) => ({ type: p.type, value: 0 })),
            nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            image: "",
            isVegetarian: false,
            isActive: true,
          },
  });

  const onSubmit = async (data) => {
    // convert pricing {type,value} from form to API format
    data.pricing = data.pricing.map((p) => ({
      type: p.type,
      value: Number(p.value),
    }));

    if (mode === "create")
      await createMutation.mutateAsync(data);
    else
      await updateMutation.mutateAsync({ id: initialData._id, payload: data });

    setSheetOpen(false);
  };

  return (
    <VA_Sheet
      triggerComponent={
        mode === "create" ? (
          <VA_Button icon={<Plus />}>Create Item</VA_Button>
        ) : (
          <VA_Button icon={<Edit />} variant="ghost" size="sm" />
        )
      }
      open={sheetOpen}
      setOpen={setSheetOpen}
      title={mode === "create" ? "Create Item" : "Update Item"}
      className="md:min-w-[450px]"
      description="Manage your item details here."
      sheetFooterComponent={
        <>
          <VA_Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {mode === "create" ? "Create" : "Update"}
          </VA_Button>
          <VA_Button onClick={() => setSheetOpen(false)} variant="outline">
            Cancel
          </VA_Button>
        </>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {/* CATEGORY */}
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Category" error={form.formState.errors.categoryId?.message}>
              <VA_Select
                options={
                  loadingCategory
                    ? []
                    : categorys.map((cat) => ({ label: cat.name, value: cat._id }))
                }
                placeholder="Select Category"
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* SKU */}
        <Controller
          name="sku"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="SKU" error={form.formState.errors.sku?.message}>
              <VA_Input placeholder="SKU" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* NAME */}
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Name" error={form.formState.errors.name?.message}>
              <VA_Input placeholder="Item name" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* UOM */}
        <Controller
          name="uom"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Unit of Measure" error={form.formState.errors.uom?.message}>
              <VA_Select options={uomOptions} value={field.value} onSelect={field.onChange} />
            </VA_FieldWrapper>
          )}
        />

        {/* PREP TIME */}
        <Controller
          name="prepTimeMinutes"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Preparation Time (mins)">
              <VA_Input type="number" placeholder="Prep time" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* ⭐ PRICING FIELDS */}
        {pricingTypes.map((p, index) => (
          <Controller
            key={p.type}
            name={`pricing.${index}.value`}
            control={form.control}
            render={({ field }) => (
              <VA_FieldWrapper label={p.label}>
                <VA_Input
                  type="number"
                  placeholder={p.label}
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </VA_FieldWrapper>
            )}
          />
        ))}

        {/* VEGETARIAN */}
        <Controller
          name="isVegetarian"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Vegetarian">
              <VA_Select
                options={[{ label: "Yes", value: true }, { label: "No", value: false }]}
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* STATUS */}
        <Controller
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper label="Status">
              <VA_Select
                options={[{ label: "Active", value: true }, { label: "Inactive", value: false }]}
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* DESCRIPTION */}
        <div className="col-span-2">
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <VA_FieldWrapper label="Description">
                <VA_TextArea placeholder="Enter item description" {...field} />
              </VA_FieldWrapper>
            )}
          />

          {/* NUTRITION */}
          <NutritionCollapse control={form.control} errors={form.formState.errors} />
        </div>
      </form>
    </VA_Sheet>
  );
};

export default VA_ItemFormSheet;
