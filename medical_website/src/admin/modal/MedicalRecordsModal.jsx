import { useEffect, useState } from "react";
import { formatDate } from "../../validation/common/FormatDate";

export const MedicalRecordModal = ({
  onClose,
  onSave,
  clients,
  onUpdate,
  record,
}) => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: localStorage.getItem("id") || "",
    clientId: record?.client?.id || "",
    diagnosis: record?.diagnosis || "",
    note: record?.note || "",
    namePatient: record?.namePatient || "",
    birthDatePatient: record?.birthDatePatient || "",
    gender: record?.gender || "",
    prescription: record?.prescription || "",
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const newDoctorId = localStorage.getItem("id") || "";
      setFormData((prev) => ({ ...prev, doctorId: newDoctorId }));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (clients) {
      fecthClients();
    }
  }, [clients]);

  const fecthClients = async () => {
    try {
      const clientsData = await clients;
      setCustomers(clientsData);
    } catch (error) {
      setCustomers([]);
      console.error("Lỗi khi lấy danh sách người dùng :", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.value;
    try {
      if (!formData.doctorId) {
        console.error("Không tìm thấy doctorId trong localStorage");
        return;
      }
      if (formAction === "add") {
        const updateFormData = {
          ...formData,
          clientId: parseInt(formData.clientId, 10),
          doctorId: parseInt(formData.doctorId, 10),
        };
        onSave(updateFormData);
      } else if (formAction === "update") {
        const updateFormData = {
          ...formData,
          clientId: parseInt(formData.clientId, 10),
          doctorId: parseInt(formData.doctorId, 10),
        };
        onUpdate(record?.id, updateFormData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };
  const isEmptyObject = (obj) => {
    return Object.keys(obj || {}).length === 0;
  };

  return (
    <div className="fixed inset-0 flex items-center ml-90 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto ">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isEmptyObject(record) ? "Thêm" : "Cập nhật"} hồ sơ bệnh án
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Người giám hộ */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Người giám hộ</label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            >
              <option value="">-- Chọn người giám hộ --</option>
              {customers.map((client) => (
                <option key={client.id} value={client.id}>
                  {client?.email || "Unknown User"}
                </option>
              ))}
            </select>
          </div>

          {/* Tên bệnh nhân */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Tên bệnh nhân</label>
            <input
              type="text"
              name="namePatient"
              value={formData.namePatient}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* Ngày sinh */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Ngày sinh</label>
            <input
              type="text"
              name="birthDatePatient"
              value={formData.birthDatePatient}
              onChange={handleChange}
              required={isEmptyObject(record)}
              placeholder="Nhập dúng định dạng dd/MM/yyyy"
              className="border px-3 py-2 rounded"
            />
          </div>
          {/* Giới tính */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Giới tính</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          {/* Chuẩn đoán */}
          <div className="flex flex-col lg:col-span-2">
            <label className="font-medium mb-1">Chuẩn đoán</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded"
            />
          </div>

          {/* Đơn thuốc */}
          <div className="flex flex-col lg:col-span-3">
            <label className="font-medium mb-1">Đơn thuốc</label>
            <textarea
              name="prescription"
              value={formData.prescription}
              onChange={handleChange}
              required
              rows={2}
              className="border px-3 py-2 rounded resize-none"
            ></textarea>
          </div>

          {/* Ghi chú */}
          <div className="flex flex-col lg:col-span-3">
            <label className="font-medium mb-1">Ghi chú</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              rows={2}
              className="border px-3 py-2 rounded resize-none"
            ></textarea>
          </div>

          {/* Hidden doctorId */}
          <input type="hidden" name="doctorId" value={formData.doctorId} />

          {/* Nút hành động */}
          <div className="flex justify-end lg:col-span-3 gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              name="action"
              value={isEmptyObject(record) ? "add" : "update"}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isEmptyObject(record) ? "Tạo" : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
