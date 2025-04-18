import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className='mt-5 pt-5'>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_5fr]  mx-5 mb-4 border rounded'>
        {/* Cột bên trái */}
        <div className='border-r  border-gray-300 flex flex-col items-center'>
          <p className='p-2 font-medium text-zinc-700 border-b border-gray-300 text-center w-full '>Trạng thái lịch hẹn</p>
          <ul className='mt-2 space-y-2 w-full mr-7'>
            <li className='text-md text-black-600 cursor-pointer border rounded  p-2 hover:bg-gray-100 text-center'>Đang chờ xác nhận</li>
            <li className='text-md text-black-600 cursor-pointer border rounded  p-2 hover:bg-gray-100 text-center'>Lịch xác nhận</li>
          </ul>
        </div>

        {/* Cột bên phải */}
        <div className=''>
          
          <p className='p-2 font-medium text-zinc-900 border-b border-gray-300 '>Lịch đặt khám của tôi</p>
          <div className='m-2'>
            {doctors.slice(0, 2).map((item, index) => (
              <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300' key={index}>
                <div className='sm:pl-5'>
                  <img className='w-full rounded sm:w-35 bg-indigo-50' src={item.image} alt="" />
                </div>
                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.name}</p>
                  <p className='text-neutral-800 font-semibold'>{item.speciality}</p>
                  <p className='text-neutral-800 font-semibold'>{item.address}</p>
                  <p className='text-neutral-800 font-semibold'>Data time</p>
                  <p className='text-neutral-800 font-semibold '>Giá khám: {item.fees}</p>
                </div>
                <div className='flex flex-col gap-2 justify-end'>
                  <button className='text-sm text-black-500 text-center py-2 px-4 rounded-lg border rounded border-gray-300 hover:bg-green-600'>Vn Pay</button>
                  <button className='text-sm text-black-500 text-center py-2 px-4 rounded-lg border rounded border-gray-300 hover:bg-red-600'>Hủy lịch khám</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
