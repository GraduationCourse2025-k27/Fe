import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaStar } from "react-icons/fa";
import { PencilLine, Trash } from "lucide-react";
import { Dialog } from "@headlessui/react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const medicalServices = [
  { id: "DV001", name: "Khám tổng quát", description: "Dành cho mọi đối tượng", category: "Khám bệnh", price: 300000, rating: 4.8, usage: 120, feedbacks: 90 },
  { id: "DV002", name: "Xét nghiệm máu", description: "Kiểm tra sức khỏe tổng thể", category: "Xét nghiệm", price: 150000, rating: 4.5, usage: 80, feedbacks: 60 },
  { id: "DV003", name: "Chụp X-Quang", description: "Chẩn đoán hình ảnh", category: "Chẩn đoán", price: 200000, rating: 4.7, usage: 50, feedbacks: 45 },
  { id: "DV004", name: "Siêu âm tổng quát", description: "Chẩn đoán hình ảnh", category: "Chẩn đoán", price: 250000, rating: 4.6, usage: 70, feedbacks: 60 },
  { id: "DV005", name: "Nội soi dạ dày", description: "Kiểm tra tiêu hoá", category: "Nội soi", price: 500000, rating: 4.4, usage: 40, feedbacks: 35 },
  { id: "DV006", name: "Đo điện tim", description: "Kiểm tra tim mạch", category: "Chẩn đoán", price: 180000, rating: 4.3, usage: 60, feedbacks: 50 },
];

const usageChartData = {
  labels: medicalServices.map((service) => service.name),
  datasets: [{
    label: "Số lượng sử dụng",
    data: medicalServices.map((service) => service.usage),
    backgroundColor: "rgb(171, 4, 4)",
    borderWidth: 1,
  }],
};

const feedbackChartData = {
  labels: medicalServices.map((service) => service.name),
  datasets: [
    {
      label: "Phản hồi tốt",
      data: medicalServices.map((service) => service.feedbacks),
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      borderColor: "rgba(34, 197, 94, 1)",
      borderWidth: 1,
    },
    {
      label: "Phản hồi xấu",
      data: medicalServices.map((service) => service.usage - service.feedbacks),
      backgroundColor: "rgba(220, 38, 38, 0.5)",
      borderColor: "rgba(220, 38, 38, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: { legend: { position: "top" } },
  scales: {
    x: { ticks: { maxRotation: 0, minRotation: 0 }, grid: { display: false } },
    y: { beginAtZero: true },
  },
};

const ServiceManagement = () => {
  const chartWidth = Math.max(600, medicalServices.length * 140);
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDelete = (service) => {
    setSelectedService(service);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    // Xoá dịch vụ khỏi danh sách
    const updatedServices = medicalServices.filter(service => service.id !== selectedService.id);
    // TODO: Cập nhật lại dữ liệu
    setIsDeleteConfirmOpen(false);
  };

  const handleSaveEdit = () => {
    // Cập nhật dịch vụ với các giá trị mới
    const updatedServices = medicalServices.map(service => 
      service.id === selectedService.id ? selectedService : service
    );
    // TODO: Cập nhật lại dữ liệu
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <h8 className="text-2xl font-bold">Quản lý dịch vụ y tế</h8>
      <div className="flex flex-col lg:flex-row gap-1">
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h5 className="text-xl font-semibold text-slate-700 mb-4">Số lượng sử dụng dịch vụ trong tháng</h5>
          <div className="overflow-x-auto">
            <div style={{ width: chartWidth }}>
              <Bar data={usageChartData} options={options} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h5 className="text-xl font-semibold text-slate-700 mb-4">Thống kê phản hồi dịch vụ trong tháng</h5>
          <div className="overflow-x-auto">
            <div style={{ width: chartWidth }}>
              <Bar data={feedbackChartData} options={options} />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-slate-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white ">Mã</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white ">Tên dịch vụ</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white ">Loại hình</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white ">Giá</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-white ">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {medicalServices.map((service) => (
              <tr key={service.id} className="border-t border-gray-200 ">
                <td className="py-4 px-4 text-sm text-slate-600 ">{service.id}</td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex items-center gap-x-4">
                    <div className="flex flex-col">
                      <p className="font-semibold text-slate-800 ">{service.name}</p>
                      <p className="text-xs text-slate-600">{service.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-slate-600 ">{service.category}</td>
                <td className="py-4 px-4 text-sm text-blue-600 font-semibold">{service.price.toLocaleString()}₫</td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex items-center gap-x-4">
                    <button onClick={() => handleEdit(service)} className="text-blue-500 dark:text-blue-600">
                      <PencilLine size={20} />
                    </button>
                    <button onClick={() => handleDelete(service)} className="text-red-500">
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal sửa */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Sửa dịch vụ</Dialog.Title>
            {selectedService && (
              <div className="space-y-4">
                {/* Tạo các trường nhập liệu cho các thuộc tính khác của dịch vụ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên dịch vụ</label>
                  <input
                    type="text"
                    value={selectedService.name}
                    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mô tả dịch vụ</label>
                  <textarea
                    value={selectedService.description}
                    onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giá dịch vụ</label>
                  <input
                    type="number"
                    value={selectedService.price}
                    onChange={(e) => setSelectedService({ ...selectedService, price: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-x-2">
                  <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded">
                    Huỷ
                  </button>
                  <button onClick={handleSaveEdit} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Lưu
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal xác nhận xoá */}
      <Dialog open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">Xác nhận xoá</Dialog.Title>
            <p className="mb-4">Bạn có chắc chắn muốn xoá dịch vụ <strong>{selectedService?.name}</strong>?</p>
            <div className="flex justify-end gap-x-2">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Huỷ</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Xoá</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ServiceManagement;
