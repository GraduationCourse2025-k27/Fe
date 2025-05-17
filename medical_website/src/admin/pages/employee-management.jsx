import React, { useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const initialEmployees = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    phone: "0901234567",
    address: "123 Đường Lê Lợi, TP.HCM",
  },
  {
    id: 2,
    name: "Trần Thị B",
    phone: "0912345678",
    address: "456 Đường Nguyễn Trãi, Hà Nội",
  },
  {
    id: 3,
    name: "Lê Văn C",
    phone: "0987654321",
    address: "789 Đường Trần Hưng Đạo, Đà Nẵng",
  },
  // 👉 Thêm nhiều bản ghi giả để test phân trang
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 4,
    name: `Nhân viên ${i + 4}`,
    phone: `09000000${i}`,
    address: `Địa chỉ số ${i + 4}`,
  })),
];

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  // ✅ Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm) ||
      emp.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (employee = null) => {
    setEditingEmployee(employee);
    setForm(employee || { name: "", phone: "", address: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setForm({ name: "", phone: "", address: "" });
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...form } : emp))
      );
    } else {
      const newEmployee = {
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
        ...form,
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này không?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold ml-8">Quản lý nhân viên</h2>

      {/* Tìm kiếm + Thêm */}
      <div className="flex justify-between items-center mt-2 mb-4 ml-8 mr-8">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, số điện thoại, địa chỉ..."
            className="border pl-10 pr-3 py-2 rounded w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset trang khi tìm kiếm
            }}
          />
        </div>

        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => openModal()}
        >
          + Thêm nhân viên
        </button>
      </div>

      {/* Danh sách nhân viên */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-white shadow rounded overflow-hidden h-[70vh] flex flex-col">
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-600 text-left text-sm">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Địa chỉ</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {displayedEmployees.map((emp) => (
                  <tr key={emp.id} className="!border-t !border-gray-300">
                    <td className="py-3 px-4">{emp.id}</td>
                    <td className="py-3 px-4">{emp.name}</td>
                    <td className="py-3 px-4">{emp.phone}</td>
                    <td className="py-3 px-4">{emp.address}</td>
                    <td className="py-3 px-4 flex gap-3 items-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-lg"
                        onClick={() => openModal(emp)}
                        title="Sửa"
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 text-lg"
                        onClick={() => handleDelete(emp.id)}
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {displayedEmployees.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      Không tìm thấy nhân viên nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 py-3 border-t border-gray-200">
              <button
                className="px-2 py-1 text-gray-600 hover:text-black"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <BiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-2 py-1 text-gray-600 hover:text-black"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <BiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal thêm/sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingEmployee ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tên"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
