import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { useCreateStaff, useUpdateStaff } from "@/hooks/MyStaff/useStaff";
import { useState } from "react";
import { Edit } from "lucide-react";

const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(["staff", "chef", "rider"]),
  password: z.string().min(6, "Min 4 characters").optional(),
});

export default function VA_StaffFormSheet({ mode = "create", initialData }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues:
      mode === "update"
        ? initialData
        : {
            name: "",
            email: "",
            phone: "",
            position: "",
            department: "",
            role: "staff",
            password: "",
          },
  });

  const onSubmit = async (data) => {
    if (mode === "create") {
      await createMutation.mutateAsync(data);
    } else {
      await updateMutation.mutateAsync({ id: initialData._id, payload: data });
    }
  };
  const staffOptions = [
    {
      label: "Staff",
      value: "staff",
    },
   
    {
      label: "Chef",
      value: "chef",
    },
    {
      label:"rider",
      value:"rider"
    }
  ];

  return (
    <VA_Sheet
      triggerComponent={
        mode === "create" ? (
          <VA_Button>Add Staff</VA_Button>
        ) : (
          <VA_Button variant="ghost" icon={<Edit />} />
        )
      }
      title={mode === "create" ? "Create Staff" : "Update Staff"}
      open={sheetOpen}
      setOpen={setSheetOpen}
      sheetFooterComponent={
        <>
          <VA_Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {mode === "create" ? "Create" : "Update"}
          </VA_Button>
          <VA_Button variant="outline" onClick={() => setSheetOpen(false)}>
            Cancel
          </VA_Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Name" error={errors.name?.message}>
              <VA_Input {...field} placeholder="Full name" />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Email" error={errors.email?.message}>
              <VA_Input {...field} placeholder="Email address" />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Phone" error={errors.phone?.message}>
              <VA_Input {...field} placeholder="Phone number" />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Position" error={errors.position?.message}>
              <VA_Input {...field} placeholder="Job title" />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Department"
              error={errors.department?.message}
            >
              <VA_Input {...field} placeholder="Department" />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Role" error={errors.role?.message}>
              <VA_Select
                {...field}
                onSelect={(value) => field.onChange(value)}
                options={staffOptions}
              />
            </VA_FieldWrapper>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper label="Password" error={errors.password?.message}>
              <VA_Input type="password" {...field} placeholder="Password" />
            </VA_FieldWrapper>
          )}
        />
      </form>
    </VA_Sheet>
  );
}
