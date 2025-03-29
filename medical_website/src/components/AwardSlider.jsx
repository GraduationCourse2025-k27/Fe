import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import "swiper/css";
import "swiper/css/autoplay";

const awards = [
  "https://www.vinmec.com/static/uploads/aabb_f00214b55f.jpg",
  "https://www.vinmec.com/static/uploads/jci_a2b22cbbfe.png",
  "https://www.vinmec.com/static/uploads/Acc_7e1c3dd77d.png",
  "https://www.vinmec.com/static/uploads/HMA_85ca6faa4a.png",
  "https://www.vinmec.com/static/uploads/asian_fc80a62791.jpg",
  "https://www.vinmec.com/static/uploads/CAP_f1e70cf99b.png"
];

const AwardSlider = () => {
  return (
    <div className="bg-blue-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        {/* Nội dung */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold">Chứng nhận và giải thưởng</h2>
          <p className="text-lg">Bệnh viện Đa Khoa tự hào được các tổ chức uy tín trên thế giới công nhận.</p>
          <button onClick={() => navigate('/')} className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-md flex items-center gap-2">
            Xem thêm →
          </button>
        </div>

        {/* Slider */}
        <div className="w-full md:w-1/2 md:mt-0">
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 2000 }}
            modules={[Autoplay]}
          >
            {awards.map((award, index) => (
              <SwiperSlide key={index}>
                <img src={award} alt={`Award ${index}`} className="w-40 h-30  object-contain rounded-md" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AwardSlider;
