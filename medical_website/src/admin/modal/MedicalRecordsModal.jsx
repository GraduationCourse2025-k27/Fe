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
    doctorId: 10,
    clientId: record?.client?.id || "",
    diagnosis: record?.diagnosis || "",
    note: record?.note || "",
    namePatient: record?.namePatient || "",
    birthDatePatient: record?.birthDatePatient || "",
    gender: record?.gender || "",
    prescription: record?.prescription || "",
  });

  useEffect(() => {
    if (clients) {
      fecthClients();
    }
  }, [clients]);

  console.log("FormData", formData);

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
          birthDatePatient: formatDate(record?.birthDatePatient),
        };
        onUpdate(record?.id, updateFormData);
        console.log("update");
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto box-border">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEmptyObject(record) === false ? "Cập nhật" : "Thêm"} hồ sơ bệnh án
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium pl-2">Người giám hộ </label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border"
            >
              <option value="">-- Chọn người giám hộ --</option>
              {customers.length > 0 &&
                customers.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client?.email || "Unknown User"}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col text-left">
            <input
              type="text"
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border"
              hidden
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium pl-2">Bệnh nhân</label>
            <input
              type="text"
              name="namePatient"
              value={formData.namePatient}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border"
            />
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
            <label className="mb-1 font-medium pl-2">Đơn thuốc</label>
            <input
              type="text"
              name="prescription"
              value={formData.prescription}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border resize-none"
            ></input>
          </div>

          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium pl-2">
              Ngày sinh bệnh nhân{" "}
            </label>
            <input
              type="text"
              name="birthDatePatient"
              value={
                formData.birthDatePatient
                  ? formatDate(formData.birthDatePatient)
                  : ""
              }
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium pl-2">Giới tính </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border"
            />
          </div>
          <div className="flex flex-col text-left">
            <label className="mb-1 font-medium pl-2">notes</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full box-border resize-none"
            ></textarea>
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
              name="action"
              value={isEmptyObject(record) ? "add" : "update"}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
            >
              {isEmptyObject(record) === false ? "Lưu" : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
