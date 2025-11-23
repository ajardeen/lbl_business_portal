
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import { useForm, Controller } from "react-hook-form";

const BranchEditForm = ({ branch, updateMutation, onClose }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      branchName: branch.branchName,
      branchCode: branch.branchCode,
      branchType: branch.branchType,
      city: branch.city,
      country: branch.country,
      contactPhone: branch.contactPhone,
      contactEmail: branch.contactEmail,
      status: branch.status,
    },
  });

  const onSubmit = async (data) => {
    await updateMutation.mutateAsync({ id: branch._id, payload: data });
    onClose();
  };

  return (
    <form
      id={`edit-form-${branch._id}`}
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-4"
    >
      <Controller
        name="branchName"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Branch Name">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="branchCode"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Branch Code">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="branchType"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Type">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="City">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Country">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="contactPhone"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Phone">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="contactEmail"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Email">
            <VA_Input {...field} />
          </VA_FieldWrapper>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <VA_FieldWrapper label="Status">
            <VA_Select
            disabled
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={field.value}
              onSelect={field.onChange}
            />
          </VA_FieldWrapper>
        )}
      />
    </form>
  );
};
export default BranchEditForm;