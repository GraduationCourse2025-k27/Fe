import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { PencilLine, Trash, Plus } from "lucide-react";

// 🔒 Giả lập mã nhân viên từ người dùng đăng nhập (có thể thay bằng lấy từ AuthContext, Redux, v.v.)
const currentEmployeeId = "EMP999"; // 👈 Thay bằng ID thực tế khi tích hợp đăng nhập

const initialArticles = [
  {
    id: "ART001",
    employeeId: "EMP001",
    title: "Khám sức khỏe định kỳ: Cần hay không?",
    content: "Việc khám sức khỏe định kỳ giúp phát hiện sớm bệnh lý và nâng cao chất lượng sống...",
    createdAt: "2024-12-01",
    images: [
      "https://via.placeholder.com/200x150?text=Image+1",
      "https://via.placeholder.com/200x150?text=Image+2",
    ],
  },
];

const ArticleManagement = () => {
  const [articles, setArticles] = useState(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState([]);

  const openAddModal = () => {
    setSelectedArticle({
      id: "",
      employeeId: currentEmployeeId,
      title: "",
      content: "",
      createdAt: new Date().toISOString().split("T")[0],
      images: [],
    });
    setImages([]);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setImages(article.images || []);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const saveArticle = () => {
    const newArticle = { ...selectedArticle, images };
    if (isEditing) {
      setArticles(articles.map((a) => (a.id === newArticle.id ? newArticle : a)));
    } else {
      const newId = `ART${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
      setArticles([...articles, { ...newArticle, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    setArticles(articles.filter((a) => a.id !== selectedArticle.id));
    setIsDeleteConfirmOpen(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const handleImageDelete = (imageUrl) => {
    setImages(images.filter((image) => image !== imageUrl));
  };

  return (
    <div className="flex flex-col gap-4 px-2 ">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus size={18} /> Thêm bài viết
        </button>
      </div>
 <div className="flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-[1280px] bg-white border rounded overflow-hidden flex flex-col h-[80vh]">
            <div className="flex-grow overflow-y-auto">

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">Mã bài</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Nhân viên</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Tiêu đề</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Ngày đăng</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="!border-t !border-gray-300">
                <td className="py-4 px-4 text-sm">{article.id}</td>
                <td className="py-4 px-4 text-sm">{article.employeeId}</td>
                <td className="py-4 px-4 text-sm font-semibold">{article.title}</td>
                <td className="py-4 px-4 text-sm">{article.createdAt}</td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex gap-x-3">
                    <button onClick={() => openEditModal(article)} className="text-blue-500">
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setIsDeleteConfirmOpen(true);
                      }}
                      className="text-red-500"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="w-full max-w-3xl bg-white rounded-xl p-8 shadow-lg overflow-y-auto max-h-[80vh]">
          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {isEditing ? "Sửa bài viết" : "Thêm bài viết"}
          </Dialog.Title>

          {selectedArticle && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-screen-sm mx-auto">
            {/* Cột 1 - Thông tin bài viết */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Mã nhân viên</label>
                <input
                  type="text"
                  value={currentEmployeeId}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-xs cursor-not-allowed"
                />
              </div>
          
              <div>
                <label className="block text-xs font-medium text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={selectedArticle.title}
                  onChange={(e) =>
                    setSelectedArticle({ ...selectedArticle, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
          
              <div>
                <label className="block text-xs font-medium text-gray-700">Ngày đăng</label>
                <input
                  type="text"
                  value={new Date().toLocaleDateString()}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-xs cursor-not-allowed"
                />
              </div>
            </div>
          
            {/* Cột 2 - Nội dung & Ảnh */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Nội dung</label>
                <textarea
                  value={selectedArticle.content}
                  onChange={(e) =>
                    setSelectedArticle({ ...selectedArticle, content: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Nhập nội dung bài viết"
                />
              </div>
          
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Ảnh bài viết</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center gap-1 bg-gray-500 text-white font-medium py-1.5 px-4 text-xs rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer"
                  >
                    <span>Thêm ảnh</span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex flex-wrap gap-2 mt-1">
                    {images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`img-${index}`}
                          className="w-20 h-20 object-cover rounded-lg border shadow-sm"
                        />
                        <button
                          onClick={() => handleImageDelete(imageUrl)}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                          title="Xoá ảnh"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          
            {/* Nút hành động */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-x-2 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-300"
              >
                Huỷ
              </button>
              <button
                onClick={saveArticle}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"
              >
                {isEditing ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
          
          )}
        </Dialog.Panel>
      </div>
    </Dialog>


      {/* Modal Xác nhận xoá */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Xác nhận xoá</Dialog.Title>
            <p className="mb-4">
              Bạn có chắc chắn muốn xoá bài viết <strong>{selectedArticle?.id}</strong>?
            </p>
            <div className="flex justify-end gap-x-2">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Huỷ
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Xoá
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
    </div>
    </div>
    </div>


  );
};

export default ArticleManagement;
