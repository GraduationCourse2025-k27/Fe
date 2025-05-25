import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { navbarLinksDoctor } from "../constants";

export const SideBarDoctor = forwardRef(({ collapsed }, ref) => {
  const baseAsideClass =
    "fixed z-[100] flex h-full flex-col overflow-x-hidden border-r border-slate-300 bg-white transition-all duration-300 ease-in-out";
  const widthClass = collapsed ? "w-[70px] md:w-[80px]" : "w-[260px]";

  return (
    <aside ref={ref} className={`${baseAsideClass} ${widthClass}`}>
      {/* Logo */}
      <div className="flex items-center justify-center h-[63px] border-b border-slate-200">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-full object-contain px-2"
        />
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-y-5 px-2 pt-4 overflow-y-auto">
        {navbarLinksDoctor.map((navbarLink, index) => (
          <nav key={navbarLink.title + index} className="sidebar-group">
            {!collapsed && (
              <p className="text-xs font-semibold text-gray-500 mb-2 ml-2">
                {navbarLink.title}
              </p>
            )}

            {navbarLink.links.map((link, linkIndex) => (
              <NavLink
                key={`${navbarLink.title}-${link.label}-${linkIndex}`}
                to={link.path}
                className="!no-underline"
              >
                {({ isActive }) => (
                  <div
                    className={`relative flex items-center rounded-md text-base font-medium transition-all duration-300
                      ${
                        collapsed
                          ? "justify-center p-2"
                          : "gap-x-3 p-3 justify-start"
                      }
                      ${
                        isActive
                          ? "bg-blue-800 text-white"
                          : "text-black hover:bg-blue-800 hover:text-white"
                      }
                    `}
                  >
                    <link.icon
                      size={22}
                      className={`transition-colors duration-300 ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    />
                    <span
                      className={`transition-all duration-300 whitespace-nowrap overflow-hidden
                        ${
                          collapsed
                            ? "opacity-0 max-w-0"
                            : "opacity-100 max-w-[180px]"
                        }`}
                    >
                      {link.label}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

SideBarDoctor.displayName = "SideBarDoctor";

SideBarDoctor.propTypes = {
  collapsed: PropTypes.bool,
};
