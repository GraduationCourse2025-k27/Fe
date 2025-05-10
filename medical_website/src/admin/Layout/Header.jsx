import React from "react";
import useTheme from "../hooks/useTheme";
import { Bell, ChevronsLeft, Moon, Search, Sun } from "lucide-react";
import PropTypes from "prop-types";
import account from "../../assets/account.png";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const Header = ({ collapsed, setCollapsed }) => {
  const { theme, setTheme } = useTheme();
  console.log("theme", theme);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-sm dark:bg-slate-900">
      <div className="flex items-center gap-x-3">
        <button
          className="btn-ghost size-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={collapsed && "rotate-180"} />
        </button>
        <div className="relative flex items-center rounded-md bg-slate-100 px-3 dark:bg-slate-800"></div>
      </div>

      <div className="relative flex items-center gap-x-3" ref={dropdownRef}>
        <button
          className="btn-ghost size-10"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun size={20} className="dark:hidden" />
          <Moon size={20} className="hidden dark:block" />
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="size-10 rounded-full border-2 border-slate-300 dark:border-slate-600"
          >
            <img
              src={account}
              alt="profile"
              className="h-full w-full rounded-full object-cover"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center gap-3 border-b px-4 py-3 dark:border-slate-700">
                <img
                  src={account}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    Mr.Tom
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    asdh@gmail.com
                  </p>
                </div>
              </div>
              <ul className="py-1 text-sm text-slate-700 dark:text-slate-200">
                <li>
                  <Link
                    to="/admin/profile-management"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    Quản lý tài khoản
                  </Link>
                </li>
                <li>
                  <button className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900">
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
