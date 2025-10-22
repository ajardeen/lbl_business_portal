import React, { useEffect, useState } from "react";
import { SiGoogleadsense } from "react-icons/si";
import { GoHomeFill } from "react-icons/go";
import Badge from "../../components/UI/Badge";
import { RiSettings3Fill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import SubMenu from "./SubMenu";

const sidebarLinks = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <GoHomeFill />,
  },
  {
    path: "/leads",
    name: "Leads",
    icon: <SiGoogleadsense />,
  },
  // {
  //   name: "Users",
  //   icon: <FaUsers />,
  //   subMenu: [
  //     {
  //       path: "/users",
  //       name: "User List",
  //     },
  //     {
  //       path: "/users/roles",
  //       name: "Roles",
  //     },
  //   ],
  // },
  {
    path: "/settings",
    name: "Settings",
    icon: <RiSettings3Fill />,
  },
];

function SideBar() {
  const [name, setName] = useState("admin");
  const [email, setEmail] = useState("admin@example.com");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-l-md shadow-md">
      {/* End Navigation Toggle */}

      {/* Sidebar */}
      <div
        id="hs-sidebar-content-push-to-mini-sidebar"
        className="hs-overlay [--auto-close:lg] hs-overlay-minified:w-13 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 bg-[#F3F5F7]
hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden overflow-x-hidden fixed lg:static top-0 start-0 bottom-0 z-60 bg-none border-e border-gray-200"
        role="dialog"
        tabindex="-1"
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full ">
          {/* Header */}
          <header className="py-4 px-2 flex justify-between items-center gap-x-2">
            <p
              className="flex justify-start w-full font-semibold text-2xl ml-3 text-black focus:outline-hidden focus:opacity-80 hs-overlay-minified:hidden"
              aria-label="Brand"
            >
              <img
                src="./images/LunchBoxLegends.svg"
                alt="logo"
                className="w-30"
              />{" "}
              
            </p>

            <div className="lg:hidden">
              {/* Close Button */}
              <button
                type="button"
                className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                data-hs-overlay="#hs-sidebar-content-push-to-mini-sidebar"
              >
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>
              {/* End Close Button */}
            </div>
            <div className="hidden lg:block">
              {/* Toggle Button */}
              <button
                type="button"
                className="flex justify-center items-center flex-none gap-x-3 size-9 text-sm hover:border hover:bg-[#fff] text-gray-600  rounded-full disabled:opacity-50 disabled:pointer-events-none "
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-sidebar-content-push-to-mini-sidebar"
                aria-label="Minify navigation"
                data-hs-overlay-minifier="#hs-sidebar-content-push-to-mini-sidebar"
              >
                <svg
                  className="hidden hs-overlay-minified:block shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m8 9 3 3-3 3" />
                </svg>
                <svg
                  className="hs-overlay-minified:hidden shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m10 15-3-3 3-3" />
                </svg>
                <span className="sr-only">Navigation Toggle</span>
              </button>
              {/* End Toggle Button */}
            </div>
          </header>
          {/* End Header */}

          {/* Profile Section */}
          <div className="p-1  border-b border-t border-gray-300">
            <div className="hs-dropdown [--strategy:absolute] [--auto-close:inside] relative w-full inline-flex">
              <button
                id="hs-sidebar-header-example-with-dropdown"
                type="button"
                className="w-full inline-flex shrink-0 items-center gap-x-2 p-2 text-start text-sm text-gray-800 rounded-md hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
              >
                <img
                  className="shrink-0 size-7 rounded-full min-w-fit"
                  src="/images/profilepic.webp"
                  alt="Avatar"
                />
                <div className="grow hs-overlay-minified:hidden">
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-500">{email}</p>
                </div>
              </button>
            </div>
          </div>
          {/* End Profile Section */}

          {/* Body */}
          <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div
              className="hs-accordion-group pb-0 px-2 pt-2 w-full flex flex-col flex-wrap"
              data-hs-accordion-always-open
            >
              <ul className="space-y-1">
                {sidebarLinks.map((link) => (
                  <SubMenu key={link.name} item={link} />
                ))}
              </ul>
            </div>
          </nav>
          {/* End Body */}
          {/* botton logo  */}
          <div className="flex flex-col justify-center items-center p-5 hs-overlay-minified:hidden">

            <img src="./images/vabooklogo.svg" alt="logo" className="w-40" />
            <span className="place-self-end mr-7">

            <Badge text="Beta v0.1" />
            </span>
          </div>
        </div>
      </div>
      {/* End Sidebar */}
    </div>
  );
}

export default SideBar;
