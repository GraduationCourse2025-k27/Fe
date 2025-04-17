import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className='mt-5 pt-5'>
      <Header />
      <div className='grid grid-cols-1 md:grid-cols-[1fr_5fr] gap-4 mx-5 mb-2'>
        {/* Cột bên trái */}
        <div className='border rounded p-4 flex flex-col items-center'>
          <p className='pb-3 font-medium text-zinc-700 text-lg border-b w-full '></p>
          <ul className='mt-3 space-y-2 w-full mr-5'>
            <li className='text-base text-zinc-600 cursor-pointer border rounded  p-2 hover:bg-gray-100 text-center'>Danh sách chờ</li>
            <li className='text-base text-zinc-600 cursor-pointer border rounded  p-2 hover:bg-gray-100 text-center'>Phê duyệt</li>
          </ul>
        </div>

        {/* Cột bên phải */}
        <div>
          <p className='pb-3 font-medium text-zinc-700 border-b'>Lịch đặt khám của tôi</p>
          <div>
            {doctors.slice(0, 2).map((item, index) => (
              <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                <div>
                  <img className='w-full sm:w-35 bg-indigo-50' src={item.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.name}</p>
                  <p>{item.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>{item.address}</p>
                  <p className='text-xs mt-1'>Data time</p>
                </div>
                <div className='flex flex-col gap-2 justify-end'>
                  <button className='text-sm text-stone-500 text-center py-2 px-4 rounded-lg border border-gray-300 hover:bg-blue-900'>Vn Pay</button>
                  <button className='text-sm text-stone-500 text-center py-2 px-4 rounded-lg border border-gray-300'>Hủy lịch khám</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyAppointment;
