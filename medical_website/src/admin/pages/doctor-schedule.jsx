import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Dữ liệu giả
    const mockData = [
      {
        id: 1,
        fullName: "Nguyễn Văn A",
        phone: "0912345678",
        issueDescription: "Đau đầu kéo dài",
        birthDate: "1990-01-15",
        status: "CONFIRMED",
        consulationSchedule: {
          dateAppointment: "2025-05-20",
          startTime: "08:30:00",
          endTime: "09:00:00",
        },
      },
      {
        id: 2,
        fullName: "Trần Thị B",
        phone: "0987654321",
        issueDescription: "Khám tổng quát",
        birthDate: "1985-11-02",
        status: "COMPLETED",
        consulationSchedule: {
          dateAppointment: "2025-05-18",
          startTime: "10:00:00",
          endTime: "10:30:00",
        },
      },
    ];

    setAppointments(mockData);
  }, []);

  const formatTime = (time) => {
    if (typeof time === "string") {
      const parts = time.split(":");
      if (parts.length >= 2) {
        return `${parts[0]}:${parts[1]}`;
      }
    }
    return "";
  };

  return (
    <div className="flex flex-col gap-4 ml-8">
      <h2 className="text-2xl font-bold">Lịch khám của tôi</h2>
      <div className="overflow-x-auto bg-white border rounded mb-8 mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-600 text-left text-sm">
            <tr>
              <th className="py-3 px-4">STT</th>
              <th className="py-3 px-4">Tên bệnh nhân</th>
              <th className="py-3 px-4">Số điện thoại</th>
              <th className="py-3 px-4">Lý do khám</th>
              <th className="py-3 px-4">Ngày sinh</th>
              <th className="py-3 px-4">Ngày hẹn</th>
              <th className="py-3 px-4">Khung giờ</th>
              <th className="py-3 px-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.length > 0 ? (
              appointments.map((item, index) => (
                <tr key={item.id} className="!border-t !border-gray-300">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{item.fullName}</td>
                  <td className="py-3 px-4">{item.phone}</td>
                  <td className="py-3 px-4">{item.issueDescription}</td>
                  <td className="py-3 px-4">{item.birthDate}</td>
                  <td className="py-3 px-4">
                    {item.consulationSchedule?.dateAppointment}
                  </td>
                  <td className="py-3 px-4">
                    {formatTime(item.consulationSchedule?.startTime)} -{" "}
                    {formatTime(item.consulationSchedule?.endTime)}
                  </td>
                  <td className="py-3 px-4">
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
  );
};

export default DoctorSchedule;
