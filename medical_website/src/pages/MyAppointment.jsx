import React, { useState } from "react";
import Appointment from "./Appointment";

const MyAppointment = () => {
  const [selectedTab, setSelectedTab] = useState("Tất cả");

  // Dữ liệu lịch hẹn mẫu (bạn có thể thay bằng API thực tế)
  const appointments = [
    {
      id: 1,
      doctor: {
        name: "BS. Nguyễn Văn A",
        speciality: "Nội tổng quát",
        image:
          "https://bvdkgiadinh.com/wp-content/uploads/2023/03/Anh-bac-si-Web_ThS.-BS.-DOAN-TRONG-NGHIA-.jpg",
        address: "Bệnh viện Đa Khoa Đà Nẵng",
        fees: 300000,
      },
      time: "2025-05-12T09:00:00",
      status: "Chờ xác nhận",
    },
    {
      id: 2,
      doctor: {
        name: "BS. Trần Thị B",
        speciality: "Tai mũi họng",
        image:
          "https://bvdkgiadinh.com/wp-content/uploads/2023/03/Anh-bac-si-Web_ThS.-BS.-DOAN-TRONG-NGHIA-.jpg",
        address: "Bệnh viện Đa Khoa Đà Nẵng",
        fees: 350000,
      },
      time: "2025-05-14T15:30:00",
      status: "Đánh giá",
    },
    {
      id: 3,
      doctor: {
        name: "BS. Lê Văn C",
        speciality: "Da liễu",
        image:
          "https://bvdkgiadinh.com/wp-content/uploads/2023/03/Anh-bac-si-Web_ThS.-BS.-DOAN-TRONG-NGHIA-.jpg",
        address: "Bệnh viện Đa Khoa Đà Nẵng",
        fees: 250000,
      },
      time: "2025-05-10T08:00:00",
      status: "Đã hủy",
    },
    {
      id: 4,
      doctor: {
        name: "BS. Phạm Thị D",
        speciality: "Tim mạch",
        image:
          "https://bvdkgiadinh.com/wp-content/uploads/2023/03/Anh-bac-si-Web_ThS.-BS.-DOAN-TRONG-NGHIA-.jpg",
        address: "Bệnh viện Đa Khoa Đà Nẵng",
        fees: 400000,
      },
      time: "2025-05-20T10:00:00",
      status: "Lịch xác nhận",
    },
  ];

  const Condition = ["Tất cả", "Chờ xác nhận", "Lịch xác nhận", "Đánh giá"];

  const handleCheckStatusAppointment = async (id) => {};

  // Lọc theo tab
  const filteredAppointments =
    selectedTab === "Tất cả"
      ? appointments
      : appointments.filter((item) => item.status === selectedTab);

  return (
    <div className="mt-5 py-5 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Tiêu đề */}
        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:text-left">
          Lịch khám của tôi
        </h4>

        {/* Tabs điều hướng */}
        <div className="flex gap-4 overflow-x-auto border-b border-gray-300 mb-4 pb-2 scrollbar-hide">
          {Condition.map((tab) => (
            <p
              key={tab}
              className={`min-w-fit cursor-pointer px-4 py-2 text-sm whitespace-nowrap border-b-2 transition ${
                selectedTab === tab
                  ? "border-blue-900 text-blue-900 font-semibold"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>

        {/* Danh sách lịch hẹn */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              Không có lịch hẹn nào.
            </p>
          ) : (
            filteredAppointments.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-200 rounded-xl p-4"
              >
                {/* Ảnh bác sĩ */}
                <img
                  src={item.doctor.image}
                  alt={item.doctor.name}
                  className="w-full h-50 sm:w-35 rounded-lg object-cover bg-gray-100"
                />

                {/* Thông tin */}
                <div className="flex-1 text-sm text-gray-700 space-y-0.5">
                  <p className="font-semibold text-base text-gray-800">
                    {item.doctor.name}
                  </p>
                  <p>{item.doctor.speciality}</p>
                  <p>{item.doctor.address}</p>
                  <p>
                    Thời gian:{" "}
                    <span className="font-medium text-gray-900">
                      {new Date(item.time).toLocaleString("vi-VN")}
                    </span>
                  </p>
                  <p>
                    Giá khám:{" "}
                    <span className="text-orange-600 font-semibold">
                      ₫{item.doctor.fees.toLocaleString()}
                    </span>
                  </p>
                </div>

                {/* Nút hủy */}
                <div className="w-full sm:w-auto flex justify-end sm:justify-start">
                  <button className="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white transition">
                    Hủy lịch khám
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
