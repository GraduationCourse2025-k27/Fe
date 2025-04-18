import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <motion.div
      className='flex flex-col items-center gap-2 my-10 text-gray-900 md:mx-10'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h4 className='text-3xl font-medium'>TOP BÁC SĨ</h4>
      <p className='sm:w-1/3 text-center text-md'>
        Chúng tôi tự hào giới thiệu các bác sĩ giỏi nhất, với nhiều năm kinh nghiệm trong các chuyên khoa khác nhau, sẵn sàng giúp bạn chăm sóc sức khỏe tốt nhất.
      </p>

      <div className='w-full px-3 sm:px-0'>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1366: { slidesPerView: 5 },
            1600: { slidesPerView: 6 }
          }}
        >
          {doctors.slice(0, 10).map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-blue-50 w-full h-60 object-cover"
                />
                <div className='p-2'>
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Hoạt động</p>
                  </div>
                  <p className=" text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='bg-blue-900 px-8 py-2 mt-2 text-white rounded'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Xem thêm
      </motion.button>
    </motion.div>
  );
};

export default TopDoctor;
