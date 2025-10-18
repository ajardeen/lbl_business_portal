import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ item, isSubMenu = false }) => {
  const location = useLocation();
  const baseLinkClasses = `min-h-[36px] flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-black`;
  const activeLinkClasses = "bg-white shadow-md";
  const hoverClasses = "hover:bg-white/60 hover:shadow-sm";

  const isSubMenuActive =
    item.subMenu &&
    item.subMenu.some((subItem) => subItem.path === location.pathname);

  if (item.subMenu) {
    return (
      <li
        className={`hs-accordion ${isSubMenuActive ? "active" : ""}`}
        id={`${item.name}-accordion`}
      >
        <button
          type="button"
          className={`hs-accordion-toggle w-full text-start ${baseLinkClasses} ${hoverClasses} ${
            isSubMenuActive ? activeLinkClasses : ""
          }`}
        >
          {item.icon &&
            React.cloneElement(item.icon, {
              color: isSubMenuActive ? "rgb(0 118 255)" : "black",
            })}
          <span className="hs-overlay-minified:hidden">{item.name}</span>

          <svg
            className="hs-accordion-active:block ms-auto hidden size-4"
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
            <path d="m18 15-6-6-6 6" />
          </svg>
          <svg
            className="hs-accordion-active:hidden ms-auto block size-4"
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
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div
          id={`${item.name}-accordion-content`}
          className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
            isSubMenuActive ? "" : "hidden"
          }`}
        >
          <ul className="pt-2 ps-2">
            {item.subMenu.map((subItem) => (
              <SubMenu key={subItem.name} item={subItem} isSubMenu={true} />
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.path}
        end={item.path === "/dashboard"}
        className={({ isActive }) => {
          const finalClasses = `${baseLinkClasses} ${
            isSubMenu ? "ps-7" : ""
          } ${hoverClasses} ${isActive ? activeLinkClasses : ""}`;
          return finalClasses;
        }}
      >
        {({ isActive }) => (
          <>
            {item.icon &&
              React.cloneElement(item.icon, {
                color: isActive ? "rgb(0 118 255)" : "black",
              })}
            <span className="hs-overlay-minified:hidden">{item.name}</span>
          </>
        )}
      </NavLink>
    </li>
  );
};

export default SubMenu;
