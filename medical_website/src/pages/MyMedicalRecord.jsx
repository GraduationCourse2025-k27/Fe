import React from 'react';

const MyMedicalRecord = () => {
  const record = {
    fullName: 'Hồ Phúc Tâm',
    dateOfBirth: '2003-11-07',
    gender: 'Nam',
    diagnosis: 'Cảm cúm',
    prescription: 'Paracetamol 500mg, uống 2 lần/ngày',
    doctorName: 'BS. Lê Minh Dũng',
    hospitalName: 'Bệnh viện Đa khoa Đà Nẵng',
    notes: 'Bệnh nhân cần nghỉ ngơi nhiều, uống nước ấm.',
    createdAt: '2025-04-27T10:30:00Z',
  };

  return (
    <div className='p-5 mt-5'>
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-4xl mx-auto">
        <h4 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
          Hồ Sơ Bệnh Án
        </h4>
        <div className="bg-white shadow-2xl p-8 space-y-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Họ và tên
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {record.fullName}
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Ngày sinh
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(record.dateOfBirth).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Giới tính
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {record.gender}
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Ngày tạo bệnh án
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(record.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Bác sĩ phụ trách
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {record.doctorName}
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                Bệnh viện
              </label>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {record.hospitalName}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
              Chẩn đoán
            </label>
            <div className="mt-2 text-lg font-medium text-gray-800 bg-gray-50 p-4">
              {record.diagnosis}
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
              Kê đơn thuốc
            </label>
            <div className="mt-2 text-lg font-medium text-gray-800 bg-gray-50 p-4">
              {record.prescription}
            </div>
          </div>

          <div>
            <label className="text-gray-600 text-sm font-medium uppercase tracking-wide">
              Ghi chú
            </label>
            <div className="mt-2 text-lg font-medium text-gray-800 bg-gray-50 p-4">
              {record.notes}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyMedicalRecord;