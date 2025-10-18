import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";

function TopNav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setUser(user.name);
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  const baseItemClassName =
    "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 cursor-pointer";

  const dropdownItems = [
    {
      name: "Profile",
      icon: <FaUser className="text-gray-500" />,
      className: "text-gray-700",
      onClick: () => console.log("Profile clicked"),
    },
    {
      name: "Settings",
      icon: <FaCog className="text-gray-500" />,
      className: "text-gray-700",
      onClick: () => console.log("Settings clicked"),
    },
    {
      type: "separator",
    },
    {
      name: "Logout",
      icon: <FaSignOutAlt className="text-red-500" />,
      className: "text-red-600",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="top-0 z-50 flex items-center justify-between bg-white shadow-md px-6 py-3">
      <h4 className="text-2xl font-bold text-gray-600">
        Hi <span className="text-xl text-black tracking-widest">{user && user}</span>{" "}
      </h4>
      {/* Avatar Dropdown */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="focus:outline-none">
            <img
              src="/images/profilepic.webp"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition"
            />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          side="bottom"
          align="end"
          className="w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50"
        >
          {dropdownItems.map((item, index) =>
            item.type === "separator" ? (
              <DropdownMenu.Separator
                key={`separator-${index}`}
                className="my-1 border-t border-gray-200"
              />
            ) : (
              <DropdownMenu.Item
                key={item.name}
                onClick={item.onClick}
                className={`${baseItemClassName} ${item.className || ""}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </DropdownMenu.Item>
            )
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}

export default TopNav;
