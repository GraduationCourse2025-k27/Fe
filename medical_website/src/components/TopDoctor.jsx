import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/navigation';

const TopDoctor = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-2 my-10 text-gray-900 md:mx-10'>
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
            640: { slidesPerView: 2 },     // Hiển thị 2 bác sĩ trên màn hình nhỏ
            768: { slidesPerView: 3 },     // Hiển thị 3 bác sĩ trên màn hình vừa
            1024: { slidesPerView: 4 },    // Hiển thị 4 bác sĩ trên màn hình lớn
            1366: { slidesPerView: 5 },    // Hiển thị 5 bác sĩ trên màn hình rất lớn
            1640: { slidesPerView: 6 }     // Hiển thị 6 bác sĩ trên màn hình rất lớn
          }}
        >
          {doctors.slice(0, 10).map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='bg-blue-900 px-8 py-2 mt-2 text-white rounded'
      >
        Xem thêm
      </button>
    </div>
  );
};

export default TopDoctor;


