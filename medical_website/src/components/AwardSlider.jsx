import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
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
  const navigate = useNavigate();

  return (
    <div className="bg-blue-900 text-white py-12 px-2 rounded">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Nội dung */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold">Chứng nhận và giải thưởng</h2>
          <p className="text-lg mt-2">Bệnh viện Đa Khoa tự hào được các tổ chức uy tín trên thế giới công nhận.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-md flex items-center gap-2"
          >
            Xem thêm →
          </button>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            loop={true}
            autoplay={{ delay: 2000 }}
            modules={[Autoplay]}
          >
            {awards.map((award, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={award}
                  alt={`Award ${index}`}
                  className="w-40 h-30 object-contain rounded-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
};

export default AwardSlider;
