import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Button from "@/components/VAComponents/VA_Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { User, Lock, Building2, Check, ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLoginAccount } from "@/hooks/Auth/useAuth";
import { useAuth } from "@/context/AuthContext";
import AuthPage from "./AuthPage";
import { useOrganizations } from "@/hooks/Organization/useOrganization";

// UI Components for the "Command-like" Select
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function LoginForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  // Fetching Organizations
  const { data: orgsResponse, isLoading: isOrgsLoading } = useOrganizations();
  const organizations = orgsResponse || [];

  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(state?.role || null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: state?.role || "",
    organizationId: "", // Updated key name
  });

  const [errors, setErrors] = useState({});
  const loginMutation = useLoginAccount();

  useEffect(() => {
    if (state?.role) {
      setSelectedRole(state.role);
      setFormData((prev) => ({ ...prev, role: state.role }));
    } else {
      navigate("/");
    }
  }, [state, navigate]);

  const validate = () => {
    const ne = {};
    if (!formData.email) ne.email = "Email required";
    if (!formData.password) ne.password = "Password required";
    if (!formData.role) ne.role = "Select role";
    
    // Validation: Using organizationId
    if (formData.role !== "admin" && !formData.organizationId) {
      ne.organizationId = "Please select an organization";
    }
    setErrors(ne);
    return Object.keys(ne).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    loginMutation.mutate(formData, {
      onSuccess: (res) => {
        login(res);
        
        if (!res.data.account.organizationId && formData.role === "admin") {
          navigate("/organization/register", {
            state: {
              accountId: res.data.account._id || null,
              holderName: res.data.account.name,
              email: res.data.account.email,
            },
          });
          return;
        }
        const r = res.data.account.role;
        if (r === "admin") return navigate("/dashboard");
        if (r === "staff") return navigate("/cloud-kitchen/orders");
        if (r === "chef") return navigate("/cloud-kitchen/kdn");
        if (r === "rider") return navigate("/cloud-kitchen/rider");
      },
      onError: (err) => console.error(err),
    });
  };

  return (
    <AuthPage>
      <Card className="w-full max-w-md bg-background border shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <img
            src="/images/vabooknobg.svg"
            className="w-44 mx-auto bg-accent-foreground dark:bg-accent px-2 rounded-sm"
            alt="Logo"
          />
          <CardDescription>
            Sign in as{" "}
            <span className="font-bold capitalize">{formData.role}</span>
            <VA_Button variant="link" onClick={() => navigate("/")}>
              Switch
            </VA_Button>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {formData.role !== "admin" && (
              <VA_FieldWrapper
                label="Organization"
                error={errors.organizationId} // Updated key
                required
              >
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <VA_Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between font-normal"
                      disabled={isOrgsLoading}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 opacity-50" />
                        {/* Display logic: finding by _id */}
                        {formData.organizationId
                          ? organizations.find(
                              (org) => org._id === formData.organizationId,
                            )?.name
                          : "Select Organization..."}
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </VA_Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] p-0">
                    <Command>
                      <CommandInput placeholder="Search organization..." />
                      <CommandList>
                        <CommandEmpty>No organization found.</CommandEmpty>
                        <CommandGroup>
                          {organizations.map((org) => (
                            <CommandItem
                              key={org._id}
                              value={org.name}
                              onSelect={() => {
                                setFormData({
                                  ...formData,
                                  organizationId: org._id, // Assigning the API's _id
                                });
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.organizationId === org._id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {org.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </VA_FieldWrapper>
            )}

            <VA_FieldWrapper label="Email" error={errors.email} required>
              <VA_Input
                icon={<User />}
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Password" error={errors.password} required>
              <VA_Input
                type="password"
                icon={<Lock />}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </VA_FieldWrapper>

            <div className="flex flex-col gap-3">
              <VA_Button
                type="submit"
                loading={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </VA_Button>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Separator className="max-w-[45%]" />
                <span className="px-2">OR</span>
                <Separator className="max-w-[45%]" />
              </div>

              <VA_Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </VA_Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthPage>
  );
}

export default LoginForm;