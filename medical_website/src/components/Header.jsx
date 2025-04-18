import React, { useState } from "react";
import logo from "../assets/logo.png";
import account from "../assets/account.png";
import nav from "../assets/nav.jpg";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../auth/Login";

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [isShowLogin, setIsShowLogin] = useState(false);

  const [openDropdowns, setOpenDropdowns] = useState({
    services: false,
    articles: false,
  });

  const toggleDropdown = (menu) => {
    setOpenDropdowns((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleCLoseLogin = () => {
    setIsShowLogin(false);
  };

  const serviceCategories = [
    {
      title: "GÓI KHÁM SỨC KHOẺ",
      items: [
        { name: "Khám chuyên khoa", path: "/kham-chuyen-khoa" },
        { name: "Khám tổng quát", path: "/kham-tong-quat" },
        { name: "Tầm soát ung thư", path: "/tam-soat-ung-thu" },
      ],
    },
    {
      title: "CHẨN ĐOÁN & CAN THIỆP",
      items: [
        { name: "Xét nghiệm", path: "/xet-nghiem" },
        { name: "Phẫu thuật", path: "/phau-thuat" },
        { name: "Siêu âm", path: "/sieu-am" },
      ],
    },
  ];

  const articleCategories = [
    {
      title: "TIN TỨC & SỰ KIỆN",
      items: [
        { name: "Cập nhật tin tức y tế", path: "/update-new" },
        { name: "Sự kiện và hội thảo chuyên đề", path: "/" },
        { name: "Thành tựu và nghiên cứu mới", path: "/" },
      ],
    },
    {
      title: "KIẾN THỨC Y KHOA",
      items: [
        { name: "Bệnh lý thường gặp", path: "/" },
        { name: "Hướng dẫn chăm sóc sức khỏe tại nhà", path: "/" },
        { name: "Chế độ dinh dưỡng & lối sống lành mạnh", path: "/" },
      ],
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 flex items-center justify-between ">
      <img
        onClick={() => navigate("/")}
        className="w-40 h-16 mb-3 ml-4 cursor-pointer"
        src={logo}
        alt="Logo"
      />
      <ul className="hidden lg:flex items-start gap-4 font-medium mr-25">
        <NavLink className="!no-underline" to="/">
          <li className="pt-2.5 pt-2.5 text-blue-900 text-lg font-bold hover:text-blue-500">
            TRANG CHỦ
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-400  m-auto hidden" />
        </NavLink>

        <NavLink className="!no-underline" to="/about">
          <li className="pt-2.5 text-blue-900 text-lg font-bold hover:text-blue-500">
            VỀ CHÚNG TÔI
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-400  m-auto hidden" />
        </NavLink>

        <NavLink className="!no-underline" to="/doctors">
          <li className="pt-2.5 text-blue-900 text-lg font-bold hover:text-blue-500">
            BÁC SĨ
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-400  m-auto hidden" />
        </NavLink>

        {/* DỊCH VỤ  */}
        <div className="relative group inline-block">
          <div className="flex items-center pt-[10px] text-blue-900 text-lg font-bold hover:text-blue-500 cursor-pointer">
            <span>DỊCH VỤ</span>
            <BiChevronDown className="w-5 h-5 text-blue-900" />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute left-[-400px] top-full w-[800px] bg-white shadow-lg hidden group-hover:block group-hover:pointer-events-auto z-50 p-4">
            <div className="grid grid-cols-[1.5fr_1fr_1.2fr] gap-2">
              {/* Cột 1 */}
              <div className="relative w-full h-[220px] flex flex-col justify-end p-4 bg-white">
                <div className="absolute inset-0">
                  <img
                    src={nav}
                    alt="Dịch vụ"
                    className="w-full h-full object-cover brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>
                <div className="relative z-10">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Bệnh viện Đa khoa Đà Nẵng đơn vị y tế hàng đầu, cung cấp
                    dịch vụ chăm sóc sức khỏe chuyên nghiệp, tận tâm và hiện
                    đại.
                  </p>
                </div>
              </div>

              {/* Render cột dịch vụ */}
              {serviceCategories.map((category, idx) => (
                <div key={idx} className="col-span-1 flex flex-col py-2">
                  <li className="pb-4 cursor-pointer font-semibold transition-colors">
                    {category.title}
                  </li>
                  <ul className="text-sm text-gray-700 flex flex-col items-start">
                    {category.items.map((item, index) => (
                      <li
                        key={item.path}
                        className="hover:text-blue-500 cursor-pointer"
                        onClick={() => navigate(item.path)}
                      >
                        {item.name}
                        {index < category.items.length - 1 && (
                          <hr className="w-full border-gray-300" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BÀI VIẾT  */}
        <div className="relative group inline-block">
          <NavLink
            to="/article"
            style={({ isActive }) => ({
              paddingTop: "10px",
              display: "flex",
              alignItems: "center",
              color: "rgba(var(--bs-link-color-rgb))",
              textDecoration: "none",
              borderBottom: isActive
                ? "2px solid rgba(96, 165, 250, 0.4)"
                : "none",
            })}
          >
            <span className="text-blue-900 text-lg font-bold ">BÀI VIẾT</span>
            <BiChevronDown className="w-5 h-5 text-blue-900 " />
          </NavLink>

          <div className="absolute left-0 w-85 bg-white shadow-lg hidden group-hover:block group-hover:pointer-events-auto z-50 p-2  ">
            <ul className="text-md text-gray-700">
              {articleCategories.map((category, idx) => (
                <div key={idx}>
                  <li
                    className="py-2 cursor-pointer text-md font-bold
                                        transition-colors"
                    onClick={() => navigate(category.path)}
                  >
                    {category.title}
                  </li>
                  {category.items.map((item, subIdx) => (
                    <li
                      key={subIdx}
                      className="pl-5 py-1 px-4 text-gray-600 text-sm cursor-pointer hover:text-blue-500 transition-all"
                      onClick={() => navigate(item.path)}
                    >
                      {item.name}
                      <hr className="w-full border-gray-300" />
                    </li>
                  ))}
                </div>
              ))}
            </ul>
          </div>
        </div>

        <NavLink className="!no-underline" to="/contact">
          <li className="pt-2.5 text-blue-900 text-lg font-bold hover:text-blue-500">
            LIÊN HỆ
          </li>
          <hr className="border-none outline-none h-0.5 bg-blue-400  m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {!token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative  ">
            <img className="w-8  rounded-full" src={account} alt="" />
            <BiChevronDown className="w-5 h-5 mr-4" />
            <div className="absolute top-2  right-0 text-base font-medium text-black-600 z-20 hidden group-hover:block">
              <div className="min-w-45 bg-white shadow-lg flex flex-col gap-2 p-4 mt-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:bg-blue-50 p-0.5 cursor-pointer font-semibold transition-colors"
                >
                  Trang cá nhân
                </p>
                <p
                  onClick={() => navigate("/my-appointment")}
                  className="hover:bg-blue-50 p-0.5 cursor-pointer font-semibold transition-colors"
                >
                  Cuộc hẹn{" "}
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="hover:bg-blue-50 p-0.5 cursor-pointer font-semibold transition-colors"
                >
                  Đăng xuất{" "}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="pb-2 mr-6">
            <button
              onClick={() => setIsShowLogin(true)}
              className="bg-blue-900 text-white px-6 py-2 rounded font-light hidden md:block"
            >
              {" "}
              Đăng Nhập
            </button>
          </div>
        )}
        <Login showModal={isShowLogin} handleClose={handleCLoseLogin} />

        {!token && (
          <div className="fixed top-5 right-15 md:hidden">
            <button
              onClick={() => setIsShowLogin(true)}
              className="px-4 py-2 rounded inline-block bg-blue-700  text-white text-center w-full"
            >
              Đăng ký
            </button>
          </div>
        )}
        <BiMenu
          onClick={() => setShowMenu(true)}
          className="w-8 h-8 mr-2  lg:hidden"
        />

        {/* Mobile menu */}
        <div
          className={`${
            showMenu ? "fixed w-full h-full" : "hidden"
          } lg:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}
        >
          <div className="flex justify-between items-center px-5 py-6">
            <img src={logo} alt="Logo" className="w-60 h-25" />
            <BiX
              onClick={() => setShowMenu(false)}
              className="w-8 h-8 cursor-pointer"
            />
          </div>
          <ul className="flex flex-col items-start gap-2 mt-2  text-lg font-medium ">
            <NavLink
              to="/"
              className="!no-underline !text-blue-900 text-2xl px-4 py-2 rounded inline-block"
            >
              TRANG CHỦ
            </NavLink>
            <NavLink
              to="/about"
              className="!no-underline !text-blue-900 text-2xl px-4 py-2 rounded inline-block"
            >
              VỀ CHÚNG TÔI
            </NavLink>
            <NavLink
              to="/doctors"
              className="!no-underline !text-blue-900 text-2xl px-4 py-2 rounded inline-block"
            >
              BÁC SĨ
            </NavLink>
            {/* DỊCH VỤ MOBILE*/}
            <div className="w-full">
              <div
                className="flex items-center cursor-pointer !text-blue-900 text-2xl gap-1 px-4 py-2 rounded inline-block"
                onClick={() => toggleDropdown("services")}
              >
                <span>DỊCH VỤ</span>
                <BiChevronDown
                  className={`w-5 h-5 transition-transform inline-block ${
                    openDropdowns.services ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`pl-4 mt-2 space-y-2 text-base transition-transform origin-top ${
                  openDropdowns.services
                    ? "scale-y-100 max-h-64 overflow-y-auto"
                    : "scale-y-0 max-h-0 overflow-hidden"
                } duration-300 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
              >
                {serviceCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-600">
                      {category.title}
                    </h3>
                    <ul className="pl-4 space-y-1 text-gray-600">
                      {category.items.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={item.path}
                          className="block !no-underline !text-gray-600 !hover:text-blue-500 transition-colors"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* BÀI VIẾT MOBILE */}
            <div className="w-full">
              <div
                className="flex items-center cursor-pointer !text-blue-900 text-2xl gap-1 px-4 py-2 rounded inline-block"
                onClick={() => toggleDropdown("articles")}
              >
                <span>BÀI VIẾT</span>
                <BiChevronDown
                  className={`w-5 h-5 transition-transform inline-block ${
                    openDropdowns.articles ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`pl-4 mt-2 space-y-2 text-base transition-transform origin-top ${
                  openDropdowns.articles
                    ? "scale-y-100 max-h-64 overflow-y-auto"
                    : "scale-y-0 max-h-0 overflow-hidden"
                } duration-300 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100`}
              >
                {articleCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-xs text-gray-600">{category.title}</h3>
                    <ul className="pl-4 space-y-1 text-gray-600">
                      {category.items.map((item, idx) => (
                        <NavLink
                          key={idx}
                          to={item.path}
                          className="block !no-underline !text-gray-600 !hover:text-blue-500 transition-colors"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <NavLink
              to="/contact"
              className="!no-underline text-2xl px-4 py-2 rounded inline-block !text-blue-900"
            >
              LIÊN HỆ
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
