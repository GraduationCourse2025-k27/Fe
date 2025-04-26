import { FaUserMd, FaClock, FaCalendarAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import * as PaymentService from "../service/Payment/PaymentApi";
import { useState } from "react";
import SuccessMessage from "./SetSuccess";
const ConfirmAppointment = () => {
  const location = useLocation();
  const [payment, setPayment] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showMessage, setShowMessage] = useState(false);
  const [togglePayment, setTogglePayment] = useState(true);
  console.log(showMessage);

  const {
    patient,
    doctor,
    issueDescription,
    slotTime,
    dateAppointment,
    feeAppointment,
    appointmentId,
  } = location.state || {};
  console.log(payment);

  const handleSubmitPayment = async () => {
    if (paymentMethod === "cash") {
      const result = await PaymentService.paymentDirect(
        appointmentId,
        feeAppointment
      );
      setPayment(result);
      setShowMessage(true);
      setTogglePayment(false);
    } else if (paymentMethod === "online") {
      alert("Sẽ tích hợp sau");
    }
  };

  // if (!appointmentId) {
  //   return null;
  // }

  return (
    <div className="p-4 mt-5 pt-5 sm:p-8 max-w-4xl mx-auto">

{!showMessage && (
  <h4 className="text-xl sm:text-2xl font-bold mb-6">Lịch hẹn đã đặt</h4>
)}
      {togglePayment && (
        <div className="bg-white border rounded-2xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Icon + Khám */}
          <div className="flex flex-col items-center justify-center w-full sm:w-40 text-center border-b sm:border-b-0 sm:border-r pb-4 sm:pb-0 sm:pr-6 mb-4 sm:mb-0">
            <FaUserMd className="text-3xl sm:text-4xl text-blue-400 mb-2" />
            <div className="mt-3 text-xs sm:text-sm text-gray-700 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <FaClock className="text-blue-500 text-sm sm:text-base" />
                <span>{slotTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500 text-sm sm:text-base" />
                <span>{dateAppointment}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 pl-0 sm:pl-8">
            <p className="text-sm sm:text-base text-gray-800 mb-2">
              <span className="font-semibold">Bệnh nhân:</span> {patient}
            </p>
            <p className="text-sm sm:text-base text-gray-800 mb-2">
              <span className="font-semibold">Bác sĩ:</span>{" "}
              <span className="text-cyan-600 hover:underline cursor-pointer">
                {doctor}
              </span>
            </p>
            <p className="text-sm sm:text-base text-gray-800 mb-2">
              <span className="font-semibold">Nơi khám:</span> Hệ thống Y tế Thu
              Cúc cơ sở Thụy Khuê
            </p>
            <p className="text-sm sm:text-base text-gray-800 mb-3">
              <span className="font-semibold">Lý do khám:</span>{" "}
              {issueDescription}
            </p>
            <p className="text-sm sm:text-base text-gray-800 mb-3">
              <span className="font-semibold">Giá khám:</span> {feeAppointment}{" "}
              VND
            </p>

            <div className="mb-4">
              <p className="font-semibold text-sm sm:text-base mb-2">
                Chọn phương thức thanh toán:
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    id="cash"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">
                    Tiền mặt
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    id="online"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">
                    VN Pay
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmitPayment}
              className=" px-4 sm:px-5 py-2 bg-blue-500 text-white font-semibold text-sm sm:text-base rounded hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      )}
      <div>
        {showMessage && (
          <SuccessMessage
            message="Đặt lịch thành công"
            note="Chúng tôi sẽ gửi email xác nhận trong ít phút"
            autoClose={true}
          />
        )}
      </div>

      {/* Lưu ý Section */}
      {!showMessage && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
          <h5 className="font-semibold mb-3">Lưu ý:</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>Thanh toán trong 15 phút để giữ lịch hẹn.</li>
            <li>
              Cân nhắc kỹ trước khi chọn thanh toán không hỗ trợ hoàn tiền.
            </li>
            <li>
              Tránh nhấn 'Back' khi thanh toán để không mất quyền truy cập.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ConfirmAppointment;
