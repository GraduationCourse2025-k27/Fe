import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import { specialityData } from "../../assets/assets";
import { toSlug } from "../../utils/toSlug";
import Footer from "../../components/Footer";

const Specialty = () => {
  return (
    <div className="pt-5 mt-5">
      <Header />
      <div className="flex flex-col items-center gap-6 px-3 pb-2" id="speciality">
        <h4 className="ml-2 text-2xl sm:text-3xl font-semibold text-left md:self-start">
          CHUYÊN KHOA
        </h4>
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full px-3"
        >
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${toSlug(item.speciality)}`}
              onClick={() => scrollTo(0, 0)}
              className="!no-underline flex flex-col items-center text-xs sm:text-sm md:text-base cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
            >
              <img
                className="w-full sm:w-45 mb-2 px-3 py-2"
                src={item.image}
                alt={item.speciality}
              />
              <p className="text-center text-gray-800 font-semibold">{item.speciality}</p>
            </Link>
          ))}
        </motion.div>
      </div>
      <Footer/>
    </div>
  );
};

export default Specialty;
