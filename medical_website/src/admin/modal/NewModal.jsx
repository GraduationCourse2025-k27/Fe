import React, { useState } from "react";
export default function NewModal({ article, onClose, onSave, onUpdate }) {
  const [formData, setFormData] = useState({
    customerSupportId: 3,
    title: article?.title || "",
    imagePath: article?.imagePath || "",
    content: article?.content || "",
  });

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isEmptyObject = (obj) => {
    return Object.keys(obj || {}).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.value;
    try {
      if (formAction === "add") {
        const updateFormData = {
          ...formData,
          customerSupportId: parseInt(formData.customerSupportId, 10),
        };
        onSave(updateFormData);
      } else if (formAction === "update") {
        const updateFormData = {
          ...formData,
          customerSupportId: parseInt(formData.customerSupportId, 10),
        };
        console.log(updateFormData);

        onUpdate(updateFormData, article?.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isEmptyObject(article) === false ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}
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
                required={isEmptyObject(article) && !formData.imagePath}
              />
            </div>
            {/* Hiển thị ảnh chọn được */}
            {formData.imagePath && (
              <img
                src={formData.imagePath}
                alt="Ảnh Bài báo"
                className="ml-4 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          <div>
            <label className="block mb-1">Tiêu Đề</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1">Nội Dung</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="4"
              required
            />
          </div>
          {/* Hidden doctorId */}
          <input
            type="hidden"
            name="customerSupportId"
            value={formData.customerSupportId}
          />

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
              value={isEmptyObject(article) ? "add" : "update"}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEmptyObject(article) === false ? "Lưu" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
