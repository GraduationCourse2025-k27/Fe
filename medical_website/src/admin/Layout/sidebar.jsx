import React from "react";
import { forwardRef } from "react";
import logoMedical from "../../assets/logo.png";
import { cn } from "../utils/cn";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants/index";
import { FaPlusCircle } from "react-icons/fa";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)]",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex items-center justify-center p-3 h-14">
        {collapsed ? (
          <FaPlusCircle className="h-8 w-8 text-blue-800" />
        ) : (
          <img
            src={logoMedical}
            alt="Logo"
            className="h-20 w-auto transition-all"
          />
        )}
      </div>

      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden justify-center items-center">
        {navbarLinks.map((navbarLink) => (
          <nav
            key={`group-${navbarLink.title}`}
            className={cn("sidebar-group", collapsed && "md:items-center")}
          >
            <p
              className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}
            >
              {navbarLink.title}
            </p>

            {navbarLink.links.map((link) => (
              <NavLink
                key={`link-${navbarLink.title}-${link.label}-${link.path}`}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-x-2 rounded-lg px-2 pt-2 text-sm hover:bg-blue-50 transition-colors duration-200",
                    collapsed && "justify-center md:w-[45px]",
                    isActive && "bg-blue-100 font-semibold text-blue-700",
                    " !no-underline"
                  )
                }
              >
                <link.icon size={22} className="flex-shrink-0" />
                {!collapsed && (
                  <p className="whitespace-nowrap">{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
