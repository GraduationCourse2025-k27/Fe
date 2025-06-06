import React, { useEffect, useState } from "react";
import * as appointmentService from "../service/admin/AppointmentService";
import { formatDate } from "../../validation/common/FormatDate";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const statusOptions = ["CONFIRMED", "COMPLETED", "CANCELLED", "PENDING"];

const getStatusStyle = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-green-100 text-green-600";
    case "COMPLETED":
      return "bg-yellow-100 text-yellow-600";
    case "CANCELLED":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsRefund, setAppointmentsRefund] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  //tinh toan phan trang
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(appointments)
    ? appointments.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(appointments)
    ? Math.ceil(appointments.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    const fecthDataAppointments = async () => {
      try {
        await Promise.all([getAllAppointments(), getAllAppointmentRefund()]);
      } catch (error) {
        console.error(error);
      }
    };
    fecthDataAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    console.log(newStatus);
    if (newStatus === "CONFIRMED") {
      await confrimAppointment(id);
    } else if (newStatus === "COMPLETED") {
      await completedAppointment(id);
    } else {
      return;
    }
  };

  const getAllAppointments = async () => {
    try {
      const response = await appointmentService.getAllAppointments();
      if (response) {
        setAppointments(response);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAppointmentRefund = async () => {
    try {
      const response = await appointmentService.getAllAppointmentsRefund();
      if (response) {
        setAppointmentsRefund(response);
      } else {
        setAppointmentsRefund([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confrimAppointment = async (idAppointment) => {
    try {
      const response = await appointmentService.appointmentConfirm(
        idAppointment
      );
      if (response) {
        await getAllAppointments();
        await getAllAppointmentRefund();
      } else {
        console.warn("Lỗi ! ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completedAppointment = async (idAppointment) => {
    try {
      const response = await appointmentService.appointmentCompleted(
        idAppointment
      );
      if (response) {
        await getAllAppointments();
        await getAllAppointmentRefund();
      } else {
        console.warn("Lỗi ! ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatTime(time) {
    if (typeof time === "string") {
      const parts = time.split(":");
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
    }
    return "";
  }

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <div className="flex flex-col gap-4 ml-8">
      <h2 className="text-2xl font-bold">Danh sách lịch hẹn</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-white border rounded h-[70vh] flex flex-col">
          <div className="flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-600 text-left text-sm">
                <tr>
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Email quản lý </th>
                  <th className="py-2 px-4">Tên người đặt</th>
                  <th className="py-2 px-4">Số điện thoại</th>
                  <th className="py-2 px-4">Lí do đặt khám </th>
                  <th className="py-2 px-4">Ngày sinh </th>
                  <th className="py-2 px-4">Ngày đặt khám</th>
                  <th className="py-2 px-4">Khung giờ khám</th>
                  <th className="py-2 px-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {records?.length > 0 ? (
                  records?.map((item, index) => (
                    <tr key={item.id} className="!border-t !border-gray-300">
                      <td className="py-2 px-4">{firstIndex + index + 1}</td>
                      <td className="py-2 px-4">{item?.email}</td>
                      <td className="py-2 px-4">{item?.fullName}</td>
                      <td className="py-2 px-4">{item?.phone}</td>
                      <td className="py-2 px-4">{item?.issueDescription}</td>
                      <td className="py-2 px-4">{item?.birthDate}</td>
                      <td className="py-2 px-4">
                        {item?.consulationSchedule?.dateAppointment}
                      </td>
                      <td className="py-2 px-4">
                        {formatTime(item?.consulationSchedule?.startTime)} -{" "}
                        {formatTime(item?.consulationSchedule?.endTime)}
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={item?.status}
                          onChange={(e) =>
                            handleStatusChange(item?.id, e.target.value)
                          }
                          className={`text-xs font-medium px-3 py-1 rounded-full appearance-none ${getStatusStyle(
                            item?.status
                          )} focus:outline-none`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      Không có lịch hẹn .
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
          {npage > 0 && (
            <ul className="pagination flex !justify-center items-center py-2 gap-2 border-t border-gray-200">
              {npage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link px-4 py-2 text-blue-900 flex items-center"
                    onClick={prePage}
                  >
                    <BiChevronLeft size={24} />
                  </button>
                </li>
              )}
              {numbers &&
                numbers.map((n) => (
                  <li className="page-item" key={n}>
                    <button
                      className={`page-link px-4 py-2 border rounded ${currentPage === n
                          ? "bg-blue-900 text-blue"
                          : "bg-white text-blue-900"
                        }`}
                      onClick={(e) => changePage(e, n)}
                    >
                      <span className="text-blue">{n}</span>
                    </button>
                  </li>
                ))}
              {npage > 1 && (
                <li className="page-item">
                  <button
                    className="page-link px-4 py-2 text-blue-900 flex items-center"
                    onClick={nextPage}
                  >
                    <BiChevronRight size={24} />
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>


      {/* Bảng lịch đã hủy */}
      <h2 className="text-2xl font-bold">Danh sách lịch đã hủy</h2>
      <div className="overflow-x-auto bg-white border rounded mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-50 text-red-700 text-left text-sm">
            <tr>
              <th className="py-3 px-4">STT</th>
              <th className="py-3 px-4">Email Quản lý</th>
              <th className="py-3 px-4">Tên Người Hủy</th>
              <th className="py-3 px-4">Ngày hủy</th>
              <th className="py-3 px-4">Lý do</th>
              <th className="py-3 px-4">Tiền gốc (VNĐ)</th>
              <th className="py-3 px-4">Hoàn tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointmentsRefund.map((item, index) => (
              <tr key={item.id} className="!border-t !border-gray-300">
                <td className="py-3 px-4">{firstIndex + index + 1}</td>
                <td className="py-3 px-4">
                  {item?.payment?.appointment?.email}
                </td>
                <td className="py-3 px-4">
                  {item?.payment?.appointment?.fullName}
                </td>
                <td className="py-3 px-4">{formatDate(item?.createAt)}</td>
                <td className="py-3 px-4">{item?.message || "Không có"}</td>
                <td className="py-3 px-4">
                  {item?.payment?.amount || "Không có"}
                </td>
                <td className="py-3 px-4">{item?.refund || "Không có"}</td>
              </tr>
            ))}
            {appointmentsRefund.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Không có lịch hẹn nào bị hủy.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;
