import React, { useState } from "react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  sortOrder: z.number().min(1, "Minimum value is 1"),
  status: z.enum(["active", "inactive"]),
});

const CategoryFormSheet = ({
  mode = "create",
  initialData = null,
  mutate,
  triggerComponent,
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      sortOrder: 1,
      status: "active",
    },
  });

  const { control, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    if (mode === "create") {
      mutate(
        // The IDs are now automatically added via the Axios interceptor in the header
        // We only send the form data in the body
        data,
        { onSuccess: () => reset() },
      );
    } else {
      mutate(
        {
          id: initialData._id,
          payload: data,
        },
        { onSuccess: () => {} },
      );
    }
  };

  return (
    <VA_Sheet
      title={mode === "create" ? "Create Category" : "Update Category"}
      triggerComponent={triggerComponent}
      open={sheetOpen}
      setOpen={setSheetOpen}
      sheetFooterComponent={
        <>
          <VA_Button
            loading={mutate.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {mode === "create" ? "Create" : "Update"}
          </VA_Button>

          <VA_Button
            onClick={() => {
              form.reset();
              setSheetOpen(false);
            }}
            variant="outline"
          >
            Cancel
          </VA_Button>
        </>
      }
    >
      <form className="grid gap-4 py-2">
        {/* Name */}
        <VA_FieldWrapper label="Name" required error={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <VA_Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Enter name"
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Description */}
        <VA_FieldWrapper label="Description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <VA_Input
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Enter description"
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Sort Order */}
        <VA_FieldWrapper
          label="Sort Order"
          required
          error={errors.sortOrder?.message}
        >
          <Controller
            name="sortOrder"
            control={control}
            render={({ field }) => (
              <VA_Input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(+e.target.value)}
                placeholder="1"
              />
            )}
          />
        </VA_FieldWrapper>

        {/* Status */}
        <VA_FieldWrapper label="Status" required error={errors.status?.message}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <VA_Select
                value={field.value}
                onSelect={(val) => field.onChange(val)}
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            )}
          />
        </VA_FieldWrapper>
      </form>
    </VA_Sheet>
  );
};

export default CategoryFormSheet;
