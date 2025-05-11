import { useState } from "react";
import { PencilLine, Trash, Plus, FileDown, History } from "lucide-react";

// Dữ liệu giả định về bệnh nhân và bác sĩ
const initialPatients = [
  { id: 1, name: "Nguyễn Văn A" },
  { id: 2, name: "Trần Thị B" },
];

const initialDoctors = [
  { id: 1, name: "Nguyễn Văn C" },
  { id: 2, name: "Trần Thị D" },
];

const initialMedicalRecords = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    diagnosis: "Cảm cúm",
    notes: "Nghỉ ngơi và uống thuốc cảm.",
    createdAt: "2025-05-01",
    prescription: "Paracetamol, Vitamin C",
    editHistory: [
      { date: "2025-05-01", changes: "Thêm đơn thuốc Paracetamol, Vitamin C" },
    ],
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    diagnosis: "Viêm họng",
    notes: "Dùng thuốc kháng sinh.",
    createdAt: "2025-05-02",
    prescription: "Amoxicillin, Strepsils",
    editHistory: [
      { date: "2025-05-02", changes: "Cập nhật đơn thuốc Amoxicillin, Strepsils" },
    ],
  },
];

const MedicalRecordsPage = () => {
  const [medicalRecords, setMedicalRecords] = useState(initialMedicalRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState(null);
  const [historyModal, setHistoryModal] = useState(null);

  const openModal = (record = null) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setIsModalOpen(false);
  };

  const handleSave = (data) => {
    if (data.id) {
      setMedicalRecords((prev) =>
        prev.map((r) => (r.id === data.id ? { ...data, createdAt: r.createdAt } : r))
      );
    } else {
      const newRecord = { ...data, id: Date.now(), createdAt: new Date().toISOString().split("T")[0] };
      setMedicalRecords([...medicalRecords, newRecord]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setMedicalRecords(medicalRecords.filter((r) => r.id !== id));
  };

  const getPatientName = (id) => initialPatients.find((p) => p.id === id)?.name || "Không rõ";
  const getDoctorName = (id) => initialDoctors.find((d) => d.id === id)?.name || "Không rõ";

  const filteredMedicalRecords = medicalRecords.filter((r) =>
    getPatientName(r.patientId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadWord = (record) => {
    const content = `
      Hồ sơ bệnh án
      - Bệnh nhân: ${getPatientName(record.patientId)}
      - Bác sĩ: ${getDoctorName(record.doctorId)}
      - Chuẩn đoán: ${record.diagnosis}
      - Ghi chú: ${record.notes}
      - Ngày tạo: ${record.createdAt}
      - Đơn thuốc: ${record.prescription}
    `;
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `HoSoBenhAn.doc`;
    link.click();
  };

  const handleHistory = (record) => {
    setHistoryModal(record);
  };

  const closeHistoryModal = () => {
    setHistoryModal(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <h8 className="text-2xl font-bold">Quản lý hồ sơ bệnh án</h8>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <input
          type="text"
          placeholder="Tìm theo tên bệnh nhân..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal()}
        >
          <Plus size={18} /> Thêm hồ sơ bệnh án
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Bệnh nhân</th>
              <th className="px-4 py-2">Bác sĩ</th>
              <th className="px-4 py-2">Chuẩn đoán</th>
              <th className="px-4 py-2">Đơn thuốc</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicalRecords.length > 0 ? (
              filteredMedicalRecords.map((record, index) => (
                <tr key={record.id} className="text-left">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{getPatientName(record.patientId)}</td>
                  <td className="px-4 py-2">{getDoctorName(record.doctorId)}</td>
                  <td className="px-4 py-2">{record.diagnosis}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => setPrescriptionModal(record)}
                    >
                      Xem
                    </button>
                  </td>
                  <td className="px-4 py-2">{record.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      <button className="text-blue-500" onClick={() => openModal(record)}>
                        <PencilLine size={20} />
                      </button>
                      <button className="text-red-500" onClick={() => handleDelete(record.id)}>
                        <Trash size={20} />
                      </button>
                      <button onClick={() => handleDownloadWord(record)} className="text-green-600">
                        <FileDown size={20} />
                      </button>
                      <button onClick={() => handleHistory(record)} className="text-gray-700">
                        <History size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">Không có hồ sơ bệnh án nào phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <MedicalRecordModal
          record={selectedRecord}
          onClose={closeModal}
          onSave={handleSave}
          patients={initialPatients}
          doctors={initialDoctors}
        />
      )}

      {prescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Chi tiết đơn thuốc</h3>
            <p>{prescriptionModal.prescription}</p>
            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setPrescriptionModal(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {historyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Lịch sử chỉnh sửa</h3>
            <ul>
              {historyModal.editHistory.map((history, index) => (
                <li key={index} className="mb-2">
                  <strong>{history.date}</strong>: {history.changes}
                </li>
              ))}
            </ul>
            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={closeHistoryModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal thêm/sửa hồ sơ bệnh án
const MedicalRecordModal = ({ record, onClose, onSave, patients, doctors }) => {
  const [formData, setFormData] = useState({
    id: record?.id || null,
    patientId: record?.patientId || "",
    doctorId: record?.doctorId || "",
    diagnosis: record?.diagnosis || "",
    notes: record?.notes || "",
    prescription: record?.prescription || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
<div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto box-border">
    <h2 className="text-xl font-semibold mb-4 text-center">
      {record ? "Cập nhật" : "Thêm"} hồ sơ bệnh án
    </h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col text-left">
        <label className="mb-1 font-medium pl-2">Bệnh nhân</label>
        <select
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-full box-border"
        >
          <option value="">-- Chọn bệnh nhân --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-left">
        <label className="mb-1 font-medium pl-2">Bác sĩ</label>
        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-full box-border"
        >
          <option value="">-- Chọn bác sĩ --</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col text-left">
        <label className="mb-1 font-medium pl-2">Chuẩn đoán</label>
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-full box-border"
        />
      </div>

      <div className="flex flex-col text-left">
        <label className="mb-1 font-medium pl-2">Ghi chú</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-full box-border resize-none"
        ></textarea>
      </div>

      <div className="flex flex-col text-left">
        <label className="mb-1 font-medium pl-2">Đơn thuốc</label>
        <input
          type="text"
          name="prescription"
          value={formData.prescription}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-full box-border"
        />
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition w-full"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
        >
          Lưu
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default MedicalRecordsPage;