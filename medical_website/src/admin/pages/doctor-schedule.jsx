import React, { useEffect, useState } from "react";
import * as DoctorService from "../service/admin/DoctorManagement";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

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

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [idDoctor, setIdDoctor] = useState(localStorage.getItem("id") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

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
    const handleStorageChange = () => {
      const newIdDoctor = localStorage.getItem("id") || "";
      setIdDoctor(newIdDoctor);
    };

    window.addEventListener("storage", handleStorageChange);

    const fetchAppointments = async () => {
      try {
        if (idDoctor) {
          await getAllAppointmentByDoctorId(idDoctor);
        } else {
          console.warn("Không tìm thấy idDoctor trong localStorage");
          setAppointments([]);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi loading lịch khám :", error);
      }
    };
    fetchAppointments();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (idDoctor) {
      getAllAppointmentByDoctorId(idDoctor);
      setCurrentPage(1);
    } else {
      setAppointments([]);
    }
  }, [idDoctor]);

  const formatTime = (time) => {
    if (typeof time === "string") {
      const parts = time.split(":");
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
    }
    return "";
  };

  const getAllAppointmentByDoctorId = async (idDoctor) => {
    try {
      const result = await DoctorService.getAppoinmentsByDoctorId(idDoctor);
      if (result) {
        setAppointments(result);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <h2 className="text-2xl font-bold">Lịch khám của tôi</h2>
      <div className="w-full max-w-6xl bg-white border rounded h-[65vh] flex flex-col">
        <div className="flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm">
              <tr>
                <th className="py-2 px-4">STT</th>
                <th className="py-2 px-4">Tên bệnh nhân</th>
                <th className="py-2 px-4">Số điện thoại</th>
                <th className="py-2 px-4">Lý do khám</th>
                <th className="py-2 px-4">Ngày sinh</th>
                <th className="py-2 px-4">Ngày hẹn</th>
                <th className="py-2 px-4">Khung giờ</th>
                <th className="py-2 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {records?.length > 0 ? (
                records?.map((item, index) => (
                  <tr key={item.id} className="!border-t !border-gray-300">
                    <td className="py-2 px-4">{index + 1}</td>
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
                    <td className="py- px-4">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    Không có lịch khám nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                  className={`page-link px-4 py-2 border rounded ${
                    currentPage === n
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
  );
};

export default DoctorSchedule;
