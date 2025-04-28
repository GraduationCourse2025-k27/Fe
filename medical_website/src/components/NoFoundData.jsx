import React from "react";
import { motion } from "framer-motion";
import { BiError } from "react-icons/bi"; // icon mặc định nếu không truyền vào

const NoFoundData = ({
  icon: Icon = BiError, // nếu không truyền sẽ dùng BiError
  iconColor = "text-gray-400",
  content = "Không tìm thấy dữ liệu",
  size = 64,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl text-center"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
      >
        <Icon size={size} className={`${iconColor} mb-4`} />
      </motion.div>

      <h4 className="text-xl font-semibold text-gray-700">{content}</h4>
    </motion.div>
  );
};

export default NoFoundData;
