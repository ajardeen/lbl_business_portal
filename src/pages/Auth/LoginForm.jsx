import { useEffect, useState } from "react";
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
import { User, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLoginAccount } from "@/hooks/Auth/useAuth";
import { useAuth } from "@/context/AuthContext"; // ⬅️ new
import AuthPage from "./AuthPage";

function LoginForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth(); // ⬅️ new

  const [selectedRole, setSelectedRole] = useState(state?.role || null);

  useEffect(() => {
    if (state?.role) {
      setSelectedRole(state.role);
      setFormData((prev) => ({ ...prev, role: state.role }));
    } else {
      navigate("/");
    }
  }, [state]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: selectedRole,
  });

  const [errors, setErrors] = useState({});
  const loginMutation = useLoginAccount();

  const validate = () => {
    const ne = {};
    if (!formData.email) ne.email = "Email required";
    if (!formData.password) ne.password = "Password required";
    if (!formData.role) ne.role = "Select role";
    setErrors(ne);
    return Object.keys(ne).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    loginMutation.mutate(formData, {
      onSuccess: (res) => {
        login(res);        // ⬅️ stores token, account, org, branch in context + localStorage

        // Redirect logic
        if (!res.data.account.organizationId) {
          navigate("/organization/register");
          return;
        }

        navigate("/dashboard");
      },
      onError: (err) => console.log(err),
    });
  };

  return (
    <AuthPage>
      <Card className="w-full max-w-md bg-background border shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <img
            src="/images/vabooknobg.svg"
            className="w-44 mx-auto bg-accent-foreground dark:bg-accent px-2 rounded-sm"
          />
          <CardDescription>
            Sign in as {formData.role}
            <VA_Button variant="link" onClick={() => navigate("/")}>Switch</VA_Button>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <VA_FieldWrapper label="Email" error={errors.email} required>
              <VA_Input
                icon={<User />}
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Password" error={errors.password} required>
              <VA_Input
                type="password"
                icon={<Lock />}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </VA_FieldWrapper>

            <div className="flex flex-col gap-3">
              <VA_Button type="submit" loading={loginMutation.isPending} className="w-full">
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </VA_Button>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Separator className="max-w-[45%]" />
                <span className="px-2">OR</span>
                <Separator className="max-w-[45%]" />
              </div>

              <VA_Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
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
