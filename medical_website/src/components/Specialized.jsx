import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { specialityData } from "../assets/assets";
import { toSlug } from "../utils/toSlug";
import * as SpeacilityService from "../service/Speciality/SpecialityApi";

const Specialized = () => {
  const [showAll, setShowAll] = useState(false);
  const [speciality, setSpeaciality] = useState([]);

  useEffect(() => {
    getAllSpeaciality();
  }, []);

  const getAllSpeaciality = async () => {
    const result = await SpeacilityService.getAllSpeciality();
    setSpeaciality(result);
  };

  return (
    <div
      className="flex flex-col items-center gap-6 px-3 pb-2 "
      id="speciality"
    >
      <h4 className="ml-2 text-2xl sm:text-3xl font-semibold text-left md:self-start ">
        CHUYÊN KHOA
      </h4>
      <motion.div
        initial={false}
        animate={{ height: showAll ? "auto" : "200px", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full px-3 overflow-hidden"
      >
        {(showAll ? speciality : speciality.slice(0, 5)).map(
          (speaciality, index) => (
            <Link
              key={index}
              to={`/doctors/${speaciality.id}`}
              className="!no-underline flex flex-col items-center text-xs sm:text-sm md:text-base cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
            >
              <img
                className="w-full sm:w-45 mb-2 px-3 py-2  "
                src={speaciality.imagePath}
                alt={speaciality.name}
              />
              <p className="text-center text-gray-800 font-semibold">
                {speaciality.name}
              </p>
            </Link>
          )
        )}
      </motion.div>

      <motion.button
        onClick={() => setShowAll(!showAll)}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-blue-900 text-white rounded font-medium transition-all duration-300"
      >
        {showAll ? "Thu gọn" : "Xem tất cả"}
      </motion.button>
    </div>
  );
};

export default Specialized;
