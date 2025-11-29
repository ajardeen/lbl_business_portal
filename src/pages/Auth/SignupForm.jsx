import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Button from "@/components/VAComponents/VA_Button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useSignupAccount } from "@/hooks/Auth/useAuth";
import AuthPage from "./AuthPage";

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const signupMutation = useSignupAccount();

  const validate = () => {
    const ne = {};
    if (!formData.name) ne.name = "Name required";
    if (!formData.email) ne.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) ne.email = "Invalid email";
    if (!formData.password) ne.password = "Password required";
    if (formData.phone && !/^\d{10}$/.test(formData.phone))
      ne.phone = "Phone must be 10 digits";
    setErrors(ne);
    return Object.keys(ne).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    signupMutation.mutate(formData, {
      onSuccess: () => navigate("/login"),
      onError: (err) => console.log(err),
    });
  };

  return (
    <AuthPage>
      <Card className="w-full max-w-md bg-background border border-border shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <img
            src="/images/vabooknobg.svg"
            className="w-44 mx-auto bg-accent-foreground dark:bg-accent px-2 rounded-sm"
          />
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <VA_FieldWrapper label="Full Name" required error={errors.name}>
              <VA_Input
                type="text"
                icon={<User />}
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Email" required error={errors.email}>
              <VA_Input
                type="email"
                icon={<Mail />}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Phone" error={errors.phone}>
              <VA_Input
                type="text"
                icon={<Phone />}
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Password" required error={errors.password}>
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
                loading={signupMutation.isPending}
                className="w-full"
              >
                {signupMutation.isPending ? "Creating..." : "Sign Up"}
              </VA_Button>

              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <Separator className="max-w-[45%]" />
                <span className="px-2">OR</span>
                <Separator className="max-w-[45%]" />
              </div>

              <VA_Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </VA_Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthPage>
  );
}

export default SignupForm;
