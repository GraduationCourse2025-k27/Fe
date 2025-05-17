import { useEffect, useState } from "react";

export const DoctorModal = ({
  doctor,
  onClose,
  onSave,
  specialties,
  clients,
  onUpdate,
}) => {
  const [specialities, setSpecialities] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    imagePath: doctor?.imagePath || "",
    description: doctor?.description || "",
    price: doctor?.examinationPrice || "",
    speciality: doctor?.speciality?.id || "",
    client: doctor?.client?.id || "",
    fullName: doctor?.client?.fullName || "",
  });

  useEffect(() => {
    if (specialties && clients) {
      Promise.all([fetchSpecialties(), fetchClients()]);
    } else {
      console.error("Hàm specialties không được cung cấp");
    }
  }, [specialties, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSpecialties = async () => {
    try {
      const specialityData = await specialties;
      setSpecialities(specialityData);
    } catch (error) {
      setSpecialities([]);
      console.error("Lỗi khi lấy danh sách chuyên khoa:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const clientsData = await clients;
      setCustomers(clientsData);
    } catch (error) {
      setCustomers([]);
      console.error("Lỗi khi lấy danh sách người dùng :", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Tạo URL cho file ảnh đã chọn
      const imageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imagePath: imageUrl,  // Lưu URL tạm thời của ảnh vào formData
      });
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const formAction = e.nativeEvent.submitter.value;

  try {
    // Kiểm tra bắt buộc ảnh nếu đang thêm mới
    if (formAction === "add" && !formData.imagePath) {
      alert("Vui lòng chọn ảnh bác sĩ trước khi thêm.");
      return;
    }

    if (formAction === "add") {
      const { fullName, ...restFormData } = formData;
      const updatedFormData = {
        ...restFormData,
        speciality: parseInt(formData.speciality, 10),
        client: parseInt(formData.client, 10),
        price: parseFloat(formData.price),
        imagePath: formData.imagePath,
      };
      onSave(updatedFormData);
    } else if (formAction === "update") {
      const { client, ...restFormData } = formData;
      const updatedFormData = {
        ...restFormData,
        speciality: parseInt(formData.speciality, 10),
        price: parseFloat(formData.price),
        imagePath: formData.imagePath, // giữ ảnh cũ nếu không đổi
      };
      onUpdate(doctor?.id, updatedFormData);
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
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEmptyObject(doctor) === false ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4  ">
          <div className="flex-1">
            <label className="block mb-1">Ảnh</label>
            <input
              type="file"
              name="imagePath"
              onChange={handleImageChange}
              accept="image/*"
              className="border px-3 py-2 rounded w-full bg-gray-300"
              required={isEmptyObject(doctor) && !formData.imagePath}
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
          <div>
            <label className="block mb-1">Chuyên khoa</label>
            <select
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">-- Chọn chuyên khoa --</option>
              {specialities.length > 0 &&
                specialities.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
            </select>
          </div>

          {isEmptyObject(doctor) === true ? (
            <div>
              <label className="block mb-1">Danh sách người dùng</label>
              <select
                name="client"
                value={formData.client}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">-- Chọn người dùng --</option>
                {customers.length > 0 &&
                  customers.map((client) => (
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

          <div>
            <label className="block mb-1">Mô tả của bác sĩ</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Giá khám</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>

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
              value={isEmptyObject(doctor) ? "add" : "update"}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEmptyObject(doctor) === false ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
