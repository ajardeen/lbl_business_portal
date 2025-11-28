import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_TextArea from "@/components/VAComponents/VA_TextArea";
import VA_Button from "@/components/VAComponents/VA_Button";
import { useCreateItem, useUpdateItem } from "@/hooks/Master/useItem";
import { useCategorys } from "@/hooks/Master/useCategory";
import { Edit, Plus } from "lucide-react";
import NutritionCollapse from "../Bundle/NutritionCollapse";

// Define standard UOM options
const uomOptions = [
  { label: "Piece (Pcs)", value: "Pcs" },
  { label: "Kilogram (Kg)", value: "Kg" },
  { label: "Liter (L)", value: "L" },
  { label: "Box (Box)", value: "Box" },
];

const schema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  uom: z.string().min(1, "UOM is required"), // Remains a string
  prepTimeMinutes: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .refine((v) => v !== undefined && v !== null && v >= 1, {
      message: "Price is required and must be at least 1",
    }),
  onlinePrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),
  parcelPrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),
  deliveryPrice: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),
  nutrition: z.object({
    calories: z
      .union([z.string(), z.number()])
      .transform((v) => Number(v || 0)),
    protein: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
    carbs: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
    fat: z.union([z.string(), z.number()]).transform((v) => Number(v || 0)),
  }),

  images: z.string().optional(),
  isVegetarian: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

const VA_ItemFormSheet = ({ mode = "create", initialData }) => {
  const { data: categorys = [], isLoading: loadingCategory } = useCategorys();
  const [sheetOpen, setSheetOpen] = useState(false);
  const createMutation = useCreateItem();
  const updateMutation = useUpdateItem();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      categoryId: "",
      sku: "",
      name: "",
      description: "",
      uom: "Pcs",
      prepTimeMinutes: 0,
      price: 0,
      onlinePrice: 0,
      parcelPrice: 0,
      deliveryPrice: 0,
      tags: "",
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },

      images: "",
      isVegetarian: false,
      isActive: true,
    },
  });

  const onSubmit = async (data) => {
    if (mode === "create") {
      await createMutation.mutateAsync(data);
    } else {
      await updateMutation.mutateAsync({ id: initialData._id, payload: data });
    }
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
      className="min-w-[450px]"
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
          <VA_Button
            onClick={() => setSheetOpen(false)}
            variant="outline"
            type="button"
          >
            Cancel
          </VA_Button>
        </>
      }
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* CATEGORY */}
        <Controller
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Category"
              error={form.formState.errors.categoryId?.message}
            >
              <VA_Select
                options={
                  loadingCategory
                    ? []
                    : categorys.map((cat) => ({
                        label: cat.name,
                        value: cat._id,
                      }))
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
            <VA_FieldWrapper
              label="SKU"
              required
              toolTipText={"Stock Keeping Unit"}
              error={form.formState.errors.sku?.message}
            >
              <VA_Input placeholder="SKU" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* NAME */}
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Name"
              error={form.formState.errors.name?.message}
            >
              <VA_Input placeholder="Item name" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* UOM - CHANGED TO SELECT */}
        <Controller
          name="uom"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Unit of Measure"
              error={form.formState.errors.uom?.message}
            >
              <VA_Select
                options={uomOptions} // Use the defined UOM options
                placeholder="Select UOM"
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* PREP TIME */}
        <Controller
          name="prepTimeMinutes"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Preparation Time (mins)"
              error={form.formState.errors.prepTimeMinutes?.message}
            >
              <VA_Input type="number" placeholder="Prep time" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* PRICE */}
        <Controller
          name="price"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Price"
              error={form.formState.errors.price?.message}
            >
              <VA_Input type="number" min="1" placeholder="Price" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* ONLINE PRICE */}
        <Controller
          name="onlinePrice"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Online Price"
              error={form.formState.errors.onlinePrice?.message}
            >
              <VA_Input type="number" placeholder="Online price" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* PARCEL PRICE */}
        <Controller
          name="parcelPrice"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Parcel Price"
              error={form.formState.errors.parcelPrice?.message}
            >
              <VA_Input type="number" placeholder="Parcel price" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* DELIVERY PRICE */}
        <Controller
          name="deliveryPrice"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Delivery Price"
              error={form.formState.errors.deliveryPrice?.message}
            >
              <VA_Input type="number" placeholder="Delivery price" {...field} />
            </VA_FieldWrapper>
          )}
        />

        {/* TAGS */}
        {/* <Controller
          name="tags"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Tags"
              error={form.formState.errors.tags?.message}
            >
              <VA_Input placeholder="Tags (comma separated)" {...field} />
            </VA_FieldWrapper>
          )}
        /> */}

        {/* IMAGE URL */}
        {/* <Controller
          name="images"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Image URL"
              error={form.formState.errors.images?.message}
            >
              <VA_Input type="string" placeholder="https://..." {...field} />
            </VA_FieldWrapper>
          )}
        /> */}

        {/* IS VEGETARIAN */}
        <Controller
          name="isVegetarian"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Vegetarian"
              error={form.formState.errors.isVegetarian?.message}
            >
              <VA_Select
                options={[
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ]}
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* IS ACTIVE */}
        <Controller
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Status"
              error={form.formState.errors.isActive?.message}
            >
              <VA_Select
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false },
                ]}
                value={field.value}
                onSelect={field.onChange}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* DESCRIPTION — Full width */}
        <div className="col-span-2">
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Description"
                error={form.formState.errors.description?.message}
              >
                <VA_TextArea placeholder="Enter item description (optional)" {...field} />
              </VA_FieldWrapper>
            )}
          />
          {/* ⭐ NUTRITION — CALORIES */}
          <NutritionCollapse
            control={form.control}
            errors={form.formState.errors}
          />
        </div>
      </form>
    </VA_Sheet>
  );
};

export default VA_ItemFormSheet;
