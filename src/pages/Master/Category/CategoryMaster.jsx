import React from "react";
import VA_DataTable from "@/components/VAComponents/VA_DataTable";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import Badge from "@/components/ui/Badge";

import { createColumnHelper } from "@tanstack/react-table";
import { LayoutTemplate, Plus } from "lucide-react";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCategorys,
  useCreateCategory,
} from "../../../hooks/Master/useCategory";

// -----------------------------------------------
// ZOD Schema
// -----------------------------------------------
const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  sortOrder: z.number().min(1, "Minimum value is 1"),
  status: z.enum(["active", "inactive"]),
});

const DEFAULT_ORG_ID = "67a0c558d9f4ca2d381acb22";
const DEFAULT_BRANCH_ID = "67a0d122ee5cd4027459db11";

// -----------------------------------------------
// Create Category Sheet
// -----------------------------------------------
const CreateCategorySheet = ({ createMutation }) => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      sortOrder: 1,
      status: "active",
    },
  });

  const { control, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    createMutation.mutate(
      {
        ...data,
        organizationId: DEFAULT_ORG_ID,
        branchId: DEFAULT_BRANCH_ID,
      },
      { onSuccess: () => reset() }
    );
  };

  return (
    <VA_Sheet
      title="Create Category"
      triggerComponent={<VA_Button icon={<Plus />}>Create Category</VA_Button>}
      sheetFooterComponent={
        <>
          <VA_Button onClick={handleSubmit(onSubmit)}>Submit</VA_Button>
          <VA_Button variant="outline">Cancel</VA_Button>
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
                placeholder="Enter category name"
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

// -----------------------------------------------
// MAIN PAGE - Category Master
// -----------------------------------------------
const CategoryMaster = () => {
  const { data: categorys = [], isLoading } = useCategorys();
  const createMutation = useCreateCategory();

  const columnHelper = createColumnHelper();
  const categoryColumns = [
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("description", { header: "Description" }),
    columnHelper.accessor("sortOrder", { header: "Sort Order" }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          badgeClassName={
            info.getValue() === "active"
              ? "text-green-500 border-green-500"
              : "text-red-500 border-red-500"
          }
          text={info.getValue()?.toUpperCase()}
        />
      ),
    }),
    columnHelper.accessor("createdAt", { header: "Created At" }),
    columnHelper.accessor("updatedAt", { header: "Updated At" }),
  ];

  return (
    <VA_DataTable
      title="Category"
      icon={<LayoutTemplate />}
      description="Manage your categories"
      data={categorys}
      columns={categoryColumns}
      isLoading={isLoading}
      addONActions={CreateCategorySheet({ createMutation })}
    />
  );
};

export default CategoryMaster;
