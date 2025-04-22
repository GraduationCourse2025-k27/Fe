import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import {
  FaHospital,
  FaUserMd,
  FaProcedures,
  FaMicroscope,
  FaAmbulance,
  FaRegHandshake,
  FaAward,
  FaLaptopMedical,
} from "react-icons/fa";

const Timeline = () => {
  const milestones = [
    {
      date: "1993",
      title: "Chính thức thành lập Bệnh viện Đa khoa Đà Nẵng, tiền thân là Bệnh viện Khu vực Quảng Nam - Đà Nẵng",
      icon: <FaHospital />,
    },
    {
      date: "2005",
      title: "Khánh thành khối nhà điều trị chính quy mô 500 giường, đánh dấu bước phát triển mới",
      icon: <FaProcedures />,
    },
    {
      date: "2013",
      title: "Được công nhận là bệnh viện hạng I – tuyến cuối khu vực miền Trung",
      icon: <FaAward />,
    },
    {
      date: "2015",
      title: "Ứng dụng hệ thống PACS – chẩn đoán hình ảnh không dùng phim",
      icon: <FaMicroscope />,
    },
    {
      date: "2018",
      title: "Ứng dụng hệ thống quản lý bệnh viện thông minh HIS vào vận hành",
      icon: <FaLaptopMedical />,
    },
    {
      date: "2020",
      title: "Đảm nhận vai trò bệnh viện tuyến đầu điều trị bệnh nhân COVID-19 tại Đà Nẵng",
      icon: <FaAmbulance />,
    },
    {
      date: "2022",
      title: "Phát triển chuyên sâu nhiều lĩnh vực: ghép tạng, tim mạch can thiệp, nội soi tiêu hóa cao cấp",
      icon: <FaUserMd />,
    },
    {
      date: "2023",
      title: "Xây dựng đề án bệnh viện thông minh, số hóa toàn diện hồ sơ bệnh án",
      icon: <FaRegHandshake />,
    },
  ];

  return (
    <div className="bg-white py-8 px-2">
      <h4 className="text-2xl md:text-3xl font-bold text-center pb-4">
        CHẶNG ĐƯỜNG PHÁT TRIỂN
      </h4>
      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-300 z-0 hidden md:block"></div>

        {/* Timeline items */}
        <div className="flex flex-col gap-10 relative z-10">
          {milestones.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`relative flex md:items-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Content */}
                <div
                  className={`w-full md:w-[45%] max-w-sm bg-white rounded-md shadow p-3 border border-blue-100 text-sm ${isLeft
                    ? "md:ml-4 md:text-left text-center"
                    : "md:mr-4 md:text-right text-center"
                    }`}
                >
                  <div className="flex items-center gap-2 mb-1 text-blue-600 justify-center md:justify-start">
                    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center text-base">
                      {item.icon}
                    </div>
                    <span className="font-medium text-xl">{item.date}</span>
                  </div>
                  <p className="text-gray-700 text-md">{item.title}</p>
                </div>

                {/* Number marker */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-900 text-white items-center justify-center text-xs font-semibold z-20">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
