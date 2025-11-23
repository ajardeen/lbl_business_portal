
import {
  useBranches,
  useUpdateBranch,
} from "@/hooks/Settings/useBranch";
import BranchCard from "./components/BranchCard";


function OrganizationSettings() {
  const { data: branches = [], isLoading } = useBranches();
  const updateBranchMutation = useUpdateBranch();

  if (isLoading) {
    return <div className="text-sm text-gray-500 p-4">Loading branches...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 🏢 Organization section (keep untouched) */}
      <div className="border p-4 rounded-xl shadow-sm bg-background">
        <h2 className="text-lg font-semibold mb-2">Organization Settings</h2>
        <p className="text-sm text-gray-600">
          Manage your organization info and preferences here.
        </p>
      </div>

      {/* 🏬 Branch Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Branches</h2>

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
