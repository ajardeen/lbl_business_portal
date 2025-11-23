const BranchView = ({ branch }) => (
  <div className="space-y-2 text-sm">
    <div className="grid grid-cols-2 gap-3">
      <p>
        <span className="font-medium">Branch Name:</span> {branch.branchName}
      </p>
      <p>
        <span className="font-medium">Branch Code:</span> {branch.branchCode}
      </p>
      <p>
        <span className="font-medium">Type:</span> {branch.branchType}
      </p>
      <p>
        <span className="font-medium">City:</span> {branch.city}
      </p>
      <p>
        <span className="font-medium">Country:</span> {branch.country}
      </p>
      <p>
        <span className="font-medium">Contact:</span> {branch.contactPhone}
      </p>
      <p>
        <span className="font-medium">Email:</span> {branch.contactEmail}
      </p>
      <p>
        <span className="font-medium">Status:</span> {branch.status}
      </p>
    </div>
  </div>
);
export default BranchView;