import React from "react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import BranchView from "./BranchView";
import BranchEditForm from "./BranchEditForm";
import Badge from "@/components/ui/Badge";

const BranchCard = ({ branch, updateMutation }) => {
  return (
    <div className="border border-border rounded-xl bg-card p-4 shadow-sm hover:shadow-md transition-colors">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-base text-foreground">
          {branch.branchName}
        </h3>
        <Badge
          badgeClassName={`text-xs px-2 py-1 rounded-full uppercase ${
            branch.status === "active"
              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              : "bg-muted text-muted-foreground"
          }`}
          text={branch.status}
        />
      </div>

      {/* DETAILS */}
      <div className="text-xs grid grid-cols-2 gap-2 py-2 text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Code:</span>{" "}
          {branch.branchCode}
        </p>
        <p>
          <span className="font-medium text-foreground">Type:</span>{" "}
          {branch.branchType}
        </p>
        <p>
          <span className="font-medium text-foreground">City:</span>{" "}
          {branch.city}
        </p>
        <p>
          <span className="font-medium text-foreground">Country:</span>{" "}
          {branch.country}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-2 mt-4">
        {/* 🔹 View Sheet */}
        <VA_Sheet
          triggerComponent={
            <VA_Button variant="outline" size="sm">
              View
            </VA_Button>
          }
          title="View Branch Details"
          description="View branch information"
          className="min-w-[500px]"
        >
          <BranchView branch={branch} />
        </VA_Sheet>

        {/* 🔹 Edit Sheet */}
        <VA_Sheet
          triggerComponent={<VA_Button size="sm">Edit</VA_Button>}
          title="Edit Branch Details"
          description="Update branch information"
          className="min-w-[500px]"
          sheetFooterComponent={
            <div className="flex justify-end gap-2">
              <VA_Button
                type="submit"
                form={`edit-form-${branch._id}`}
                loading={updateMutation.isPending}
              >
                Update
              </VA_Button>
              <VA_Button variant="outline" type="button">
                Cancel
              </VA_Button>
            </div>
          }
        >
          <BranchEditForm branch={branch} updateMutation={updateMutation} />
        </VA_Sheet>
      </div>
    </div>
  );
};

export default BranchCard;
