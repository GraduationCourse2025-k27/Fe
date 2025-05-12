import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { navbarLinks } from "../constants";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    const baseAsideClass =
        "fixed z-[100] flex h-full flex-col overflow-x-hidden border-r border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900 transition-all duration-300 ease-in-out";
    const widthClass = collapsed ? "w-[70px] md:w-[80px]" : "w-[260px]";

    return (
        <aside ref={ref} className={`${baseAsideClass} ${widthClass}`}>
            {/* Logo */}
            <div className="flex items-center justify-center h-[70px]">
                <img src={logo} alt="Logo" className="w-full h-full object-contain px-2" />
            </div>

            {/* Menu */}
            <div className="flex flex-col gap-y-5 px-2 pt-3 overflow-y-auto">
                {navbarLinks.map((navbarLink, index) => (
                    <nav key={navbarLink.title + index} className="sidebar-group">
                        {!collapsed && (
                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 mb-1 ml-2">
                                {navbarLink.title}
                            </p>
                        )}

                        {navbarLink.links.map((link, linkIndex) => (
                            <NavLink
                                className="!no-underline"
                                key={`${navbarLink.title}-${link.label}-${linkIndex}`}
                                to={link.path}
                            >
                                {({ isActive }) => (
                                    <div
                                        className={`relative flex items-center rounded-md text-base font-poppins font-medium transition-all duration-300
                                            ${collapsed ? "justify-center p-2" : "gap-x-3 p-3 justify-start"}
                                            ${isActive ? "bg-blue-800 text-white" : "text-black hover:bg-blue-800 hover:text-white dark:hover:bg-blue-500 dark:text-white"}
                                        `}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={`transition-all duration-300 flex items-center justify-center ${
                                                collapsed ? "w-8 h-8" : "w-auto h-auto"
                                            }`}
                                        >
                                            <link.icon
                                                size={22}
                                                className={`transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600 dark:text-gray-200"}`}
                                            />
                                        </div>

                                        {/* Label (Text) */}
                                        <span
                                            className={`absolute left-[60px] transition-all duration-300 whitespace-nowrap overflow-hidden
                                                ${collapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[180px]"}
                                            `}
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

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
