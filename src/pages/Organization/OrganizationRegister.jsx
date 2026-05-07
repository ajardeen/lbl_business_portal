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
import { useCreateOrganization, useOrganizations } from "@/hooks/Organization/useOrganization";
import { Plus, ArrowLeft, Building2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const { accountId, holderName, email } = location.state || {};
  
  const createMutation = useCreateOrganization();
  const { data: orgsResponse } = useOrganizations();
  const organizations = orgsResponse || [];

  const [showAddress, setShowAddress] = useState(false);
  const [hasGst, setHasGst] = useState(false);

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
      contactEmail: email || "",
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

  const nameValue = watch("name");
  useEffect(() => {
    if (nameValue)
      setValue("slug", nameValue.trim().toLowerCase().replace(/\s+/g, "_"));
  }, [nameValue, setValue]);

  const onSubmit = (data) => {
    // --- UNIQUENESS CHECK ---
    const isDuplicateName = organizations.some(o => o.name.toLowerCase() === data.name.toLowerCase());
    const isDuplicateEmail = organizations.some(o => o.contactEmail.toLowerCase() === data.contactEmail.toLowerCase());
    const isDuplicatePhone = organizations.some(o => o.contactPhone === data.contactPhone);

    if (isDuplicateName) return toast.error("Organization name already exists");
    if (isDuplicateEmail) return toast.error("Contact email already exists");
    if (isDuplicatePhone) return toast.error("Contact phone already exists");

    const payload = {
      ...data,
      accountId: accountId,
      gstNumber: hasGst ? data.gstNumber : undefined,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Organization created successfully");
        reset();
        navigate("/dashboard");
      },
      onError: (err) => toast.error(err?.response?.data?.message || "Failed to create organization"),
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 dark:bg-background p-4 sm:p-6">
      <Card className="w-full max-w-3xl border-t-4 border-t-primary shadow-lg overflow-hidden">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <VA_Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")} 
              className="p-0 h-8 hover:bg-transparent text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </VA_Button>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-center">
            Set up Organization for <span className="text-primary">{holderName || "your account"}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 sm:px-10 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* BASIC INFO SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="md:col-span-2">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <VA_FieldWrapper label="Organization Name" error={errors.name?.message} required>
                      <VA_Input {...field} placeholder="e.g. Vision Action Foods" icon={<Building2 className="w-4 h-4"/>} />
                    </VA_FieldWrapper>
                  )}
                />
              </div>

              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper label="Email Address" error={errors.contactEmail?.message} required>
                    <VA_Input type="email" disabled {...field} className="bg-muted/50" />
                  </VA_FieldWrapper>
                )}
              />

              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper label="Phone Number" error={errors.contactPhone?.message} required>
                    <VA_Input type="tel" {...field} placeholder="987......." />
                  </VA_FieldWrapper>
                )}
              />

              <div className="md:col-span-2">
                <Controller
                  name="industry"
                  control={control}
                  render={({ field }) => (
                    <VA_FieldWrapper label="Industry Type" error={errors.industry?.message} required>
                      <VA_Select
                        options={[
                          { label: "Cloud Kitchen", value: "Cloud Kitchen" },
                          { label: "Restaurant", value: "Restaurant" },
                          { label: "Food Delivery", value: "Food Delivery" },
                        ]}
                        value={field.value}
                        onSelect={field.onChange}
                      />
                    </VA_FieldWrapper>
                  )}
                />
              </div>
            </div>

            {/* ADDRESS SECTION */}
            <div className="space-y-4">
              <VA_Button
                type="button"
                variant="secondary"
                className="w-full md:w-auto"
                onClick={() => setShowAddress(!showAddress)}
              >
                <Plus className={`w-4 h-4 mr-2 transition-transform ${showAddress ? 'rotate-45' : ''}`} />
                {showAddress ? "Hide Address" : "Add Address Details"}
              </VA_Button>

              {showAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg border bg-muted/10 animate-in fade-in slide-in-from-top-2">
                  <Controller
                    name="street1"
                    control={control}
                    render={({ field }) => (
                      <VA_FieldWrapper label="Street 1" error={errors.street1?.message}>
                        <VA_Input {...field} placeholder="Street address" />
                      </VA_FieldWrapper>
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <VA_FieldWrapper label="City" error={errors.city?.message}>
                        <VA_Input {...field} placeholder="City name" />
                      </VA_FieldWrapper>
                    )}
                  />
                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <VA_FieldWrapper label="Zip Code" error={errors.zipCode?.message}>
                        <VA_Input {...field} placeholder="600001" />
                      </VA_FieldWrapper>
                    )}
                  />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <VA_FieldWrapper label="Country" error={errors.country?.message}>
                        <VA_Input {...field} disabled className="bg-muted/50" />
                      </VA_FieldWrapper>
                    )}
                  />
                </div>
              )}
            </div>

            {/* SETTINGS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper label="Default Language" error={errors.language?.message}>
                    <VA_Select
                      options={[{ label: "English", value: "English" }, { label: "Tamil", value: "Tamil" }]}
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
                  <VA_FieldWrapper label="Time Zone" error={errors.timeZone?.message}>
                    <VA_Input disabled {...field} />
                  </VA_FieldWrapper>
                )}
              />
            </div>

            {/* GST SECTION */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-primary/30 bg-primary/5">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">GST Registration</p>
                <p className="text-xs text-muted-foreground">Toggle if you have a GST number</p>
              </div>
              <Switch checked={hasGst} onCheckedChange={setHasGst} />
            </div>

            {hasGst && (
              <Controller
                name="gstNumber"
                control={control}
                render={({ field }) => (
                  <VA_FieldWrapper label="GST Number" error={errors.gstNumber?.message} required>
                    <VA_Input {...field} placeholder="22............5" />
                  </VA_FieldWrapper>
                )}
              />
            )}

            <div className="pt-4 border-t">
              <VA_Button
                type="submit"
                loading={createMutation.isPending}
                className="w-full md:w-48 ml-auto block"
                size="lg"
              >
                {createMutation.isPending ? "Registering..." : "Create Profile"}
              </VA_Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrganizationRegister;