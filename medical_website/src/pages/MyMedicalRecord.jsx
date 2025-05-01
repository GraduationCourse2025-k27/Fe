import React, { useState } from 'react';

const MyMedicalRecord = () => {
  const records = [
    {
      id: 1,
      fullName: 'Hồ Phúc Tâm',
      dateOfBirth: '2003-11-07',
      gender: 'Nam',
      diagnosis: 'Cảm cúm',
      prescription: 'Paracetamol 500mg, uống 2 lần/ngày',
      doctorName: 'BS. Lê Minh Dũng',
      hospitalName: 'Bệnh viện Đa khoa Đà Nẵng',
      notes: 'Bệnh nhân cần nghỉ ngơi nhiều, uống nước ấm.',
      createdAt: '2025-04-27T10:30:00Z',
    },
    {
      id: 2,
      fullName: 'Hồ Phúc Tâm',
      dateOfBirth: '2003-11-07',
      gender: 'Nam',
      diagnosis: 'Viêm họng',
      prescription: 'Amoxicillin 500mg, uống 3 lần/ngày',
      doctorName: 'BS. Nguyễn Thị Hoa',
      hospitalName: 'Phòng khám Đa khoa Đà Nẵng',
      notes: 'Nên tránh uống lạnh, nghỉ ngơi nhiều.',
      createdAt: '2025-03-15T08:20:00Z',
    },
    {
      id: 3,
      fullName: 'Hồ Phúc Tâm',
      dateOfBirth: '2003-11-07',
      gender: 'Nam',
      diagnosis: 'Viêm họng',
      prescription: 'Amoxicillin 500mg, uống 3 lần/ngày',
      doctorName: 'BS. Nguyễn Đức Hưng',
      hospitalName: 'Phòng khám Đa khoa Đà Nẵng',
      notes: 'Nên tránh uống lạnh, nghỉ ngơi nhiều.',
      createdAt: '2025-01-16T08:20:00Z',
    },
   
  ];

  const [selectedId, setSelectedId] = useState(records[0].id);
  const selectedRecord = records.find(r => r.id === selectedId);

  return (
    <div className="p-5 mt-5">
  <h4 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
    Chi Tiết Hồ Sơ Bệnh Án
  </h4>

  <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-stretch">
    {/* Cột trái: lịch sử khám */}
    <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="py-4 bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-center">
        Lịch sử khám bệnh
      </div>
      <ul className="border-t border-gray-200 max-h-[500px] overflow-y-scroll p-0 list-none">
        {records.map((record) => (
          <li
            key={record.id}
            onClick={() => setSelectedId(record.id)}
            className={`p-4 transition-colors duration-200 cursor-pointer ${
              record.id === selectedId
                ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="text-md">{new Date(record.createdAt).toLocaleDateString('vi-VN')}</div>
            <div className="text-xs text-gray-600">{record.doctorName}</div>
          </li>
        ))}
      </ul>
    </div>

    {/* Cột phải: chi tiết hồ sơ */}
    <div className="h-full bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Họ và tên</label>
          <div className="text-lg font-semibold text-gray-900">{selectedRecord.fullName}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Ngày sinh</label>
          <div className="text-lg font-semibold text-gray-900">
            {new Date(selectedRecord.dateOfBirth).toLocaleDateString('vi-VN')}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Giới tính</label>
          <div className="text-lg font-semibold text-gray-900">{selectedRecord.gender}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Ngày khám</label>
          <div className="text-lg font-semibold text-gray-900">
            {new Date(selectedRecord.createdAt).toLocaleDateString('vi-VN')}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Bác sĩ</label>
          <div className="text-lg font-semibold text-gray-900">{selectedRecord.doctorName}</div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 uppercase">Bệnh viện</label>
          <div className="text-lg font-semibold text-gray-900">{selectedRecord.hospitalName}</div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 uppercase">Chẩn đoán</label>
        <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
          {selectedRecord.diagnosis}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 uppercase">Kê đơn thuốc</label>
        <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
          {selectedRecord.prescription}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 uppercase">Ghi chú</label>
        <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
          {selectedRecord.notes}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default MyMedicalRecord;
