import RiderLayout from "./RiderLayout";
import { useAuth } from "@/context/AuthContext";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_FieldWrapper from "@/components/VAComponents/VA_FieldWrapper";
import VA_Input from "@/components/VAComponents/VA_Input";
import { Mail, User, Shield, Building2, Store } from "lucide-react";

const RiderProfile = () => {
  const { account } = useAuth();

  if (!account) return null;

  return (
    <RiderLayout>
      <div className=" p-6 w-full  bg-gray-50 min-h-screen">
        <div className="bg-white rounded-2xl shadow-sm p-2 space-y-6 h-full">
          <div className="text-start border-b pb-4">
            <h2 className="text-xl font-semibold">My Profile</h2>
          </div>

          <div className="space-y-4">
            <VA_FieldWrapper
              label="Full Name"
              icon={<User className="w-4 h-4" />}
            >
              <VA_Input value={account.name || ""} disabled />
            </VA_FieldWrapper>

            <VA_FieldWrapper
              label="Email Address"
              icon={<Mail className="w-4 h-4" />}
            >
              <VA_Input value={account.email || ""} disabled />
            </VA_FieldWrapper>

            <VA_FieldWrapper label="Role" icon={<Shield className="w-4 h-4" />}>
              <VA_Input value={account.role || ""} disabled />
            </VA_FieldWrapper>
          </div>

          {/* <div className="pt-4 border-t flex justify-end">
            <VA_Button
              onClick={() => console.log("Edit profile coming soon")}
              variant="outline"
            >
              Edit Profile
            </VA_Button>
          </div> */}
        </div>
      </div>
    </RiderLayout>
  );
};

export default RiderProfile;
