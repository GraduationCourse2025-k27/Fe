import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeft } from "lucide-react";
import PropTypes from "prop-types";
import account from "../../assets/account.png";
import { Link } from "react-router-dom";
import "../Header.css";  // Import file CSS riêng

export const Header = ({ collapsed, setCollapsed }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* Nút thu gọn sidebar */}
      <div className="header-left">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronsLeft className={`chevron-icon ${collapsed ? "rotate" : ""}`} />
        </button>
      </div>

      {/* Avatar + Dropdown */}
      <div className="avatar-dropdown" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="avatar-btn"
        >
          <img className="avatar-img" src={account} alt="Avatar" />
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {/* Thông tin user */}
            <div className="user-info">
              <img src={account} alt="Avatar" className="user-avatar" />
              <div>
                <p className="user-name">Mr.Tom</p>
                <p className="user-email">asdh@gmail.com</p>
              </div>
            </div>

            {/* Menu items */}
            <ul className="menu-items">
              <li>
                <Link to="/admin/profile-management" className="menu-item">
                  Quản lý tài khoản
                </Link>
              </li>
              <li>
                <button className="logout-btn">
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
