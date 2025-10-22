import { useEffect, useState } from "react";
import * as Label from "@radix-ui/react-label";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../configs/firebase";
import { useNavigate } from "react-router-dom";
import "preline";
import { showToast } from "../../../components/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

        // Check role from Firestore
        if (userData.role !== "admin" || formData.role !== "admin") {
          setErrors({ role: "Only admin users can access this portal" });
          showToast({
            text: "Only admin users can access this portal",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            type: "error",
          });

          setLoading(false);
          return;
        }

        // Store user
        const userDataToStore = {
          uid: user.uid,
          email: user.email,
          role: userData.role,
          name: userData.name,
        };
        localStorage.setItem("user", JSON.stringify(userDataToStore));

        // Show Preline toast
        showToast({ text: "Login successful! Redirecting..." });

        // Wait 1.5 seconds then navigate
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
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
    <div className="flex min-h-screen bg-[#0F0F0F]">
      <div className="hidden lg:flex w-1/2 items-center justify-center p-4 relative">
        <img
          src="./images/loginScreenimg.webp"
          alt="Business Portal"
          className="object-cover w-full h-full"
        />
        <img src="./images/LunchBoxLegends.svg" alt="logo" className="absolute top-[50%] left-[50%] w-40 -translate-1/2" />
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-12 text-white">
        <div className="w-full max-w-md rounded-2xl p-8">
         
          <img src="./images/vabooknobg.svg" alt="valogo" className="w-80 place-self-center mb-10" />

          <form onSubmit={handleSubmit} className="space-y-5 mb-20">
            {/* Username */}
            <div>
              <Label.Root
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username (Email)
              </Label.Root>
              <input
                id="username"
                type="email"
                placeholder="Enter email"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full border rounded-lg px-4 py-3 bg-[#3C364C] text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.username ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label.Root
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </Label.Root>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full border rounded-lg px-4 py-3 bg-[#3C364C] text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-transparent"
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Role Dropdown */}
            <div>
              <Label.Root
                htmlFor="role"
                className="block text-sm font-medium mb-1"
              >
                Role
              </Label.Root>

              <Select.Root
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <Select.Trigger
                  className={`w-full flex items-center justify-between border rounded-lg px-4 py-3 bg-[#3C364C] text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.role ? "border-red-500" : "border-transparent"
                  }`}
                >
                  <Select.Value placeholder="Select role" />
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="overflow-hidden bg-[#3C364C] border border-gray-600 rounded-lg shadow-lg w-[var(--radix-select-trigger-width)]"
                    position="popper"
                    sideOffset={4}
                  >
                    <Select.Viewport className="p-1">
                      {["admin", "staff"].map((role) => (
                        <Select.Item
                          key={role}
                          value={role}
                          className="relative flex items-center select-none px-3 py-2 text-sm rounded-md text-white hover:bg-blue-600 cursor-pointer focus:bg-blue-600"
                        >
                          <Select.ItemText className="capitalize">
                            {role}
                          </Select.ItemText>
                          <Select.ItemIndicator className="absolute right-2">
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              {errors.role && (
                <p className="text-xs text-red-500 mt-1">{errors.role}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-sm transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2 ">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
