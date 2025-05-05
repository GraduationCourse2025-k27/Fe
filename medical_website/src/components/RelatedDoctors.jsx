import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as DoctorService from "../service/Doctor/DoctorApi";

const RelatedDoctors = ({ speciality, docId }) => {
  const [specialities, setSpeacialities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleFindAllDoctorBySpciality();
  }, [speciality, docId]);
  const handleFindAllDoctorBySpciality = async () => {
    const result = await DoctorService.getAllDoctor(speciality, docId);
    setSpeacialities(result);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-5 text-gray-900 md:mx-10">
      <h2 className="text-3xl font-medium">Các bác sĩ liên quan</h2>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6 px-3 sm:px-0">
        {specialities.slice(0, 5).map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item?.id}`)}
            key={index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img
              src={item?.imagePath}
              alt={item?.client.fullName}
              className="bg-blue-50 w-full h-60 object-cover"
            />
            <div className="p-2">
              <span className="flex items-center gap-1 text-sm text-green-500"></span>
              <span className="text-gray-900 text-lg font-medium block mt-1">
                {item?.client.fullName}
              </span>
              <span className="text-gray-600 text-sm block mt-1">
                {item?.speciality.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
