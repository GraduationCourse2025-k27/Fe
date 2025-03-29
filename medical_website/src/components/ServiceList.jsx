import React from "react";
import { useNavigate } from "react-router-dom";
import { FiPhoneCall, FiCalendar, FiUser } from "react-icons/fi";

const ServiceCard = ({ icon, title, description, link, isLast }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-2 py-2 
      sm:min-w-[250px] sm:w-auto sm:flex-1 h-20 sm:h-24 cursor-pointer 
       bg-white rounded-md shadow-md ${!isLast ? "border-r border-gray-300" : ""}`}
      onClick={() => navigate(link)}
    >

      <div className="flex flex-col sm:flex-row items-center sm:gap-2">
        <div className="text-blue-700 text-lg sm:text-3xl">{icon}</div>
        <h5 className="text-[10px] sm:text-base font-bold mt-1 sm:mt-0">{title}</h5>
      </div>
 
      <p className="hidden sm:block text-xs sm:text-sm text-gray-500">{description}</p>
    </div>
  );
};

const ServiceList = () => {
  return (
    <div className="absolute top-[20] left-0 w-full flex justify-center sm:justify-start 
    sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:top-[450px] sm:z-10 
    sm:flex-row sm:w-auto px-4 rounded-lg  ">

      <ServiceCard
        icon={<FiPhoneCall />}
        title="Gọi tổng đài"
        description="Hỏi về phương pháp điều trị"
        link="/hotline"
      />
      <ServiceCard
        icon={<FiCalendar />}
        title="Đặt lịch hẹn"
        description="Đặt lịch với bệnh viện"
        link="/appointment"
      />
      <ServiceCard
        icon={<FiUser />}
        title="Tìm bác sĩ"
        description="Chọn theo chuyên môn"
        link="/doctors"
        isLast={true}
      />
    </div>
  );
};

export default ServiceList;
