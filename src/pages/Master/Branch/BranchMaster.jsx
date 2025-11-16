import VA_Button from "@/components/VAComponents/VA_Button";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Select from "@/components/VAComponents/VA_Select";

import React from "react";

function BranchMaster() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Branch Master</h2>
        <VA_Sheet
        title="Create Branch"
        className="min-w-[500px] "
        sheetContentClassName="px-4 py-2"
        description="Fill in the details to create a new branch."
        triggerComponent={<VA_Button>Create Branch</VA_Button>}
        sheetFooterComponent={
          <>
            <VA_Button>Submit</VA_Button>
            <VA_Button variant="outline">Cancel</VA_Button>
          </>
        }
      >
        {/* === FORM FIELDS === */}
        <form className="">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">

            <VA_FieldWrapper label="Branch Name" required>
              <VA_Input placeholder="Enter branch name" defaultValue="Main Virtual Kitchen" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Branch Code" required>
              <VA_Input placeholder="Enter branch code" defaultValue="MVK001" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Branch Type" required>
              <VA_Select
                options={[
                  { label: "Virtual", value: "virtual" },
                  { label: "Physical", value: "physical" },
                ]}
                placeholder="Select branch type"
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Phone Number" required>
              <VA_Input placeholder="9876543210" defaultValue="9876543210" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Email Address">
              <VA_Input placeholder="Enter email" defaultValue="mainkitchen@company.com" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Status">
              <VA_Select
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ]}
                placeholder="Select status"
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Street 1" required>
              <VA_Input placeholder="12th Cross Road" defaultValue="12th Cross Road" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Street 2">
              <VA_Input placeholder="Sector 2" defaultValue="Sector 2" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="City" required>
              <VA_Input placeholder="Chennai" defaultValue="Chennai" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="State" required>
              <VA_Input placeholder="Tamil Nadu" defaultValue="Tamil Nadu" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Country" required>
              <VA_Input placeholder="India" defaultValue="India" />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Zip Code" required>
              <VA_Input placeholder="600001" defaultValue="600001" />
            </VA_FieldWrapper>

          </div>
        </form>
      </VA_Sheet>
      </div>

      
    </div>
  );
}

export default BranchMaster;
