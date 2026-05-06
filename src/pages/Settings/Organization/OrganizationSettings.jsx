import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";
import VA_Button from "@/components/VAComponents/VA_Button";
import { Separator } from "@/components/ui/separator";

import { useBranches, useUpdateBranch } from "@/hooks/Settings/useBranch";
import BranchCard from "./components/BranchCard";
import { useOrganizationById } from "@/hooks/Organization/useOrganization";
import { useAuth } from "@/context/AuthContext";

function OrganizationSettings() {
  const { organizationId } = useAuth();
  const { data: branches = [], isLoading: isBranchesLoading } = useBranches();
  const updateBranchMutation = useUpdateBranch();
  const { data: org, isLoading: isOrgsLoading } = useOrganizationById(organizationId);

  const { control, reset } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
      industry: "",
      language: "",
      currency: "",
      status: "",
      street1: "",
      street2: "",
      city: "",
      country: "",
      zipCode: "",
      gstNumber: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    if (org) {
      reset({
        name: org.name || "",
        slug: org.slug ? `@${org.slug}` : "",
        description: org.description || "",
        contactEmail: org.contactEmail || "",
        contactPhone: org.contactPhone || "",
        industry: org.industry || "",
        language: org.language || "",
        currency: org.currency || "",
        status: org.status || "",
        street1: org.street1 || "",
        street2: org.street2 || "",
        city: org.city || "",
        country: org.country || "",
        zipCode: org.zipCode || "",
        gstNumber: org.gstNumber || "",
        createdAt: org.createdAt
          ? new Date(org.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
      });
    }
  }, [org, reset]);

  if (isBranchesLoading || isOrgsLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm text-muted-foreground animate-pulse">
        Loading organization profile...
      </div>
    );
  }

  return (
    <div className=" p-1 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-accent-foreground">
          Organization Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Global business profile and contact configuration.
        </p>
      </div>

      <Separator className="border-t border-border" />

      {org ? (
        <div className="space-y-4 grid  md:grid-cols-2 gap-6">
          {/* Identity */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Organization Name"
                description="The registered name of your organization."
              >
                <VA_Input {...field} disabled placeholder="Organization name" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Slug"
                description="Unique identifier used in URLs and references."
              >
                <VA_Input {...field} disabled placeholder="@slug" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Description"
                description="A short summary of what your organization does."
              >
                <VA_Input {...field} disabled placeholder="Organization description" />
              </VA_FieldWrapper>
            )}
          />

          <Separator className="border-t border-border col-span-2" />

          {/* Contact */}
          <Controller
            name="contactEmail"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Contact Email"
                description="Primary email address for organization-level communication."
              >
                <VA_Input {...field} disabled placeholder="contact@example.com" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="contactPhone"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Contact Phone"
                description="Primary phone number for the organization."
              >
                <VA_Input {...field} disabled placeholder="+91 00000 00000" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Industry"
                description="The sector your organization operates in."
              >
                <VA_Input {...field} disabled placeholder="Industry" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Language"
                description="Default language used across the organization."
              >
                <VA_Input {...field} disabled placeholder="Language" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Currency"
                description="Default currency for transactions and billing."
              >
                <VA_Input {...field} disabled placeholder="Currency" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Status"
                description="Indicates whether this organization is currently active."
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

          <Separator className="border-t border-border col-span-2" />

          {/* Address */}
          <Controller
            name="street1"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Street Line 1"
                description="Primary street address of the organization."
              >
                <VA_Input {...field} disabled placeholder="Street line 1" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="street2"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Street Line 2"
                description="Apartment, suite, floor, or additional address info."
              >
                <VA_Input {...field} disabled placeholder="Street line 2" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="City"
                description="City where the organization is headquartered."
              >
                <VA_Input {...field} disabled placeholder="City" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Country"
                description="Country of registration."
              >
                <VA_Input {...field} disabled placeholder="Country" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="ZIP / Postal Code"
                description="Postal code for the organization's location."
              >
                <VA_Input {...field} disabled placeholder="ZIP code" />
              </VA_FieldWrapper>
            )}
          />

          <Separator className="border-t border-border col-span-2" />

          {/* Tax & Meta */}
          <Controller
            name="gstNumber"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="GST Number"
                description="Government-issued tax identification number."
              >
                <VA_Input {...field} disabled placeholder="GST number" />
              </VA_FieldWrapper>
            )}
          />

          <Controller
            name="createdAt"
            control={control}
            render={({ field }) => (
              <VA_FieldWrapper
                label="Established Date"
                description="The date this organization was registered in the system."
              >
                <VA_Input {...field} disabled placeholder="Established date" />
              </VA_FieldWrapper>
            )}
          />

          {/* Disabled Submit */}
          <div className="pt-4 cursor-not-allowed col-span-2">
            <div className="w-fit">

            <VA_Button disabled type="button" className="w-full">
              Update Organization
            </VA_Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 border border-dashed rounded-lg text-center text-muted-foreground">
          No organization data available.
        </div>
      )}

      <Separator className="border-t border-border" />

      {/* Branch Settings */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-accent-foreground">
            Branch Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage individual locations and operational status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {branches.length > 0 ? (
            branches.map((branch) => (
              <BranchCard
                key={branch._id}
                branch={branch}
                updateMutation={updateBranchMutation}
              />
            ))
          ) : (
            <div className="py-12 text-center border-2 border-dashed rounded-2xl text-muted-foreground">
              <p>No branches associated with this organization yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrganizationSettings;