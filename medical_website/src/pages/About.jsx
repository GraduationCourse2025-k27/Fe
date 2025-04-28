import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import TimeLine from '../components/TimeLine';




const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    // Xác định nếu người dùng đang sử dụng thiết bị di động (màn hình nhỏ hơn 768px)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Xóa event listener khi component bị hủy bỏ
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleText = () => {
    setShowFullText((prev) => !prev); // Đảo trạng thái hiển thị văn bản đầy đủ hoặc rút gọn
  };

  return (
    <div>

      <div className="mt-5 pt-5">
        <div className="relative w-full h-60 md:h-[450px]">
          <img
            src="/images/nav-contac.png"
            alt="Về chúng tôi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-end justify-start pr-8 pt-6 space-y-2">
            <p className="text-blue-900 text-2xl md:text-4xl font-bold text-right">
              Về chúng tôi
            </p>
            <p className="text-blue-900 text-xl md:text-3xl font-semibold text-right">
              Bệnh viện Đa khoa Đà Nẵng
            </p>
          </div>
        </div>


        {/* Story Section */}
        <div className="container py-4 grid md:grid-cols-2 gap-4">
          
            <img
              src="https://bacsidanang.com/wp-content/uploads/2021/06/BENH-VIEN-DA-NANG-BACSIDANANG-jpg-2.jpg"
              alt="hospital"
              className=""
              style={{ width: "100%", maxHeight: "450px" }}
            />
          
          <div>
            <h4 className="text-md font-bold mb-4">CÂU CHUYỆN VỀ BỆNH VIỆN ĐA KHOA ĐÀ NẴNG</h4>
            {(!isMobile || showFullText) && (
              <div className="space-y-4">
                <p className="animate-slideIn">
                Bệnh viện Đa khoa Đà Nẵng tự hào là một trong những cơ sở y tế hàng đầu tại miền Trung, sở hữu hơn 40 năm kinh nghiệm trong lĩnh vực chăm sóc sức khỏe cộng đồng
                </p>
                <p className="animate-slideIn delay-200">
                Đội ngũ y bác sĩ không chỉ giàu kinh nghiệm mà còn tận tâm, luôn đặt sức khỏe và sự an toàn của bệnh nhân lên hàng đầu, giúp bệnh viện trở thành điểm đến đáng tin cậy của hàng chục nghìn người mỗi năm
                </p>
                <p className="animate-slideIn delay-300">
                Trang thiết bị hiện đại cùng các phương pháp điều trị tiên tiến được bệnh viện không ngừng áp dụng và nâng cấp, mang đến dịch vụ y tế chất lượng cao, hỗ trợ bệnh nhân phục hồi sức khỏe nhanh chóng và hiệu quả.
                </p>
              </div>
            )}

            {isMobile && !showFullText && (
              <button
                onClick={handleToggleText}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
              >
                Xem thêm
              </button>
            )}

          </div>
        </div>

        <div className="container mx-auto py-12 px-6 grid md:grid-cols-2 gap-8 items-center">
      {/* Nội dung bên trái */}
      <div>
        <h4 className="text-3xl font-bold mb-4 text-gray-800">DỊCH VỤ CHĂM SÓC ĐẶC BIỆT</h4>
        {!isMobile && (
          <p className="text-gray-600 mb-6">
            Chúng tôi luôn ưu tiên chăm sóc bệnh nhân với các dịch vụ chuyên sâu, được thiết kế để đảm bảo sức khỏe và sự thoải mái của bạn ở mức cao nhất
          </p>
        )}

        {/* Danh sách dịch vụ với icon */}
        <div className="space-y-4">
          {[
            { name: "Theo dõi sức khỏe hàng ngày", percent: 100 },
            { name: "Hỗ trợ dinh dưỡng cá nhân", percent: 90 },
            { name: "Chăm sóc y tế tại nhà", percent: 85 },
            { name: "Đội ngũ bác sĩ 24/7", percent: 95 },
            { name: "Thái độ chuyên nghiệp", percent: 95 },
            { name: "Sát khuẩn chất lượng cao", percent: 95 },
          ].map((service, index) => (
            <div key={index} className="flex items-center">
              <span className="w-1/2 text-gray-700 font-medium flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {service.name}
              </span>
              <div className="w-1/2 bg-gray-300 h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 "
                  style={{ width: `${service.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

  {/* Ảnh bên phải */}
  <div className="relative">
    <img
      src="https://thanhnien.mediacdn.vn/Uploaded/hongky-qc/2022_06_20/bv-da-nang-6188.jpg"
      alt="Medical Team"
      className="w-full max-h-[400px]"
    />
  </div>
      </div>


        


        <div className="max-w-5xl mx-auto py-8">
      <h4 className="text-4xl font-extrabold text-center text-blue-900">
     
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {/* Cam kết 1 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-24 h-24 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-7xl font-extrabold">1</span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-blue-900">Chất lượng</p>
            <p className="text-base text-gray-700 mt-2">
              Nâng cấp hệ thống xét nghiệm đạt chuẩn quốc tế, đảm bảo độ chính xác và nhanh chóng.
            </p>
          </div>
        </motion.div>
        {/* Cam kết 2 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-24 h-24 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-7xl font-extrabold">2</span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-blue-900">Công nghệ</p>
            <p className="text-base text-gray-700 mt-2">
              Triển khai bệnh án điện tử và hệ thống đặt lịch khám trực tuyến thông minh.
            </p>
          </div>
        </motion.div>
        {/* Cam kết 3 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-24 h-24 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-7xl font-extrabold">3</span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-blue-900">Nhân lực</p>
            <p className="text-base text-gray-700 mt-2">
              Đội ngũ hơn 500 bác sĩ, chuyên gia, y tá giàu kinh nghiệm, được đào tạo định kỳ.
            </p>
          </div>
        </motion.div>
        {/* Cam kết 4 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-24 h-24 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-7xl font-extrabold">4</span>
          </div>
          <div className="mt-6">
            <p className="text-3xl font-bold text-blue-900">Cộng đồng</p>
            <p className="text-base text-gray-700 mt-2">
              Hơn 100 chiến dịch y tế miễn phí hằng năm đến vùng sâu, vùng xa trên cả nước.
            </p>
          </div>
        </motion.div>
      </div>
    </div>

      <div>
        
        <TimeLine/>
      </div>

        
       

<div className="max-w-5xl mx-auto py-16">
  <h4 className="text-4xl font-extrabold text-center text-blue-900 pb-3">
    DỊCH VỤ Y TẾ & TRANG THIẾT BỊ HIỆN ĐẠI
  </h4>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
    {/* Dịch vụ 1 */}
    <div className="bg-white p-6 rounded-xl shadow-lg  text-center">
      <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
        MRI
      </div>
      <h5 className="text-2xl font-bold text-blue-900 mt-4">Chẩn đoán hình ảnh</h5>
      <p className="text-gray-700 mt-2 text-sm">
        Hệ thống máy MRI, CT-Scan và X-Quang kỹ thuật số giúp phát hiện sớm và chính xác.
      </p>
    </div>
    {/* Dịch vụ 2 */}
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
        AI
      </div>
      <h5 className="text-2xl font-bold text-blue-900 mt-4">Hỗ trợ AI</h5>
      <p className="text-gray-700 mt-2 text-sm">
        Ứng dụng trí tuệ nhân tạo trong tư vấn khám chữa bệnh và quản lý hồ sơ sức khỏe.
      </p>
    </div>
    {/* Dịch vụ 3 */}
    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
        ICU
      </div>
      <h5 className="text-2xl font-bold text-blue-900 mt-4">Chăm sóc chuyên sâu</h5>
      <p className="text-gray-700 mt-2 text-sm">
        Khoa hồi sức - cấp cứu hiện đại với đầy đủ thiết bị theo dõi và can thiệp liên tục.
      </p>
    </div>
  </div>
</div>



      </div>
    </div>
  );
};

export default About;