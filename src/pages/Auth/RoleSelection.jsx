import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VA_Button from "@/components/VAComponents/VA_Button";
import VA_Toast from "@/components/VAComponents/VA_Toast";
import { Bike, Shield, Users, Utensils } from "lucide-react";

const roles = [
  { key: "admin", label: "Admin", icon: Shield, access: "allowed" },
  { key: "staff", label: "Staff", icon: Users, access: "denied" },
  { key: "chef", label: "Chef", icon: Utensils, access: "allowed" }, // temporarily disabled
  { key: "rider", label: "Rider", icon: Bike, access: "allowed" },
];

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedRole) {
      VA_Toast.error("Please select a role before continuing.");
      return;
    }
    navigate("/login", { state: { role: selectedRole } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/90 relative overflow-hidden">
      <div className="rounded-3xl p-10 w-full max-w-3xl text-center relative z-10">
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          What's Your Role?
        </h1>
        <p className="text-gray-500 mb-10">
          Please select your role to continue.
        </p>

        {/* role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {roles.map(({ key, label, icon: Icon, access }) => {
            const isSelected = selectedRole === key;
            const isDisabled = access === "denied";

            return (
              <div
                key={key}
                onClick={() => !isDisabled && setSelectedRole(key)}
                className={`group relative rounded-2xl border-2 p-8 flex flex-col items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${
                    isDisabled
                      ? "opacity-50 !cursor-not-allowed bg-gray-100 border-gray-200"
                      : isSelected
                      ? "border-blue-600 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-sm"
                  }`}
              >
                <div
                  className={`mb-4 p-4 rounded-full border transition-all duration-300
                    ${
                      isDisabled
                        ? "border-gray-300 text-gray-400"
                        : isSelected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-600 group-hover:text-blue-600"
                    }`}
                >
                  <Icon size={28} />
                </div>

                <h3
                  className={`text-lg font-medium transition-colors
                    ${
                      isDisabled
                        ? "text-gray-400"
                        : isSelected
                        ? "text-blue-600"
                        : "text-gray-700 group-hover:text-blue-600"
                    }`}
                >
                  {label}
                </h3>

                {isSelected && !isDisabled && (
                  <div className="absolute -top-3  bg-blue-600 text-white rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}

                {/* disabled overlay */}
                {isDisabled && (
                  <div className="absolute inset-0 bg-gray-100/50 rounded-2xl flex items-center justify-center text-sm text-gray-500 font-medium">
                    {/* Access Denied */}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* continue button */}
        <VA_Button
          size="lg"
          onClick={() => handleContinue()}
          disabled={!selectedRole}
          className="mx-auto w-40"
        >
          Continue
        </VA_Button>
      </div>
    </div>
  );
};

export default RoleSelect;
