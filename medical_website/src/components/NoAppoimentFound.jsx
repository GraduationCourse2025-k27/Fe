import React from 'react';
import { BiCalendarX } from 'react-icons/bi';
import { motion } from 'framer-motion';

const NoAppointmentFound = () => {
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
        <BiCalendarX size={64} className="text-orange-400 mb-4" />
      </motion.div>

      <h4 className="text-xl font-semibold text-gray-700">
        Không có lịch hẹn nào cả
      </h4>
      <p className="text-md text-gray-500 mt-2">
        Vui lòng đặt lịch hẹn mới hoặc kiểm tra lại sau.
      </p>
    </motion.div>
  );
};

export default NoAppointmentFound;