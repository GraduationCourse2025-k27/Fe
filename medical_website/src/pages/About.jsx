import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import aboutBanner from '../assets/banner.jpg';

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
    <Header/>
    <div className=" mt-20">
    {/* Header Section */}
    <div className="grid bg-blue-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10 grid-cols-1 md:grid-cols-2 items-center">
    {/* Left Section */}
    <div className="py-8 sm:py-10 md:py-14 lg:py-20 lg:pl-5">
        <div className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold text-white">
            <p>Về chúng tôi</p>
        </div>
        <p className="mt-3 font-semibold text-white">Chất lượng uy tín tạo niềm tin cho mọi nhà</p>
    </div>
    {/* Right Section */}
    <div className="flex justify-center items-center">
        <img
            className="w-3/4 sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto object-cover"
            src="https://edoctor.io/assets/dich-vu/banner_general_home_test.png"
            alt="Doctor banner"
        />
    </div>
</div>

      {/* Story Section */}
      <div className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src="https://bacsidanang.com/wp-content/uploads/2021/06/BENH-VIEN-DA-NANG-BACSIDANANG-jpg-2.jpg"
            alt="hospital"
            className="rounded-lg shadow-lg object-cover"
            style={{ width: "100%", maxHeight: "400px" }}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Câu chuyện về Bệnh viện Đa khoa Đà Nẵng</h2>
          {(!isMobile || showFullText) && (
            <>
              <p>
                Bệnh viện Đa khoa Đà Nẵng là một trong những cơ sở y tế hàng đầu tại khu vực miền Trung, với hơn 40 năm kinh nghiệm trong lĩnh vực chăm sóc sức khỏe.
              </p>
              <p>
                Với đội ngũ y bác sĩ tận tâm, giàu kinh nghiệm, bệnh viện đã và đang là điểm đến tin cậy của hàng chục nghìn bệnh nhân mỗi năm.
              </p>
              <p>
                Trang thiết bị hiện đại và phương pháp điều trị tiên tiến được đầu tư không ngừng, giúp bệnh viện cung cấp dịch vụ y tế chất lượng cao, hỗ trợ phục hồi sức khỏe nhanh chóng và hiệu quả.
              </p>
            </>
          )}
          {isMobile && !showFullText && (
            <button
              onClick={handleToggleText}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Xem thêm
            </button>
          )}
        </div>
      </div>
      {/* Statistics Section */}
      <div className="bg-blue-900 text-white py-12 text-center">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Số liệu: Bác sĩ */}
        <div className="flex flex-col items-center">
          <h3 className="text-6xl font-bold">
            <CountUp start={0} end={50} duration={2.5} />
          </h3>
          <p className="text-lg mt-2">Bác sĩ</p>
        </div>

        {/* Số liệu: Bệnh nhân hài lòng */}
        <div className="flex flex-col items-center">
          <h3 className="text-6xl font-bold">
            <CountUp start={0} end={29000} duration={3} separator="," />
          </h3>
          <p className="text-lg mt-2">Bệnh nhân hài lòng</p>
        </div>

        {/* Số liệu: Giường bệnh */}
        <div className="flex flex-col items-center">
          <h3 className="text-6xl font-bold">
            <CountUp start={0} end={1000} duration={2.5} />
          </h3>
          <p className="text-lg mt-2">Giường bệnh</p>
        </div>

        {/* Số liệu: Giải thưởng đạt được */}
        <div className="flex flex-col items-center">
          <h3 className="text-6xl font-bold">
            <CountUp start={0} end={150} duration={2.5} />
          </h3>
          <p className="text-lg mt-2">Giải thưởng đạt được</p>
        </div>
      </div>
