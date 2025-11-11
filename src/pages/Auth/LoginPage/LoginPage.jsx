import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../configs/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_Select from "@/components/VAComponents/VA_Select";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/_UItemp/card";
import { Lock, User } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === "admin") navigate("/dashboard");
    }
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.username,
        formData.password
      );
      const user = userCredential.user;

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();

        if (userData.role !== "admin" || formData.role !== "admin") {
          setErrors({ role: "Only admin users can access this portal" });
          toast.error("Currently Only admin users can access this portal");
          setLoading(false);
          return;
        }

        const userDataToStore = {
          uid: user.uid,
          email: user.email,
          role: userData.role,
          name: userData.name,
        };
        localStorage.setItem("user", JSON.stringify(userDataToStore));
        toast.success("Login successful!");

        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setErrors({ username: "No matching user found in database" });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      let errorMessage = "Invalid credentials";
      if (error.code === "auth/user-not-found") errorMessage = "User not found";
      if (error.code === "auth/wrong-password")
        errorMessage = "Incorrect password";
      setErrors({ password: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-muted dark:bg-background text-foreground">
      {/* Left Banner */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative">
        <img
          src="./images/loginScreenimg.webp"
          alt="Business Portal"
          className="object-cover w-full h-full"
        />
        <img
          src="./images/LunchBoxLegends.svg"
          alt="logo"
          className="absolute top-[50%] left-[50%] w-40 -translate-1/2"
        />
      </div>

      {/* Right: Login Card */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-12">
        <Card className="w-full max-w-md bg-background   border border-border shadow-sm backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <img
              src="./images/vabooknobg.svg"
              alt="valogo"
              className="w-44 mx-auto mb-2 bg-accent-foreground dark:bg-accent rounded-sm px-2"
            />
            {/* <CardTitle className="text-xl font-semibold">VA BOOK</CardTitle> */}
            <CardDescription className="text-sm text-muted-foreground">
              Sign in to access
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <VA_FieldWrapper
                label="Username (Email)"
                required
                error={errors.username}
              >
                <VA_Input
                  type="email"
                  placeholder="Enter your email"
                  icon={<User />}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </VA_FieldWrapper>

              {/* Password */}
              <VA_FieldWrapper
                label="Password"
                required
                error={errors.password}
              >
                <VA_Input
                  type="password"
                  icon={<Lock />}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </VA_FieldWrapper>

              {/* Role Select */}
              <VA_FieldWrapper label="Role" required error={errors.role}>
                <VA_Select
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Staff", value: "staff" },
                  ]}
                  value={formData.role}
                  onSelect={(val) => setFormData({ ...formData, role: val })}
                  placeholder="Select role"
                />
              </VA_FieldWrapper>

              {/* Submit */}
              <VA_Button
                type="submit"
                loading={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Logging in..." : "Login"}
              </VA_Button>
            </form>
          </CardContent>

          {/* <CardFooter className="text-center text-xs text-muted-foreground">
              <p>
                © {new Date().getFullYear()} LunchBox Legends. All rights reserved.
              </p>
            </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
