import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const SuccessMessage = ({
  message = "Đặt khám thành công!",
  note = "Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục.",
  autoClose = false,
  onClose,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center py-10"
    >
      <FaCheckCircle className="text-6xl text-green-500 mb-4 slow-bounce" />
      <p className="text-2xl font-semibold text-gray-700">{message}</p>
      <p className="mt-2 text-md text-gray-500 text-center max-w-md">{note}</p>
      <style jsx>{`
        @keyframes slowBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .slow-bounce {
          animation: slowBounce 2s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default SuccessMessage;