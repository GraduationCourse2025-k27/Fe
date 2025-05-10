import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  BiSearch,
  BiChevronLeft,
  BiChevronRight,
  BiUserX,
} from "react-icons/bi";

import Banner2 from "../components/Banner2";
import * as DoctorService from "../service/Doctor/DoctorApi";
import * as SpecialityService from "../service/Speciality/SpecialityApi";
import NoFoundData from "../components/NoFoundData";

const Doctors = () => {
  const { idSpecialties } = useParams();
  const navigate = useNavigate();
  const [doctorList, setDoctorList] = useState([]);
  const [speaciality, setSpeacility] = useState(-1);
  const [nameDoctor, setNameDoctor] = useState("");
  const [specialityList, setSpecialityList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  // Tính toán phân trang
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(doctorList)
    ? doctorList.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(doctorList)
    ? Math.ceil(doctorList.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    if (idSpecialties && !flag) {
      getAllDoctorByNameAndSpeaciality(idSpecialties, nameDoctor);
      setFlag(true);
    } else {
      getAllDoctorByNameAndSpeaciality(speaciality, nameDoctor);
    }
    setCurrentPage(1);
  }, [speaciality, nameDoctor, idSpecialties]);

  useEffect(() => {
    getAllSpeciality();
  }, []);

  const getAllDoctorByNameAndSpeaciality = async (
    idSpecialties,
    nameDoctor
  ) => {
    const result = await DoctorService.getAllDoctor(idSpecialties, nameDoctor);
    setDoctorList(result ? result : []);
  };

  const getAllSpeciality = async () => {
    const result = await SpecialityService.getAllSpeciality();
    setSpecialityList(result);
  };

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <div className="mt-4 py-2">
      <Banner2 />
      <div className="container mx-auto">
        <h4 className="text-2xl font-bold md:text-left">
          DANH SÁCH CÁC BÁC SĨ
        </h4>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar trái */}
          <div className="w-full md:w-1/5 pt-4 space-y-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder-black"
                value={nameDoctor}
                onChange={(e) => setNameDoctor(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-blue-900 cursor-pointer">
                <BiSearch size={20} />
              </span>
            </div>

            {/* Chuyên khoa */}
            <div className="pt-2">
              <select
                className="form-select bg-white border border-gray-300 rounded-md  overflow-y-auto max-h-100 w-85 sm:max-h-70 sm:w-60 mt-2 z-10"
                aria-label="Default select example"
                onChange={(e) => {
                  setSpeacility(e.target.value);
                }}
              >
                <option className="bg-white" value={""}>
                  Tất cả
                </option>
                {specialityList.map((spec) => (
                  <option className="bg-white" value={spec.id} key={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Danh sách bác sĩ bên phải */}
          <div className="w-full md:w-4/5 grid grid-cols-1 min-h-[650px] sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorList?.length > 0 ? (
              records?.map((item, index) => (
                <div
                  key={index}
                  className="border max-h-[320px] border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                >
                  <Link to={`/appointment/${item.id}`}>
                    <img
                      src={item?.imagePath}
                      alt={item?.client?.fullName}
                      className="bg-blue-50 w-full h-60 object-cover"
                    />
                  </Link>
                  <div className="p-2">
                    <span className="text-gray-900 text-lg font-medium block mt-1">
                      {item?.client?.fullName}
                    </span>
                    <span className="text-gray-600 text-sm block mt-1">
                      {item?.speciality?.name}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full w-full flex justify-center mb-100">
                <NoFoundData
                  icon={BiUserX}
                  iconColor="text-red-400"
                  content="Không tìm thấy bác sĩ nào!"
                  size={72}
                />
              </div>
            )}
          </div>
        </div>

        {/* Phân trang */}
        {npage > 0 && (
          <ul className="pagination flex justify-center items-center my-6 gap-2 mt-4">
            {npage > 1 && (
              <li className="page-item">
                <button
                  className="page-link px-4 py-2 text-blue-900 flex items-center"
                  onClick={prePage}
                >
                  <BiChevronLeft size={24} />
                </button>
              </li>
            )}
            {numbers &&
              numbers.map((n) => (
                <li className="page-item" key={n}>
                  <button
                    className={`page-link px-4 py-2 border rounded ${
                      currentPage === n
                        ? "bg-blue-900 text-blue"
                        : "bg-white text-blue-900"
                    }`}
                    onClick={(e) => changePage(e, n)}
                  >
                    <span className="text-blue">{n}</span>
                  </button>
                </li>
              ))}
            {npage > 1 && (
              <li className="page-item">
                <button
                  className="page-link px-4 py-2 text-blue-900 flex items-center"
                  onClick={nextPage}
                >
                  <BiChevronRight size={24} />
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Doctors;
