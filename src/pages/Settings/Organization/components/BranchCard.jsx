import React from "react";
import VA_Sheet from "@/components/VAComponents/VA_Sheet";
import VA_Button from "@/components/VAComponents/VA_Button";
import BranchView from "./BranchView";
import BranchEditForm from "./BranchEditForm";
import Badge from "@/components/ui/Badge";
import { MapPin, Hash, Layers, Building2 } from "lucide-react";

const BranchCard = ({ branch, updateMutation }) => {
  return (
    <div className="w-full border border-border rounded-lg bg-background p-4 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* SECTION 1: IDENTITY */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground leading-none mb-1">
              {branch.branchName}
            </h3>
            <Badge
              badgeClassName={`text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold ${
                branch.status === "active"
                  ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900"
                  : "bg-muted text-muted-foreground"
              }`}
              text={branch.status}  
            />
          </div>
        </div>

        {/* SECTION 2: METADATA (Row Layout) */}
        <div className="flex-1 grid grid-cols-2 md:flex md:items-center gap-4 md:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Hash className="w-3.5 h-3.5 text-primary/60" />
            <span>{branch.branchCode}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-primary/60" />
            <span>{branch.branchType}</span>
          </div>
          <div className="flex items-center gap-2 md:ml-auto">
            <MapPin className="w-3.5 h-3.5 text-primary/60" />
            <span>{branch.city}, {branch.country}</span>
          </div>
        </div>

        {/* SECTION 3: ACTIONS */}
        <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0">
          <VA_Sheet
            triggerComponent={
              <VA_Button variant="ghost" size="sm" className="h-8 hover:bg-muted">
                View
              </VA_Button>
            }
            title="View Branch Details"
            description="Detailed information for this branch"
            className="min-w-[500px]"
          >
            <BranchView branch={branch} />
          </VA_Sheet>

          <VA_Sheet
            triggerComponent={
              <VA_Button size="sm" className="h-8 px-4">
                Edit
              </VA_Button>
            }
            title="Edit Branch"
            description="Update branch settings and location"
            className="min-w-[500px]"
            sheetFooterComponent={
              <div className="flex justify-end gap-2">
                <VA_Button variant="outline" type="button">
                  Cancel
                </VA_Button>
                <VA_Button
                  type="submit"
                  form={`edit-form-${branch._id}`}
                  loading={updateMutation.isPending}
                >
                  Save Changes
                </VA_Button>
              </div>
            }
          >
            <BranchEditForm branch={branch} updateMutation={updateMutation} />
          </VA_Sheet>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;