</div>

      {/* Private Care Service Section */}
      <div className="container mx-auto py-12 px-6 grid md:grid-cols-2 gap-8 items-center">
      {/* Nội dung bên trái */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Dịch vụ chăm sóc đặc biệt</h2>
        {!isMobile && (
          <p className="text-gray-600 mb-6">
            Chúng tôi luôn ưu tiên chăm sóc bệnh nhân với các dịch vụ chuyên sâu, được thiết kế để đảm bảo sức khỏe và sự thoải mái của bạn ở mức cao nhất.
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
              <div className="w-1/2 bg-gray-300 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
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
      className="rounded-xl object-cover w-full max-h-[400px] ml-10"
    />
  </div>
      </div>

      {/* History & Achievements Section */}
      <div className="max-w-5xl mx-auto py-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Lịch sử & Thành tựu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {/* Item 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-6xl font-bold">1</span>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-blue-900">1945-1965</p>
              <p className="text-sm text-gray-600">Giai đoạn hình thành bệnh viện</p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-6xl font-bold">2</span>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-blue-900">01/2003</p>
              <p className="text-sm text-gray-600">Được nâng hạng trở thành bệnh viện Hạng I.</p>
            </div>
          </div>
          {/* Item 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-6xl font-bold">3</span>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-blue-900">Từ những năm 2000</p>
              <p className="text-sm text-gray-600">Mang lại hạnh phúc cho hơn 500 gia đình hiếm muộn.</p>
            </div>
          </div>
          {/* Item 4 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-900 text-white flex justify-center items-center rounded-full mx-auto">
            <span className="text-6xl font-bold">4</span>
            </div>
            <div className="mt-6">
              <p className="text-2xl font-bold text-blue-900">Hiện nay</p>
              <p className="text-sm text-gray-600">Đạt được nhiều thành tích và là một trong những bệnh viện lớn</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="benefits-container">
      <div className="benefits-section py-10 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-4">
        Quyền lợi của Bác sĩ
      </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
    {/* Quyền lợi 1 */}
    <div className="benefit bg-white p-6 shadow-md rounded-lg flex items-center">
      <img
        src="https://media.istockphoto.com/id/836468620/vector/medical-clipboard-with-stethoscope.webp?b=1&s=612x612&w=0&k=20&c=d8ijTdyWU-8qWGSpZgdc0Zj5ZG76PCh5ouo_xgdQ68o="
        alt="Health Consultation Icon"
        className="w-16 h-16 mr-6"
      />
      <div>
        <h3 className="text-2xl font-bold text-blue-700">Được tham gia tư vấn y tế chuyên nghiệp</h3>
        <p className="text-gray-600">
          Các Bác sĩ tại Bệnh viện Đa khoa Đà Nẵng có thể tham gia tư vấn y tế từ xa,
          mang đến sự hỗ trợ nhanh chóng và tiện lợi cho bệnh nhân trên khắp mọi miền.
        </p>
      </div>
    </div>
    {/* Quyền lợi 2 */}
    <div className="benefit bg-white p-6 shadow-md rounded-lg flex items-center">
      <img
        src="https://cdn.pixabay.com/photo/2016/08/19/20/37/time-1606153_1280.png"
        alt="Flexible Time Icon"
        className="w-16 h-16 mr-6"
      />
      <div>
        <h3 className="text-2xl font-bold text-blue-700">Lịch làm việc linh hoạt</h3>
        <p className="text-gray-600">
          Bệnh viện tạo điều kiện cho các Bác sĩ lựa chọn khung giờ làm việc phù hợp với lịch trình cá nhân,
          giúp cân bằng giữa công việc và cuộc sống.
        </p>
      </div>
    </div>
    {/* Quyền lợi 3 */}
    <div className="benefit bg-white p-6 shadow-md rounded-lg flex items-center">
      <img
        src="https://cdn.pixabay.com/photo/2020/04/03/00/22/doctor-4997061_1280.png"
        alt="Skill Development Icon"
        className="w-16 h-16 mr-6"
      />
      <div>
        <h3 className="text-2xl font-bold text-blue-700">Nâng cao chuyên môn</h3>
        <p className="text-gray-600">
          Tham gia các chương trình đào tạo và hội thảo y khoa tại Bệnh viện, Bác sĩ có cơ hội học hỏi và trau dồi kỹ năng chuyên môn,
          cũng như cập nhật những tiến bộ y học mới nhất.
        </p>
      </div>
    </div>
    {/* Quyền lợi 4 */}
    <div className="benefit bg-white p-6 shadow-md rounded-lg flex items-center">
      <img
        src="https://cdn.pixabay.com/photo/2018/10/03/18/46/money-3722123_1280.png"
        alt="Reputation and Income Icon"
        className="w-16 h-16 mr-6"
      />
      <div>
        <h3 className="text-2xl font-bold text-blue-700">Thu nhập và uy tín</h3>
        <p className="text-gray-600">
          Việc phục vụ tại Bệnh viện Đa khoa Đà Nẵng không chỉ nâng cao thu nhập mà còn gia tăng uy tín chuyên môn,
          giúp Bác sĩ khẳng định vị thế trong ngành y.
        </p>
      </div>
    </div>
</div>

</div>
</div>
    </div>
      <Footer />
    </div>
  );
};

export default About;
