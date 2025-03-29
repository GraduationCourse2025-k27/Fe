import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";



const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: banner1,
      content: (
        <div className="absolute inset-0 flex flex-col justify-start items-start text-white px-6 sm:px-18 pt-12 sm:pt-20">
          <h2 className="text-5xl sm:text-7xl font-bold">
            Đặt lịch khám <br /> Với các bác sĩ đáng tin cậy
          </h2>
          <p className="mt-3 text-xl sm:text-2xl">
            Nhận tư vấn trực tiếp từ các chuyên gia y tế hàng đầu, tận tâm và giàu kinh nghiệm, <br /> giúp bạn an tâm trong hành trình chăm sóc sức khỏe
          </p>
          <a
            href=""
            className="!no-underline mt-5 px-6 py-3 sm:px-7 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl sm:text-2xl rounded-lg">
            Đặt lịch ngay
          </a>
        </div>
      ),
    },
    {
      image: banner2,
      content: (
        <div className="absolute inset-0 flex flex-col justify-center items-end text-white text-right px-6 sm:px-12 md:px-20 lg:px-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Bác sĩ chuyên khoa
          </h2>
          <p className="mt-3 text-base sm:text-lg md:text-xl max-w-lg leading-relaxed">
            Hệ thống bác sĩ chuyên khoa giàu kinh nghiệm, tận tâm và am hiểu sâu rộng, luôn sẵn sàng tư vấn chính xác, hỗ trợ điều trị hiệu quả, mang đến sự chăm sóc tốt nhất cho sức khỏe của bạn.
          </p>
          <a
            href=""
            className="!no-underline mt-5 px-5 py-2 sm:px-6 sm:py-3 md:px-7 md:py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg sm:text-xl md:text-2xl rounded-lg">
            Đặt lịch ngay
          </a>
        </div>

      ),
    },
    {
      image: banner3,
      content: (
        <div className="absolute inset-0 flex flex-col justify-start items-start text-white px-6 sm:px-18 pt-12 sm:pt-20">
          <h2 className="text-4xl sm:text-5xl font-semibold"> Chăm sóc sức khỏe toàn diện <br /> Đồng hành vì sức khỏe của bạn</h2>
          <p className="mt-2 text-lg sm:text-xl">Hệ thống dịch vụ y tế chuyên nghiệp, tận tâm và hiện đại,giúp bạn an tâm chăm sóc sức khỏe mỗi ngày. <br /> Đội ngũ bác sĩ giàu kinh nghiệm luôn sẵn sàng hỗ trợ, tư vấn và điều trị kịp thời để mang đến chất lượng cuộc sống tốt nhất cho bạn và gia đình</p>
          <a
            href=""
            className="!no-underline mt-5 px-6 py-3 sm:px-7 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl sm:text-2xl rounded-lg">
            Đặt lịch ngay
          </a>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-screen overflow-hidden">
      {/* Ảnh Slide */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-[650px] transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            {index === currentIndex && slide.content}
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-2xl z-10"
        style={{ top: "50%", transform: "translateY(-50%)" }} 
      >
        <IoIosArrowBack />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white text-2xl z-10"
        style={{ top: "50%", transform: "translateY(-50%)" }} 
      >
        <IoIosArrowForward />
      </button>

      {/* nút ô vuông  */}
      <div className="absolute bottom-5 sm:bottom-14 md:bottom-18 lg:bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-gray-400"
              }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>



    </div>


  );
};





export default Navbar;
