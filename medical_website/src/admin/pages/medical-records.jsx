import React, { useState } from "react";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiClock,
  FiDownload,
} from "react-icons/fi";

const initialRecords = [
  {
    id: 1,
    patient: "Nguyễn Văn A",
    doctor: "BS. Trần Văn Bình",
    diagnosis: "Viêm họng cấp",
    prescription: "Paracetamol, thuốc ho, kháng sinh",
    createdAt: "2025-05-10",
  },
  {
    id: 2,
    patient: "Trần Thị B",
    doctor: "BS. Lê Hồng Phúc",
    diagnosis: "Dị ứng thời tiết",
    prescription: "Cetirizine, xịt mũi",
    createdAt: "2025-05-11",
  },
];

const MedicalRecordManagement = () => {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [newRecord, setNewRecord] = useState(null);
  const [editHistory, setEditHistory] = useState({});
  const [viewHistoryId, setViewHistoryId] = useState(null);

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const handleDownload = (record) => {
    const content = `
      Hồ sơ bệnh án
      -----------------------
      Bệnh nhân: ${record.patient}
      Bác sĩ: ${record.doctor}
      Ngày tạo: ${record.createdAt}
      Chuẩn đoán: ${record.diagnosis}
      Đơn thuốc: ${record.prescription}
    `;
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${record.patient.replace(/\s/g, "_")}_hoso.doc`;
    link.click();
  };

  const handleEditChange = (field, value) => {
    setEditRecord((prev) => ({ ...prev, [field]: value }));
  };

const saveEdit = () => {
  const changes = { time: new Date().toLocaleString(), record: { ...editRecord } };

  // Kiểm tra các trường nào đã thay đổi và chỉ lưu lại những thay đổi này
  const changedFields = Object.keys(editRecord).reduce((acc, field) => {
    if (editRecord[field] !== records.find(r => r.id === editRecord.id)[field]) {
      acc[field] = editRecord[field];
    }
    return acc;
  }, {});

  if (Object.keys(changedFields).length > 0) {
    setEditHistory((prev) => {
      return {
        ...prev,
        [editRecord.id]: [
          ...(prev[editRecord.id] || []),
          { time: changes.time, changes: changedFields },
        ],
      };
    });
  }

  setRecords((prev) =>
    prev.map((r) => (r.id === editRecord.id ? editRecord : r))
  );
  setEditRecord(null);
};


  const handleNewRecordChange = (field, value) => {
    setNewRecord((prev) => ({ ...prev, [field]: value }));
  };

  const saveNewRecord = () => {
    setRecords((prev) => [...prev, newRecord]);
    setNewRecord(null);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toString().includes(search)
  );

  return (
    <div className="p-4">
      <h8 className="text-2xl font-bold mb-8 ">Quản lý lịch hẹn</h8>
      <div className="flex justify-between items-center mb-4 mt-4">

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Tìm theo mã hoặc tên bệnh nhân..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() =>
            setNewRecord({
              id: Date.now(),
              patient: "",
              doctor: "",
              diagnosis: "",
              prescription: "",
              createdAt: new Date().toISOString().split("T")[0],
            })
          }
        >
          + Thêm hồ sơ
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Bệnh nhân</th>
              <th className="py-3 px-4">Bác sĩ</th>
              <th className="py-3 px-4">Chuẩn đoán</th>
              <th className="py-3 px-4">Đơn thuốc</th>
              <th className="py-3 px-4">Ngày tạo</th>
              <th className="py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.patient}</td>
                <td className="py-3 px-4">{item.doctor}</td>
                <td className="py-3 px-4">{item.diagnosis}</td>
                <td className="py-3 px-4">{item.prescription}</td>
                <td className="py-3 px-4">{item.createdAt}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => setEditRecord(item)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Sửa"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Xóa"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => setViewHistoryId(item.id)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Lịch sử"
                  >
                    <FiClock />
                  </button>
                  <button
                    onClick={() => handleDownload(item)}
                    className="text-green-600 hover:text-green-800"
                    title="Tải Word"
                  >
                    <FiDownload />
                  </button>
                </td>
              </tr>
            ))}
            {filteredRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  Không tìm thấy hồ sơ phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <ModalConfirm
          title="Xác nhận xóa"
          message="Bạn có chắc chắn muốn xóa hồ sơ này?"
          onCancel={() => setDeleteId(null)}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}

      {editRecord && (
        <ModalForm
          title="Sửa hồ sơ"
          record={editRecord}
          onChange={handleEditChange}
          onCancel={() => setEditRecord(null)}
          onSave={saveEdit}
        />
      )}

      {newRecord && (
        <ModalForm
          title="Thêm hồ sơ mới"
          record={newRecord}
          onChange={handleNewRecordChange}
          onCancel={() => setNewRecord(null)}
          onSave={saveNewRecord}
        />
      )}

      {viewHistoryId && (
        <ModalHistory
          history={editHistory[viewHistoryId] || []}
          onClose={() => setViewHistoryId(null)}
        />
      )}
    </div>
  );
};

// Sub-components
const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

const ModalForm = ({ title, record, onChange, onCancel, onSave }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
    <div className="bg-white rounded shadow p-6 w-full max-w-lg">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        <Input label="Bệnh nhân" value={record.patient} onChange={(val) => onChange("patient", val)} />
        <Input label="Bác sĩ" value={record.doctor} onChange={(val) => onChange("doctor", val)} />
        <Input label="Chuẩn đoán" value={record.diagnosis} onChange={(val) => onChange("diagnosis", val)} />
        <Input label="Đơn thuốc" value={record.prescription} onChange={(val) => onChange("prescription", val)} />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 border rounded">Hủy</button>
        <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu</button>
      </div>
    </div>
  </div>
);

const ModalConfirm = ({ title, message, onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
    <div className="bg-white rounded shadow p-6 w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <p>{message}</p>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onCancel} className="px-4 py-2 border rounded">Hủy</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Xóa</button>
      </div>
    </div>
  </div>
);

const ModalHistory = ({ history, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
    <div className="bg-white rounded shadow p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Lịch sử chỉnh sửa</h2>
      {history.length > 0 ? (
        <ul className="space-y-3 text-sm">
          {history.map((entry, idx) => (
            <li key={idx} className="border p-3 rounded">
              <p className="text-gray-500 mb-1">🕒 {entry.time}</p>
              {Object.keys(entry.changes).map((field, fieldIdx) => (
                <div key={fieldIdx}>
                  <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {entry.changes[field]}
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Chưa có thay đổi nào được ghi nhận.</p>
      )}
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 border rounded">Đóng</button>
      </div>
    </div>
  </div>
);


export default MedicalRecordManagement;
