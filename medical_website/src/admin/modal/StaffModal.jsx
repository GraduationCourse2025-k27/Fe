import React, { useEffect, useState } from "react";

export default function StaffModal({
  employee,
  onClose,
  onSave,
  clients,
  onUpdate,
}) {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    imagePath: employee?.imagePath || "",
    clientId: employee?.client?.id || "",
    fullName: employee?.client?.fullName || "",
    address: employee?.client?.address || "",
    phone: employee?.client?.phone || "",
  });

  useEffect(() => {
    if (clients) {
      Promise.all([fetchClientsData()]);
    } else {
      console.error("Không tải được dữ liệu danh sách clients");
    }
  }, [clients]);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleSumit = (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.value;
    try {
      if (formAction === "add" && !formData.imagePath) {
        alert("Vui lòng chọn ảnh nhân viên trước khi thêm.");
        return;
      }

      if (formAction === "add") {
        const { fullName, phone, address, ...restFormData } = formData;
        const updateFormData = {
          ...restFormData,
          clientId: parseInt(formData.clientId, 10),
        };
        onSave(updateFormData);
      } else if (formAction === "update") {
        const { clientId, ...restFormData } = formData;
        onUpdate(employee?.id, restFormData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imagePath: imageUrl,
      });
    }
  };

  const fetchClientsData = async () => {
    try {
      const clientsData = await clients;
      setUsers(clientsData);
    } catch (error) {
      setUsers([]);
      console.error("Lỗi khi lấy danh sách người dùng :", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEmptyObject(employee) === false
            ? "Cập nhật Nhân viên"
            : "Thêm Nhân viên"}
        </h2>
        <form onSubmit={handleSumit} className="space-y-4">
          <div className="flex items-center space-x-4  ">
            <div className="flex-1">
              <label className="block mb-1">Ảnh</label>
              <input
                type="file"
                name="imagePath"
                onChange={handleImageChange}
                accept="image/*"
                className="border px-3 py-2 rounded w-full bg-gray-300"
                required={isEmptyObject(employee) && !formData.imagePath}
              />
            </div>

            {/* Hiển thị ảnh chọn được */}
            {formData.imagePath && (
              <img
                src={formData.imagePath}
                alt="Ảnh bác sĩ"
                className="ml-4 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          {!isEmptyObject(employee) && (
            <div>
              <label className="block mb-1">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          {isEmptyObject(employee) === true ? (
            <div>
              <label className="block mb-1">Danh sách người dùng</label>
              <select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">-- Chọn người dùng --</option>
                {users.length > 0 &&
                  users.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client?.email || "Unknown User"}
                    </option>
                  ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block mb-1">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          {!isEmptyObject(employee) && (
            <div>
              <label className="block mb-1">Địa Chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              name="action"
              value={isEmptyObject(employee) ? "add" : "update"}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEmptyObject(employee) === false ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
