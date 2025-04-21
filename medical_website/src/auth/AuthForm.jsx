import React, { useEffect, useState } from "react";
import {
  BiUser,
  BiEnvelope,
  BiMap,
  BiPhone,
  BiLock,
  BiShow,
  BiHide,
  BiX,
} from "react-icons/bi";
import * as LoginService from "../service/Auth/AuthApi";
import {
  emailRegex,
  nameRegex,
  phoneRegex,
} from "../validation/Login/LoginValidation";
import { toast, ToastContainer } from "react-toastify";
import BannerAuth from "../components/BannerAuth";

export const AuthForm = ({ showModal, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [errorPassword, setErrorPassWord] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorPassWord("");
      setErrorEmail("");
      setErrorName("");
      setErrorPhone("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorPassword, errorEmail, errorName, errorPhone]);

  const handleCheckEmailExisting = async (email) => {
    try {
      const response = await LoginService.checkEmailExisting(email);
      return response === 200;
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = (isLoginForm) => {
    if (isLoginForm) {
      setShowLoginPassword(!showLoginPassword);
    } else {
      setShowRegisterPassword(!showRegisterPassword);
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    const clearForm = {
      fullName: "",
      email: "",
      address: "",
      phone: "",
      password: "",
    };
    setRegisterData(clearForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmail = await handleCheckEmailExisting(registerData.email.trim());
    if (!nameRegex.test(registerData.fullName.trim())) {
      setErrorName(
        "Nhập sai định dạng tên , định dạng tên đúng : Nguyễn Văn Kiều My(Không chứa kí tự số và không ít hơn 1 chữ)"
      );
      return;
    }
    if (!emailRegex.test(registerData.email.trim())) {
      setErrorEmail("Nhập sai định dạng email,email đúng : abc@gmail.com");
      return;
    }
    if (isEmail) {
      console.log(123);
      setErrorEmail("Email này đã tồn tại");
      return;
    }
    if (!phoneRegex.test(registerData.phone.trim())) {
      setErrorPhone(
        "Nhập sai định dạng số điện thoại , SĐT đúng : 0931234567 (10 số) và phải bắt đầu bằng 0 hoặc +84"
      );
      return;
    }

    if (!isLogin) {
      if (registerData.password !== confirmPassword) {
        setErrorPassWord("Mật Khẩu và xác nhận mật khẩu không khớp");
        return;
      }
    }
    try {
      const status = await LoginService.register(registerData);
      if (status === 200) {
        toast.success(" Đăng kí thành công  !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearForm();
        setTimeout(handleClose, 1000);
      } else {
        clearForm();
        toast.error("Đăng kí thất bại, vui lòng thử lại !");
      }
    } catch (error) {
      clearForm();
      console.log(error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-full h-170 max-w-4xl bg-white rounded-xl p-10 overflow-hidden">
        {/* SVG Background Image */}
        <div>
          <BannerAuth />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <BiX className="w-6 h-6" />
        </button>
        {/* Form Container */}
        <div className="relative z-10 w-full rounded-xl p-6">
          {/* LOGIN FORM */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${isLogin && !isForgotPassword
              ? "opacity-100 translate-x-0 z-20"
              : isForgotPassword
                ? "opacity-0 -translate-x-60 pointer-events-none z-10"
                : "opacity-0 translate-x-60 pointer-events-none z-10"
              }`}
          >
            <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
              Đăng nhập vào tài khoản của bạn
            </h4>

            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder=" "
                  className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                />
                <label
                  className="absolute left-10 pointer-events-none top-0.5 font-bold text-gray-500 text-xs transition-all duration-300 
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
        peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500"
                >
                  Email
                </label>
                <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              </div>

              {/* Password */}
              <div className="relative max-w-md w-full">
                {/* Input Password */}
                <input
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder=" "
                  className="peer w-full px-10 pr-12 py-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                />

                {/* Label */}
                <label
                  className="absolute left-10 top-3 font-bold text-gray-500 text-xs transition-all duration-300 
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
                >
                  Mật khẩu
                </label>

                {/* Lock Icon */}
                <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

                {/* Toggle Show/Hide Password */}
                {showLoginPassword ? (
                  <BiShow
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                    onClick={() => togglePasswordVisibility(true)}
                  />
                ) : (
                  <BiHide
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                    onClick={() => togglePasswordVisibility(true)}
                  />
                )}
              </div>

            </div>

            <p>
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:text-blue-600 mt-3 !text-sm font-semibold"
              >
                Quên mật khẩu?
              </button>
            </p>

            <button className="w-full  bg-blue-500 max-w-md text-white py-2 rounded hover:bg-blue-900 font-semibold text-sm">
              Đăng nhập
            </button>

            <div className="mt-6">
              <p className="text-center max-w-md text-sm text-gray-600 font-semibold mb-2">
                Hoặc đăng nhập bằng
              </p>
              <div className="flex justify-center max-w-md">
                <a
                  href="#"
                  className="bg-white hover:-translate-y-1 transition-all"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/640px-Google_2015_logo.svg.png"
                    alt="Google"
                    className="w-full h-6"
                  />
                </a>
              </div>
            </div>

            <p className="text-center text-sm mt-2 max-w-md">
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Tạo tài khoản
              </button>
            </p>
          </div>

          {/* REGISTER FORM */}
          <form onSubmit={handleSubmit}>
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${!isLogin && !isForgotPassword
                ? "opacity-100 translate-x-0 z-20"
                : "opacity-0 -translate-x-60 pointer-events-none z-10"
                }`}
            >
              <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
                Tạo tài khoản mới
              </h4>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 pointer-events-none top-0.5 font-bold text-gray-500 text-xs transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Họ và tên
                  </label>
                  <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                </div>
                {errorName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "-10px",
                    }}
                  >
                    {errorName}
                  </p>
                )}

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 pointer-events-none top-0.5 font-bold text-gray-500 text-xs transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Email
                  </label>
                  <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                </div>
                {errorEmail && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "-10px",
                    }}
                  >
                    {errorEmail}
                  </p>
                )}

                {/* Address */}
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={registerData.address}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 pointer-events-none top-0.5 text-xs font-bold text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Địa chỉ
                  </label>
                  <BiMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                </div>

                {/* Phone */}
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 pointer-events-none top-0.5 font-bold text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Số điện thoại
                  </label>
                  <BiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                </div>

                {errorPhone && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "-10px",
                    }}
                  >
                    {errorPhone}
                  </p>
                )}

                {/* Password */}

                <div className="relative max-w-md w-full">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    name="password"
                    value={registerData.password}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="peer w-full px-10 pr-12 py-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 top-3 font-bold text-xs text-gray-500 transition-all duration-300 
    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                    Mật khẩu
                  </label>
                  <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                  {showRegisterPassword ? (
                    <BiShow
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                      onClick={() => togglePasswordVisibility(false)}
                    />
                  ) : (
                    <BiHide
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                      onClick={() => togglePasswordVisibility(false)}
                    />
                  )}
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="relative max-w-md w-full mt-4">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder=" "
                    className="peer w-full px-10 py-3 pr-12 bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  />
                  <label className="absolute left-10 top-3 font-bold text-xs text-gray-500 transition-all duration-300 
    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                    Xác nhận mật khẩu
                  </label>
                  <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                </div>

                {errorPassword && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginTop: "-10px",
                    }}
                  >
                    {errorPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-blue-500 max-w-md text-white py-2 rounded hover:bg-blue-900 transition-all font-semibold text-sm"
              >
                Tạo tài khoản
              </button>

              <p className="text-center text-sm mt-2 max-w-md">
                Đã có tài khoản?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 hover:text-blue-900 font-semibold"
                >
                  Đăng nhập
                </button>
              </p>
            </div>
          </form>

          {/* FORGOT PASSWORD FORM */}
          <div
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${isForgotPassword
              ? "opacity-100 translate-x-0 z-20"
              : "opacity-0 translate-x-60 pointer-events-none z-10"
              }`}
          >
            <h4 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
              Quên mật khẩu
            </h4>

            <div className="space-y-4">
              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  name="forgotEmail"
                  placeholder=" "
                  className="peer w-full px-10 py-3 max-w-md bg-gray-100 rounded-lg focus:ring focus:ring-blue-500 text-sm font-semibold"
                  required
                />
                <label className="absolute left-10 pointer-events-none top-0.5 font-bold text-xs text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                  Email
                </label>
                <BiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-500 max-w-md text-white py-2 rounded hover:bg-blue-900 font-semibold text-sm">
              Gửi liên kết đặt lại mật khẩu
            </button>

            <p className="text-center text-sm mt-4 max-w-md">
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setIsLogin(true);
                }}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Quay lại đăng nhập
              </button>
            </p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
