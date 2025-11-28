import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";

import { useItems } from "@/hooks/Master/useItem";
import { useCreateMenu, useUpdateMenu } from "@/hooks/Master/useMenu";
import { Edit, PlusCircle } from "lucide-react";

// ✅ Enhanced Zod validation schema
const menuSchema = z.object({
  name: z.string().min(1, "Menu name is required"),
  description: z.string().optional(),
  dayOfWeek: z
    .enum(
      [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
        "",
      ],
      { required_error: "Day of week is required" }
    )
    .optional(),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
  items: z.array(z.string()).min(1, "At least one menu item is required"),
});

const VA_MenuFormSheet = ({ mode = "create", initialData }) => {
  const createMutation = useCreateMenu();
  const updateMutation = useUpdateMenu();
  const { data: items = [] } = useItems();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      dayOfWeek: initialData?.dayOfWeek || "",
      status: initialData?.status || "active",
      items:
        initialData?.items?.map((i) =>
          typeof i.itemId === "object" ? i.itemId._id : i.itemId
        ) || [],
    },
  });
  // console.log("items",items);
  

  const itemOptions =
    items
      ?.filter((i) => i.isActive === true)
      .map((i) => ({
        label: i.name,
        value: i._id,
      })) || [];

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      items: (data.items || []).map((id) => ({
        itemId: id,
        itemName: items.find((i) => i._id === id)?.name || "",
        itemPrice: items.find((i) => i._id === id)?.price || 0,
        qty: 1,
        notes: "",
      })),
    };

    console.log("update", payload);
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
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {mode === "create" ? "Create" : "Update"}
          </VA_Button>
          <VA_Button
            type="button"
            variant="outline"
            onClick={() => reset(initialData)}
          >
            Cancel
          </VA_Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Menu Name */}
        <VA_FieldWrapper label="Menu Name" error={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <VA_Input {...field} placeholder="Enter menu name" />
            )}
          />
        </VA_FieldWrapper>

        {/* Description */}
        <VA_FieldWrapper
          label="Description"
          error={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <VA_Input {...field} placeholder="Description (optional)" />
            )}
          />
        </VA_FieldWrapper>

        {/* Day of Week */}
        <VA_FieldWrapper label="Day of Week" error={errors.dayOfWeek?.message}>
          <Controller
            name="dayOfWeek"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                onSelect={(value) => field.onChange(value)}
                options={[
                  { label: "Monday", value: "Monday" },
                  { label: "Tuesday", value: "Tuesday" },
                  { label: "Wednesday", value: "Wednesday" },
                  { label: "Thursday", value: "Thursday" },
                  { label: "Friday", value: "Friday" },
                  { label: "Saturday", value: "Saturday" },
                  { label: "Sunday", value: "Sunday" },
                ]}
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Status */}
        <VA_FieldWrapper label="Status" error={errors.status?.message}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                onSelect={(value) => field.onChange(value)}
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Items Multi Select */}
        <VA_FieldWrapper label="Menu Items" error={errors.items?.message}>
          <Controller
            name="items"
            control={control}
            render={({ field }) => (
              <VA_Select
                {...field}
                value={field.value}
                onSelect={(value) => field.onChange(value)}
                options={itemOptions}
                placeholder="Select menu items"
                searchable
                multiSelect
              />
            )}
          />
        </VA_FieldWrapper>
      </form>
    </VA_Sheet>
  );
};

export default VA_MenuFormSheet;
