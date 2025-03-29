import React, { useState } from "react";
import banner4 from "../assets/banner4.jpg";
import { useNavigate } from "react-router-dom";
import { MdSend } from "react-icons/md";
import SplitText from "./SplitText";

const Navbar2 = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (query.trim() !== "") {
      navigate(`/ChatbotPage?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full top-15">
      <img src={banner4} alt="Banner" className="w-full h-[300px] md:h-[450px] object-cover" />
      <div className="absolute top-14 left-0 w-full flex flex-col items-center text-center px-4">
        <SplitText
          text="Kết nối Người Dân với Cơ sở & Dịch vụ Y tế hàng đầu"
          className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-500 drop-shadow-lg"
        />

        {/* Ô tìm kiếm */}
        <div className="mt-4 w-full max-w-xl relative flex items-center">
          <input
            type="text"
            placeholder="  AI hỗ trợ tư vấn y khoa ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 pl-5 pr-14 rounded-full border-none outline-none shadow-lg text-base md:text-lg"
          />

          {/* Nút gửi */}
          <button
            onClick={handleSend}
            className="absolute right-2 w-12 h-12 flex items-center justify-center text-white"
          >
            <MdSend size={20} />
          </button>

        </div>
        <div className="mt-3 hidden sm:flex flex-col items-center text-center text-sm md:text-base text-gray-700 max-w-lg mx-auto space-y-1 md:space-y-2">
          <p>Đặt lịch khám tiện lợi - Không cần xếp hàng - Hỗ trợ tư vấn từ xa</p>
          <p>Đặt khám theo giờ - Giảm thời gian chờ đợi - Chăm sóc sức khỏe</p>
          <p>Được hoàn tiền khi hủy khám - Có cơ hội nhận ưu đãi hoàn tiền</p>
        </div>

      </div>
    </div>
  );
};

export default Navbar2;
