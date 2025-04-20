import { FaUserMd, FaClock, FaCalendarAlt } from "react-icons/fa";

const ConfirmAppointment = () => {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h4 className="text-xl sm:text-2xl font-bold mb-6">Lịch hẹn đã đặt</h4>
      <div className="bg-white border rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* Icon + Khám */}
        <div className="flex flex-col items-center justify-center w-full sm:w-40 text-center border-b sm:border-b-0 sm:border-r pb-4 sm:pb-0 sm:pr-6 mb-4 sm:mb-0">
          <FaUserMd className="text-3xl sm:text-4xl text-blue-400 mb-2" />
          <div className="mt-3 text-xs sm:text-sm text-gray- traumatic flex flex-col items-center">
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500 text-sm sm:text-base" />
              <span>14:00-14:30</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaCalendarAlt className="text-blue-500 text-sm sm:text-base" />
              <span>10/04/2025</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 pl-0 sm:pl-8">
          <p className="text-sm sm:text-base text-gray-800 mb-1">
            <span className="font-semibold">Bệnh nhân:</span> Lê
          </p>
          <p className="text-sm sm:text-base text-gray-800 mb-1">
            <span className="font-semibold">Bác sĩ:</span>{" "}
            <span className="text-cyan-600 hover:underline cursor-pointer">
              Tiến sĩ, Bác sĩ Nguyễn Văn Doanh
            </span>
          </p>
          <p className="text-sm sm:text-base text-gray-800 mb-1">
            <span className="font-semibold">Nơi khám:</span> Hệ thống Y tế Thu Cúc cơ sở Thụy Khuê
          </p>
          <p className="text-sm sm:text-base text-gray-800 mb-3">
            <span className="font-semibold">Lý do khám:</span> abc
          </p>
          <button className="mt-1 px-4 sm:px-5 py-2 bg-blue-400 text-white font-semibold text-sm sm:text-base rounded hover:bg-blue-900 transition w-full sm:w-auto">
            Thanh toán VN Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAppointment;