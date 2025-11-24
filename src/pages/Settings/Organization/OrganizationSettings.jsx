
import {
  useBranches,
  useUpdateBranch,
} from "@/hooks/Settings/useBranch";
import BranchCard from "./components/BranchCard";
import { Separator } from "@/components/ui/separator";


function OrganizationSettings() {
  const { data: branches = [], isLoading } = useBranches();
  const updateBranchMutation = useUpdateBranch();

  if (isLoading) {
    return <div className="text-sm text-gray-500 p-4">Loading branches...</div>;
  }

  return (
    <div className="max-w-xl p-1 space-y-6">
      <h2 className="text-2xl font-semibold text-accent-foreground">
        Organization Settings
      </h2>
      <Separator className="border-t border-border" />

      {/* 🏬 Branch Settings */}
      <div className="max-w-xl p-1 space-y-6">
      <h2 className="text-2xl font-semibold text-accent-foreground">
        Branch Settings
      </h2>
      <Separator className="border-t border-border" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <BranchCard
              key={branch._id}
              branch={branch}
              updateMutation={updateBranchMutation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrganizationSettings;
