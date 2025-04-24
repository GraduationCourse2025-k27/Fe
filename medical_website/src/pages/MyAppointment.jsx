import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  return (
    <div className='mt-5 pt-5 px-4 md:px-8 flex justify-center'>
      <div className='w-full max-w-5xl'>

        {/* Tiêu đề */}
        <h4 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:text-left'>
          Lịch khám của tôi
        </h4>

        {/* Tabs điều hướng */}
        <div className='flex gap-4 overflow-x-auto border-b border-gray-300 mb-4 pb-2 scrollbar-hide'>
          {['Tất cả', 'Chờ xác nhận', 'Lịch xác nhận', 'Đánh giá', 'Đã hủy'].map((tab) => (
            <p
              key={tab}
              className={`min-w-fit cursor-pointer px-4 py-2 text-sm whitespace-nowrap border-b-2 transition ${
                selectedTab === tab
                  ? 'border-blue-900 text-blue-900 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </p>
          ))}
        </div>

        {/* Danh sách lịch hẹn */}
        <div className='space-y-4'>
          {doctors.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className='w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white border border-gray-200 rounded-xl p-4'
            >
              {/* Ảnh bác sĩ */}
              <img
                src={item.image}
                alt={item.name}
                className='w-full sm:w-24 rounded-lg object-cover bg-gray-100'
              />

              {/* Thông tin */}
              <div className='flex-1 text-sm text-gray-700 space-y-0.5'>
                <p className='font-semibold text-base text-gray-800'>{item.name}</p>
                <p>{item.speciality}</p>
                <p>{item.address}</p>
                <p>
                  Thời gian:{' '}
                  <span className='font-medium text-gray-900'>12/05/2025 - 09:00</span>
                </p>
                <p>
                  Giá khám:{' '}
                  <span className='text-orange-600 font-semibold'>
                    ₫{item.fees.toLocaleString()}
                  </span>
                </p>
              </div>

              {/* Nút hủy */}
              <div className='w-full sm:w-auto flex justify-end sm:justify-start'>
                <button className='px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white transition'>
                  Hủy lịch khám
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointment;
