import React from "react";
import { BiUserX } from "react-icons/bi";
import { motion } from "framer-motion";

const NoDoctorFound = ({ content }) => {
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
        <BiUserX size={64} className="text-red-400 mb-4" />
      </motion.div>

      <h4 className="text-xl font-semibold text-gray-700">{content}</h4>
    </motion.div>
  );
};

export default NoDoctorFound;
