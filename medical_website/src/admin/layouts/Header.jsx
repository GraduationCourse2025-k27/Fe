import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import account from "../../assets/account.png";
import * as AccountService from "../../service/Auth/AuthApi";

export const Header = ({ collapsed, setCollapsed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const [name, setName] = useState(localStorage.getItem("fullName") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setEmail(localStorage.getItem("email") || null);
      setName(localStorage.getItem("fullName") || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    AccountService.logOut();
  };

  return (
    <header className="flex items-center justify-between h-[60px] px-4  border-b border-slate-200 relative z-50">
      {/* Toggle Sidebar */}
      <div className="flex items-center gap-x-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-10 h-10 flex items-center justify-center transition"
        >
          <ChevronsLeft
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* User Menu */}
      <div className="relative" ref={dropdownRef}>
        {/* Avatar button */}
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 overflow-hidden "
        >
          <img src={account} alt="User avatar" className="w-full h-full " />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-60 bg-white late-300 rounded-lg shadow-lg z-50 transform transition-all ease-in-out duration-200">
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-3 !border-b !border-slate-200">
              <img
                src={account}
                alt="Avatar"
                className="w-10 h-10  object-cover"
              />
              <div className="flex flex-col">
                <span className="text-md font-semibold !text-gray-800 ">
                  {name}
                </span>
                <span className="text-xs !text-gray-500 ">{email}</span>
              </div>
            </div>

            {/* Menu Options */}
            <ul className="py-1 text-sm">
              <li>
                <Link
                  to="/admin/profile-management"
                  className="!text-md !font-semibold block px-4 py-2 !text-gray-700 !no-underline "
                >
                  Quản lý tài khoản
                </Link>
              </li>
              <li>
                <button
                  className="!text-md !font-semibold text-left px-4 py-2 text-red-600 "
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
