import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';

const Confirmation = () => {
  const location = useLocation();
  const {
    doctorId,
    doctorName,
    doctorImage,
    selectedTime,
    selectedDate,
    doctorFees,
  } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    address: '',
    reason: '',
    isForMe: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === 'radio' && name === 'isForMe') {
      newValue = (value === 'true');
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.dateOfBirth) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    const payload = { ...formData, doctorId, selectedTime, selectedDate };
    console.log('Dữ liệu gửi đi:', payload);
    alert('Lịch khám đã được xác nhận thành công!');
  };

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'Không có ngày khám';

  return (
    <div className="pt-5 mt-5">


      {/* Thông tin bác sĩ */}
      <div className="bg- border rounded-xl p-4 max-w-3xl mx-auto mb-4">
        <div className="flex flex-col md:flex-row items-center ">
          <div className="flex items-center w-full md:w-auto">
            <img
              src={doctorImage}
              alt={doctorName}
              className="w-32 h-40 rounded-full border"
            />
            <div className="ml-4">
              <p className="text-base font-semibold uppercase text-gray-800">
                Đặt lịch khám
              </p>
              <p className="text-blue-900 font-semibold text-lg">
              {doctorName}
              </p>
              <div className="flex items-center text-md text-gray-900 font-medium">
                <FaCalendarAlt className=" text-2xl md:text-xl mr-2 " />
                <span>
                  {selectedTime} - {formattedDate}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto flex-shrink-0">
            <div className="inline-block border rounded-lg p-2 text-black font-semibold text-center">
              Giá khám:{" "}
              <span className="ml-1 text-md text-black">
                {doctorFees} VND
              </span>
            </div>
          </div>
        </div>
      </div>





      {/* Thông tin đặt khám */}
      <div className="bg-white border rounded-xl p-4 max-w-3xl mx-auto mb-6">
        <div className="flex gap-6 items-center mb-4">
          <div className='flex items-center gap-2'>
            <input
              type="radio"
              name="isForMe"
              value="true"
              checked={formData.isForMe === true}
              onChange={handleInputChange}
              className='mr-2'
            />
            <label>
              Đặt cho mình
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type="radio"
              name="isForMe"
              value="false"
              checked={formData.isForMe === false}
              onChange={handleInputChange}
            />
            <label>
              Đặt cho người thân
            </label>
          </div>
        </div>

        {/* Form thông tin */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Họ tên bệnh nhân <span className="text-red-500">*</span>
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="VD: Trần Văn Phú"
            />
          </div>

          {/* Chọn giới tính */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Giới tính
            </label>
            <div className="flex gap-6">
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                <label className="">
                  Nam
                </label>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                <label className="">
                  Nữ
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              type="tel"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập địa chỉ email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Ngày sinh <span className="text-red-500">*</span>
            </label>
            <input
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              type="date"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Tỉnh thành
            </label>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 appearance-none pr-10"
              >
                <option value="DaNang">Đà Nẵng</option>
              </select>
              {/* Icon mũi tên bên phải */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-4">
                <svg
                  className="h-4 w-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>


          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Quận/Huyện
            </label>
            <div className="relative">
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 appearance-none pr-10"
              >
                <option value="HaiChau">Hải Châu</option>
                <option value="LienChieu">Liên Chiểu</option>
                <option value="CamLe">Cẩm Lệ</option>
                <option value="NguHanhSon">Ngũ Hành Sơn</option>
                <option value="SonTra">Sơn Trà</option>
                <option value="ThanhKhe">Thanh Khê</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-4">
                <svg
                  className="h-4 w-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>


          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Địa chỉ
            </label>
            <input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Nhập địa chỉ cụ thể"
            />
          </div>



          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Lý do khám
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="VD: Đau lưng kéo dài, cần khám"
            ></textarea>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Xác nhận lịch khám
          </button>
        </form>
      </div>
    </div>
  );
};

export default Confirmation;
