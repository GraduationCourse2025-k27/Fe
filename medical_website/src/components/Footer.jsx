import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Giới thiệu */}
        <div>
          <img src={logo} alt="Logo" className="w-36 mb-2" />
          <h2 className="text-lg font-semibold mb-3">Bệnh viện Đa khoa</h2>
          <p className="text-sm leading-relaxed">Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao, tận tâm chăm sóc sức khỏe cộng đồng với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.</p>

          <div className="flex space-x-4 mt-4">
            <img src="https://www.vinmec.com/static//uploads/logosalenoti_d40a0c287e.svg" alt="Logo 1" className="w-20" />
            <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" alt="Logo 2" className="w-20" />
          </div>
        </div>

        {/* Cột 2: Thông tin liên hệ */}
        <div>
          <h4 className="text-xs font-semibold mb-3 ">LIÊN HỆ</h4>
          <p className="flex items-center text-sm mb-2 ">
            <FaMapMarkerAlt className="mr-2 text-white-500" />
            124 Hải Phòng, Thạch Thang, Thành Phố Đà Nẵng
          </p>
          <p className="flex items-center text-sm mb-2">
            <FaPhoneAlt className="mr-2 text-white-500" /> 033 545 2679
          </p>
          <p className="flex items-center text-sm">
            <FaGlobe className="mr-2 text-white-500" />
            Website: <a href="/" target="_blank" rel="noopener noreferrer" className=" text-white !no-underline ">benhviendakhoadn.vn</a>
          </p>
          <p className="flex items-center text-sm">
            <FaEnvelope className="mr-2 text-white-500" /> contact:@benhviendakhoadn.vn
          </p>
        </div>

        {/* Cột 3: Dịch vụ & hỗ trợ */}
        <div>
          <h4 className="text-sx font-semibold mb-3">DỊCH VỤ & HỖ TRỢ</h4>
          <div className="text-sm space-y-2 cursor-pointer">
            <p>Khám sức khỏe tổng quát</p>
            <p>Xét nghiệm</p>
            <p>Chuyên khoa</p>
            <p>Bảo hiểm y tế</p>
            <p>Hướng dẫn bệnh nhân</p>
          </div>
        </div>


        {/* Cột 4: Mạng xã hội */}
        <div>
          <h4 className="text-sx font-semibold mb-3">TIN TỨC</h4>
          <div className="text-sm space-y-2 cursor-pointer">
            <p>Cập nhật tin tức y tế</p>
            <p>Sự kiện và hội thảo chuyên đề</p>
            <p>Thành tựu và nghiên cứu mới</p>
            <p>Hướng dẫn chăm sóc sức khỏe tại nhà</p>
            <p>Chính sách y tế mới nhất</p>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-white/20 pt-4">
        &copy; {new Date().getFullYear()} Bệnh viện Đa Khoa Đà Nẵng.
      </div>
    </footer>
  );
}
