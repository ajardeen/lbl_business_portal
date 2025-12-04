import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { setupAxiosInterceptor } from "@/configs/axios";
import { useBranches } from "@/hooks/Settings/useBranch";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [account, setAccount] = useState(null);

  // 🚀 Fetch branches only using organizationId header (branchId must NOT be sent yet)
  // Fetch branches ONLY after organizationId is available
  const shouldFetchBranches = !!organizationId;
  const { data: branches = [], isLoading: branchLoading } =
    useBranches(shouldFetchBranches);

    useEffect(()=>{
      console.log("organizationId",organizationId);
      console.log("branchId",branchId);
      

    },[organizationId,branchId])

  /** -------------------------------------
   🔄 Load saved login on first mount
   ------------------------------------- */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("authData"));
      if (saved) {
        setToken(saved.token);
        setAccount(saved.account);
        setOrganizationId(saved.organizationId);
        setBranchId(saved.branchId);
      }
    } catch (err) {
      console.error("Error parsing authData", err);
    }
  }, []);

  /** -------------------------------------
   💾 Save to localStorage on state update
   ------------------------------------- */
  useEffect(() => {
    if (token && account) {
      localStorage.setItem(
        "authData",
        JSON.stringify({
          token,
          role,
          account,
          organizationId,
          branchId,
        })
      );
    }
  }, [token, account, organizationId, branchId]);

  /** -------------------------------------
   🧠 Auto-select first branch after branch fetch
   ------------------------------------- */
  useEffect(() => {
    if (!branchId && branches.length > 0) {
      setBranchId(branches[0]._id); // first branch
    }
  }, [branches, branchId]);

  /** -------------------------------------
   🔑 Setup Axios Headers
   - Step 1: token + orgId until branches fetched
   - Step 2: token + orgId + branchId after branch selected
   ------------------------------------- */
  useEffect(() => {
    if (!token || !organizationId) return;

    setupAxiosInterceptor({
      token,
      organizationId,
      branchId: branchId || undefined, // send only if exists
    });
  }, [token, organizationId, branchId]);

  /** -------------------------------------
   🔐 Login
   ------------------------------------- */
  const login = (response) => {
    const { token, account } = response.data; // ⬅️ correct destructuring

    setToken(token);
    setAccount(account);
    setRole(account.role);
    setOrganizationId(account.organizationId);
    setBranchId(account.branchId || null); 
  };

  /** -------------------------------------
   🚪 Logout
   ------------------------------------- */
  const logout = () => {
    setToken(null);
    setAccount(null);
    setOrganizationId(null);
    setBranchId(null);
    localStorage.removeItem("authData");
  };

  /** -------------------------------------
   📦 Context Value
   ------------------------------------- */
  const value = useMemo(
    () => ({
      token,
      role,
      account,
      organizationId,
      branchId,
      branches,
      branchLoading,
      login,
      logout,
      setBranchId,
      isLoggedIn: !!token,
    }),
    [token, account, organizationId, branchId, branches, branchLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
