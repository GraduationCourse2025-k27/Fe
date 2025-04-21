import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  "/images/slide4.jpg",
];

const HospitalSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="pt-5 px-2 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 items-start">
        {/* Bên trái - Slide chính */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-2/3"
        >
          <Swiper
            spaceBetween={10}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs, Autoplay]}
            className="rounded-lg"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  src={image}
                  alt={`Main Slide ${index + 1}`}
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bên phải - Thông tin */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3"
        >
          <h4 className="text-2xl md:text-4xl font-bold mb-2 md:mb-2">
            HỆ THỐNG PHÒNG KHÁM VÀ TRUNG TÂM CỦA CHÚNG TÔI
          </h4>
          <p className="text-gray-700 mb-3 md:mb-2 text-sm md:text-base">
            Bệnh viện Đa khoa Đà Nẵng là cơ sở y tế hàng đầu tại miền Trung, với trang thiết bị hiện đại và đội ngũ y bác sĩ giàu kinh nghiệm. Bệnh viện cung cấp dịch vụ chăm sóc sức khỏe toàn diện, luôn nỗ lực nâng cao chất lượng để đáp ứng nhu cầu khám chữa bệnh của người dân.
          </p>

          {/* Slider nhỏ - thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 3 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Thumbs, Autoplay]}
              className="rounded-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-20 md:h-45 object-cover rounded-md cursor-pointer"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalSlider;
