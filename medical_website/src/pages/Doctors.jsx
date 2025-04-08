import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { BiChevronRight, BiChevronLeft, BiChevronDown, BiSearch } from 'react-icons/bi';
import Banner2 from '../components/Banner2';
import { toSlug } from "../utils/toSlug";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8);
  const [showSpecializations, setShowSpecializations] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(''); // SỬA: Di chuyển useState vào body component

  const { doctors } = useContext(AppContext);

  const handleSearch = () => {
    const filtered = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilterDoc(filtered);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          (doc) => toSlug(doc.speciality) === toSlug(speciality)
        )
      );
    } else if (!searchKeyword) {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filterDoc.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(filterDoc.length / doctorsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const toggleSpecializations = () => setShowSpecializations(!showSpecializations);

  const specializations = [
    "Tất cả",
    "Nội Tổng Quát",
    "Cơ Xương Khớp",
    "Thần Kinh",
    "Tiêu Hoá",
    "Tim Mạch",
    "Tai Mũi Họng",
    "Mắt",
    "Răng Hàm Mặt",
    "Ung Bướu",
    "Lão Khoa",
    "Chấn Thương Chỉnh Hình",
    "Nội Tiết",
    "Vô Sinh Hiếm Muộn",
    "Sản Phụ Khoa",
    "Ngoại Thần Kinh",
    "Lồng Ngực Mạch Máu",
    "Dinh Dưỡng"
  ];

  return (
    <div className="mt-4 py-2">
      <Header />
      <Banner2 />
      <div className="container mx-auto">
        <h4 className="text-2xl font-bold md:text-left">DANH SÁCH CÁC BÁC SĨ</h4>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar trái */}
          <div className="w-full md:w-1/5 pt-4 space-y-2">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 placeholder-black"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <span
                className="absolute right-3 top-2.5 text-blue-900 cursor-pointer"
                onClick={handleSearch}
              >
                <BiSearch size={20} />
              </span>
            </div>

            {/* Chuyên khoa */}
            <div className="pt-2">
              <p
                onClick={toggleSpecializations}
                className="text-md cursor-pointer flex items-center justify-between border border-gray-300 p-2 rounded-md"
              >
                Chuyên khoa
                <BiChevronDown size={20} className={`mr-1 transition-transform duration-200 ${showSpecializations ? 'rotate-180' : ''}`} />
              </p>

              {showSpecializations && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-md overflow-y-auto max-h-50 w-74 sm:max-h-70 sm:w-50 mt-2 z-10">
                  {specializations.map((spec, index) => (
                    <p
                      key={index}
                      onClick={() =>
                        spec === "Tất cả"
                          ? navigate("/doctors")
                          : navigate(`/doctors/${toSlug(spec)}`)
                      }
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {spec}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Danh sách bác sĩ bên phải */}
          <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentDoctors.map((item, index) => (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-blue-50 w-full h-60 object-cover"
                />

                <div className="p-2">
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Hoạt động</span>
                  </span>
                  <span className="text-gray-900 text-lg font-medium block mt-1">{item.name}</span>
                  <span className="text-gray-600 text-sm block mt-1">{item.speciality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center my-6 gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'text-blue-900'}`}
          >
            <BiChevronLeft size={24} />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === number ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'text-blue-900'}`}
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Doctors;
