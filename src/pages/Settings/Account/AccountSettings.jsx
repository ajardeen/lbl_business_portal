import React from "react";
import { useForm, Controller } from "react-hook-form";

// ✅ VA Components
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Separator } from "@/components/ui/separator";

function AccountSettings() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "admin",
      status: "active",
    },
  });

  const onSubmit = (data) => {
    console.log("🧩 Update Account Clicked:", data);
  };

  return (
    <div className="max-w-xl p-1 space-y-6">
      <h2 className="text-2xl font-semibold text-accent-foreground">
        Account Settings
      </h2>
      <Separator className="border-t border-border" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Full Name"
              description="Enter your complete name as it should appear on your account."
            >
              <VA_Input {...field} placeholder="Enter full name" />
            </VA_FieldWrapper>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Email"
              description="Provide your email address for communication and login."
            >
              <VA_Input {...field} placeholder="Enter email address" />
            </VA_FieldWrapper>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Phone Number"
              description="Optional: Add a contact number for verification or recovery."
            >
              <VA_Input {...field} placeholder="Enter phone number" />
            </VA_FieldWrapper>
          )}
        />

        {/* Role */}
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Role"
              description="Your assigned system role (cannot be changed)."
            >
              <VA_Select
                disabled
                {...field}
                options={[
                  { label: "Admin", value: "admin" },
                  { label: "Branch Admin", value: "branch_admin" },
                  { label: "Manager", value: "manager" },
                  { label: "Staff", value: "staff" },
                ]}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* Status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <VA_FieldWrapper
              label="Status"
              description="Indicates whether this account is currently active or inactive."
            >
              <VA_Select
                disabled
                {...field}
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
              />
            </VA_FieldWrapper>
          )}
        />

        {/* Submit Button */}
        <div className="pt-4">
          <VA_Button type="submit" className="w-full">
            Update Account
          </VA_Button>
        </div>
      </form>
    </div>
  );
}

export default AccountSettings;
