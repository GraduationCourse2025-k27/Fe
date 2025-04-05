import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctor = () => {
  const navigate = useNavigate()
  const {doctors}= useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 mt-5 text-gray-900 md:mx-10'>
      <h4 className='ml-2 text-2xl sm:text-3xl font-semibold text-left md:self-start mt-3'>TOP BÁC SĨ</h4>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-2 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 5).map((item, index) => (
          <div 
            onClick={()=>navigate(`/appointment/${item._id}`)}
            key={index} 
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="bg-blue-50 w-full h-60 object-cover" 
            />
            <div className="p-2">
                  <span className="flex items-center gap-1 text-sm text-green-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Hoạt động</span>
                  </span>
                  <span className="text-gray-900 text-lg font-medium block mt-1">{item.name}</span>
                  <span className="text-gray-600 text-sm block mt-1">{item.speciality}</span>
                </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-900 rounded px-8 py-2 text-white' >Xem thêm</button>
    </div>
  )
}

export default TopDoctor



// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules'; 

// import 'swiper/css';
// import 'swiper/css/navigation';

// const TopDoctor = () => {
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);

//   return (
//     <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
//       <h1 className='text-3xl font-medium'>Top Bác Sĩ</h1>
//       <p className='sm:w-1/3 text-center text-sm'>Giới thiệu</p>
//       <div className='w-full px-3 sm:px-0'>
//         <Swiper
//           modules={[Navigation]}
//           navigation={true}
//           spaceBetween={20}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 }
//           }}
//         >
//           {doctors.slice(0, 10).map((item, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 onClick={() => navigate(`/appointment/${item._id}`)}
//                 className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="bg-blue-50 w-full h-60 object-cover"
//                 />
//                 <div className='p-2'>
//                   <div className='flex items-center gap-2 text-sm text-green-500'>
//                     <p className='w-2 h-2 bg-green-500 rounded-full'></p>
//                     <p>Hoạt động</p>
//                   </div>
//                   <p className=" text-gray-900 text-lg font-medium">{item.name}</p>
//                   <p className="text-gray-600 text-sm">{item.speciality}</p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <button
//         onClick={() => {
//           navigate('/doctors');
//           scrollTo(0, 0);
//         }}
//         className='bg-blue-600 px-8 py-2 text-white'
//       >
//         Xem thêm
//       </button>
//     </div>
//   );
// };

// export default TopDoctor;

