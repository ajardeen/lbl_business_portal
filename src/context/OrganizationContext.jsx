import { useOrganizationById } from "@/hooks/Organization/useOrganization";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import { setupAxiosInterceptor } from "@/configs/axios";

const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const [organizationId, setOrganizationId] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [branchIds, setBranchIds] = useState([]);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const {
    data: organizationData = {},
    error,
    isLoading,
  } = useOrganizationById(organizationId);

  // Effect to get organizationId from localStorage on initial mount
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.account && userData.account.organizationId) {
        setOrganizationId(userData.account.organizationId);
      }
    } catch (e) {
      console.error("Failed to parse user data from localStorage", e);
    }
  }, []);

  // Effect to process the fetched organization data
  useEffect(() => {
    if (organizationData && Object.keys(organizationData).length > 0) {
      // The data is coming inside a "0" key, so we access it directly.
      const orgData = organizationData[0];
      if (orgData) {
        const { accountId, branchIds, ...details } = orgData;
        setAccountId(accountId);
        setBranchIds(branchIds || []);
        setOrganizationDetails(details);
        // Set the first branch as selected by default
        if (branchIds && branchIds.length > 0) {
          setSelectedBranchId(branchIds[0]);
        }
      }
    }
  }, [organizationData]);

  // Effect to set up axios interceptor when IDs change
  useEffect(() => {
    if (organizationId && selectedBranchId) {
      setupAxiosInterceptor({ organizationId, branchId: selectedBranchId });
    }
  }, [organizationId, selectedBranchId]);

  const value = useMemo(
    () => ({
      organizationId,
      accountId,
      branchIds,
      organizationDetails,
      selectedBranchId,
      setSelectedBranchId, // Expose setter to allow changing the branch
      isLoading,
      error,
    }),
    [
      organizationId,
      accountId,
      branchIds,
      organizationDetails,
      selectedBranchId,
      setSelectedBranchId,
      isLoading,
      error,
    ]
  );

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganizationData = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};
