import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_TextArea from "@/components/VAComponents/VA_TextArea";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCreateOrganization } from "@/hooks/Organization/useOrganization";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  accountId: z.string().optional(),
  name: z.string().min(1, "Organization name required"),
  slug: z.string().min(1, "Slug required"),
  description: z.string().optional(),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(10, "Phone required"),
  location: z.string().min(1),
  industry: z.string().min(1, "Industry required"),
  street1: z.string().optional(),
  street2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().min(1, "Country required"),
  zipCode: z.string().optional(),
  currency: z.string().min(1),
  language: z.string().min(1, "Language required"),
  timeZone: z.string().min(1, "Timezone required"),
  gstNumber: z.string().optional(),
});

function OrganizationRegister() {
  const navigate = useNavigate();
  const createMutation = useCreateOrganization();
  const [showAddress, setShowAddress] = useState(false);
  const [hasGst, setHasGst] = useState(false);
  const [accountId, setAccountId] = useState(null);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setAccountId(userData.account._id);
  }, []);


  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accountId: "",
      name: "",
      slug: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
      location: "India",
      industry: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      country: "India",
      zipCode: "",
      currency: "INR",
      language: "English",
      timeZone: "Asia/Kolkata",
      gstNumber: "",
    },
  });

  // Auto-generate slug from name
  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue)
      setValue("slug", nameValue.trim().toLowerCase().replace(/\s+/g, "_"));
  }, [nameValue, setValue]);

  const onSubmit = (data) => {

    data.accountId = accountId;
    if (!hasGst) delete data.gstNumber;
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        setShowAddress(false);
        setHasGst(false);
        navigate("/dashboard");
      },
      onError: (error) => {
        console.log(error);
        
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f8fe] p-6">
      <Card className="w-full max-w-3xl border border-border bg-background rounded-none shadow-none border-t-primary">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold py-5 flex flex-col relative">
            <VA_Button
              variant="link"
              onClick={() => navigate("/")}
              className=" cursor-pointer"
            >
              Back to home
            </VA_Button>
            Set up your organization profile
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-10">
            {/* BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <VA_FieldWrapper
                      label="Organization Name"
                      error={errors.name?.message}
                    >
                      <VA_Input {...field} placeholder="Vision Action Foods" />
                    </VA_FieldWrapper>
                  )}
                />
              </div>

              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Email"
                    error={errors.contactEmail?.message}
                  >
                    <VA_Input
                      type="email"
                      {...field}
                      placeholder="admin@visionaction.com"
                    />
                  </VA_FieldWrapper>
                )}
              />

              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Phone"
                    error={errors.contactPhone?.message}
                  >
                    <VA_Input type="number" {...field} placeholder="989...." />
                  </VA_FieldWrapper>
                )}
              />
              <div className="col-span-2">
                <Controller
                  name="industry"
                  control={control}
                  render={({ field }) => (
                    <VA_FieldWrapper
                      label="Industry"
                      error={errors.industry?.message}
                    >
                      <VA_Select
                        options={[
                          { label: "Cloud Kitchen", value: "Cloud Kitchen" },
                          { label: "Restaurant", value: "Restaurant" },
                          { label: "Food Delivery", value: "Food Delivery" },
                          {
                            label: "Catering Service",
                            value: "Catering Service",
                          },
                        ]}
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </VA_FieldWrapper>
                  )}
                />
              </div>
              {/* ADDRESS SECTION */}
              <div className="col-span-2">
                <VA_Button
                  type="button"
                  variant="outline"
                  icon={<Plus className="text-primary" />}
                  onClick={() => setShowAddress(!showAddress)}
                  className="mb-3"
                >
                  {showAddress
                    ? "Hide Address Details"
                    : "Add Organization Address"}
                </VA_Button>

                {showAddress && (
                  <div className="mt-1 grid md:grid-cols-2 gap-4 border rounded-md p-4 bg-muted/20">
                    <Controller
                      name="street1"
                      control={control}
                      render={({ field }) => (
                        <VA_FieldWrapper
                          label="Street 1"
                          error={errors.street1?.message}
                        >
                          <VA_Input {...field} placeholder="12th Cross Road" />
                        </VA_FieldWrapper>
                      )}
                    />

                    <Controller
                      name="street2"
                      control={control}
                      render={({ field }) => (
                        <VA_FieldWrapper
                          label="Street 2"
                          error={errors.street2?.message}
                        >
                          <VA_Input {...field} placeholder="Sector 3" />
                        </VA_FieldWrapper>
                      )}
                    />

                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <VA_FieldWrapper
                          label="City"
                          error={errors.city?.message}
                        >
                          <VA_Input {...field} placeholder="Bangalore" />
                        </VA_FieldWrapper>
                      )}
                    />

                    <Controller
                      name="zipCode"
                      control={control}
                      render={({ field }) => (
                        <VA_FieldWrapper
                          label="Postal Code"
                          error={errors.zipCode?.message}
                        >
                          <VA_Input {...field} placeholder="560001" />
                        </VA_FieldWrapper>
                      )}
                    />
                  </div>
                )}
              </div>

              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Currency"
                    error={errors.currency?.message}
                  >
                    <VA_Select
                      options={[{ label: "INR", value: "INR" }]}
                      value={field.value}
                      onSelect={field.onChange}
                      disabled
                    />
                  </VA_FieldWrapper>
                )}
              />

              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Language"
                    error={errors.language?.message}
                  >
                    <VA_Select
                      options={[
                        { label: "English", value: "English" },
                        { Label: "Tamil", value: "Tamil" },
                        { label: "Hindi", value: "Hindi" },
                      ]}
                      value={field.value}
                      onSelect={field.onChange}
                    />
                  </VA_FieldWrapper>
                )}
              />

              <Controller
                name="timeZone"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Time Zone"
                    error={errors.timeZone?.message}
                  >
                    <VA_Input {...field} placeholder="Asia/Kolkata" />
                  </VA_FieldWrapper>
                )}
              />

              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="Location"
                    error={errors.location?.message}
                  >
                    <VA_Input {...field} disabled />
                  </VA_FieldWrapper>
                )}
              />
            </div>

            {/* DESCRIPTION */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <VA_FieldWrapper
                  label="Description"
                  error={errors.description?.message}
                >
                  <VA_TextArea
                    {...field}
                    placeholder="Premium meal bundle service"
                  />
                </VA_FieldWrapper>
              )}
            />

            {/* GST TOGGLE */}
            <div className="flex items-center justify-between border rounded-md p-3 bg-muted/30">
              <span className="font-medium text-sm">Add GST Number?</span>
              <Switch checked={hasGst} onCheckedChange={setHasGst} />
            </div>

            {hasGst && (
              <Controller
                name="gstNumber"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper
                    label="GST Number"
                    error={errors.gstNumber?.message}
                  >
                    <VA_Input {...field} placeholder="22AAAAA0000A1Z5" />
                  </VA_FieldWrapper>
                )}
              />
            )}

            <div className="flex justify-end pt-6">
              <VA_Button
                type="submit"
                loading={createMutation.isPending}
                className="min-w-80 h-40"
              >
                {createMutation.isPending ? "Submitting..." : "Get Started"}
              </VA_Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrganizationRegister;
