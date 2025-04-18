import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import bannercreate from '../assets/bannercreate.png'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <motion.div 
      className="flex bg-blue-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:mx-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Left Section */}
      <div className="flew-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Đặt lịch khám ngay</p>
          <p className="mt-4">Với 100+ Bác sĩ đáng tin cậy</p>
        </div>
        <button
          onClick={() => {
            navigate('/login')
            scrollTo(0, 0)
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-2 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Tạo tài khoản
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <motion.img
          className="w-full absolute bottom-0 left-20 max-w-md"
          src={bannercreate}
          alt="banner"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

export default Banner
