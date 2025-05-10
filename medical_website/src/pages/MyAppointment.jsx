import React, { useEffect, useState } from "react";
import * as AppointmentService from "../service/Appointment/AppointmentApi";
import { useNavigate } from "react-router-dom";
import ModalDeleteMyAppointment from "../Modals/ModalDeleteMyAppointment";

const MyAppointment = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [email, setEmail] = useState(() => localStorage.getItem("email"));
  const [appointments, setAppointments] = useState([]);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataCancelAppointment, setDataCancelAppointment] = useState({ id: 0, status: "" });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail !== email) {
        setEmail(storedEmail);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [email]);

  useEffect(() => {
    if (email != null) {
      handleCheckStatusAppointment();
    }
  }, [email]);

  const Condition = [
    { label: "Tất cả", name: "all" },
    { label: "Đang chờ xác nhận", name: "PENDING" },
    { label: "Đã xác nhận", name: "CONFIRMED" },
    { label: "Đánh giá", name: "COMPLETED" },
  ];

  const handleCheckStatusAppointment = async () => {
    try {
      const result = await AppointmentService.getAllAppointmentByEmail(email);
      setAppointments(result ?? []);
    } catch (error) {
      console.error("Lỗi khi tải lịch hẹn:", error);
    }
  };

  const handleCancelAppointment = (id, status) => {
    setDataCancelAppointment({ id, status });
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataCancelAppointment({ id: 0, status: "" });
  };

  const formatTime = (time) => {
    if (!time || typeof time !== "string") return "N/A";
    return time.length >= 5 ? time.slice(0, 5) : time;
  };

  const handleFeedBack = (doctorId) => {
    navigate(`/appointment/${doctorId}?showFeedBackForm=true`);
  };

  const filteredAppointments =
    selectedTab === "all"
      ? appointments.filter((item) => item.status !== "CANCELLED")
      : appointments.filter((item) => item.status === selectedTab);

  return (
    <div className="mt-5 py-5 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-5xl">
        <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:text-left">
          Lịch khám của tôi
        </h4>

        {/* Tabs điều hướng */}
        <div className="flex gap-4 overflow-x-auto border-b border-gray-300 mb-4 pb-2 scrollbar-hide">
          {Condition.map((tab, index) => (
            <p
              key={index}
              className={`min-w-fit cursor-pointer px-4 py-2 text-sm whitespace-nowrap border-b-2 transition ${
                selectedTab === tab.name
                  ? "border-blue-900 text-blue-900 font-semibold"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setSelectedTab(tab.name)}
            >
              {tab.label}
            </p>
          ))}
        </div>

        {/* Danh sách lịch hẹn */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              {selectedTab === "COMPLETED"
                ? "Không có đánh giá nào."
                : "Không có lịch hẹn nào."}
            </p>
          ) : (
            filteredAppointments.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-200 rounded-xl p-4"
              >
                {/*Ảnh bác sĩ*/}
                <img
                  src={item?.doctor?.imagePath}
                  alt={item?.doctor?.client?.fullName}
                  className="w-full h-50 sm:w-35 rounded-lg object-cover bg-gray-100"
                />
                {/* Thông tin */}
                <div className="flex-1 text-sm text-gray-700 space-y-0.5">
                  <p className="font-semibold text-base text-gray-800">
                    Tên bác sĩ : {item.doctor?.client?.fullName}
                  </p>
                  <p>Chuyên khoa : {item?.doctor?.speciality?.name}</p>
                  <p>
                    Thời gian:{" "}
                    <span className="font-medium text-gray-900">
                      {item?.consultationSchedule?.dateAppointment}
                    </span>
                  </p>
                  <p>
                    Khung giờ :
                    <span className="font-medium">
                      {formatTime(item?.consultationSchedule?.startTime)} -
                    </span>
                    <span className="font-medium">
                      {formatTime(item?.consultationSchedule?.endTime)}
                    </span>
                  </p>
                </div>

                {/* Nút hành động */}
                <div className="w-full sm:w-auto flex justify-end sm:justify-start">
                  {item.status === "COMPLETED" ? (
                    <button
                      onClick={() => handleFeedBack(item?.doctor?.id)}
                      className="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition"
                    >
                      Đánh giá
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleCancelAppointment(item?.appointment, item?.status)
                      }
                      disabled={!item?.appointment}
                      className="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white transition"
                    >
                      Hủy lịch khám
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal xác nhận hủy */}
        <ModalDeleteMyAppointment
          show={isShowModalDelete}
          dataDeleteAppointment={dataCancelAppointment}
          handleClose={handleClose}
          handleCheckStatusAppointment={handleCheckStatusAppointment}
        />
      </div>
    </div>
  );
};

export default MyAppointment;
