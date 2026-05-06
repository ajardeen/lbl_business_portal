import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginAccount, signupAccount } from "@/services/Auth/authService";

// LOGIN HOOK
export const useLoginAccount = () => {
  return useMutation({
    mutationFn: (payload) => {
      const promise = loginAccount(payload);

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Login successful!",
        error: (err) => err?.response?.data?.message || "Login failed",
        
      });

      return promise;
    },
    onSuccess: (data) => {
      const token = data?.data?.token;
      localStorage.setItem("userData", JSON.stringify(data.data));
      if (token) localStorage.setItem("token", token);
    },
  });
};

// SIGNUP HOOK
export const useSignupAccount = () => {
  return useMutation({
    mutationFn: (payload) => {
      const promise = signupAccount(payload);

      toast.promise(promise, {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (err) => err?.response?.data?.message || "Signup failed",
      });

      return promise;
    },
  });
};
