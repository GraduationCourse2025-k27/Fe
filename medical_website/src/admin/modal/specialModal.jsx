import { useState } from "react";

export const SpecialtyModal = ({ specialty, onClose, onSave, onUpdate }) => {
  const [formData, setFormData] = useState({
    imagePath: specialty?.imagePath || "",
    name: specialty?.name || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.value;
    try {
      if (formAction === "add") {
        onSave(formData);
      } else if (formAction === "update") {
        onUpdate(specialty?.id, formData);
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
          {isEmptyObject(specialty) === false
            ? "Cập nhật chuyên khoa"
            : "Thêm chuyên khoa"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Ảnh</label>
            <input
              type="text"
              name="imagePath"
              value={formData.imagePath}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1">Tên chuyên khoa</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
              value={isEmptyObject(specialty) ? "add" : "update"}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEmptyObject(specialty) ? "Lưu" : "cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
