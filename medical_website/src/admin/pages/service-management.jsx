import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast, ToastContainer } from "react-toastify";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PencilLine, Plus, Trash } from "lucide-react";
import { Dialog } from "@headlessui/react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import * as MedicaService from "../service/admin/MedicalTypeService";
import ServiceDeleteModal from "../modal/ServiceDeleteModal";

const options = {
  responsive: true,
  plugins: { legend: { position: "top" } },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 0,
        minRotation: 0,
      },
      grid: { display: false },
    },
    y: { beginAtZero: true },
  },
};
const ServiceManagement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [medicalTypeUsages, setMedicalTypeUsage] = useState([]);
  const [medicalTypeReviews, setMedicalTypeReviews] = useState([]);
  const [medicalServices, setMedicalServices] = useState([]);
  const [medicalService, setMedicalService] = useState({});
  const [formData, setFormData] = useState({
    nameService: "",
    price: "",
    description: "",
    imagePath: "",
  });
  const chartWidthMedicalTypeUsages = Math.max(
    600,
    medicalTypeUsages.length * 140
  );
  const chartWidthMedicalTypeReviews = Math.max(
    600,
    medicalTypeReviews.length * 140
  );
  const usageChartData = {
    labels: medicalTypeUsages.map((service) => service.name.trim()),

    datasets: [
      {
        label: "Số lượng sử dụng",
        data: medicalTypeUsages.map((service) => service.usage),
        backgroundColor: "rgb(171, 4, 4)",
        borderWidth: 1,
      },
    ],
  };

  const feedbackChartData = {
    labels: medicalTypeReviews.map((service) => service.nameService.trim()),
    datasets: [
      {
        label: "Phản hồi tốt",
        data: medicalTypeReviews.map((service) => service.good),
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
      {
        label: "Phản hồi xấu",
        data: medicalTypeReviews.map((service) => service.bad),
        backgroundColor: "rgba(220, 38, 38, 0.5)",
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchMedicalServiceData = async () => {
      try {
        await Promise.all([
          getAllMedicalTypeReviews(),
          getAllMedicalTypeUsages(),
          getAllMedical(),
        ]);
      } catch (error) {
        console.error("Lỗi khi loading api ");
      }
    };
    fetchMedicalServiceData();
  }, []);

  const openModal = async (medicalService = {}, action) => {
    if (action === "save") {
      setFormData({});
      setMedicalService({});
    }
    if (medicalService && action === "edit") {
      await handleServiceById(medicalService?.id);
    }
    setIsEditModalOpen(true);
  };

  const handleDelete = (service) => {
    setMedicalService(service);
    setIsDeleteConfirmOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllMedicalTypeUsages = async () => {
    try {
      const result = await MedicaService.getMedicalTypeUsage();
      if (result) {
        setMedicalTypeUsage(result);
      } else {
        setMedicalTypeUsage([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi loading api MedicalTypeUsages");
    }
  };

  const getAllMedicalTypeReviews = async () => {
    try {
      const result = await MedicaService.getMedicalTypeReviews();
      if (result) {
        setMedicalTypeReviews(result);
      } else {
        setMedicalTypeReviews([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi khi loading api MedicalTypeReviews");
    }
  };

  const getAllMedical = async () => {
    try {
      const result = await MedicaService.getAllMedicalService();
      if (result) {
        setMedicalServices(result);
      } else {
        setMedicalServices([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const handleSaveMedicalService = async (medicalService) => {
    try {
      const result = await MedicaService.createMedicalService(medicalService);
      if (result) {
        toast.success("Thêm dịch vụ y tế thành công ");
        getAllMedical();
      } else {
        toast.warning("Thất bại khi thêm 1 dịch vụ y tế");
      }
    } catch (error) {
      toast.error("Xảy ra lỗi khi thực hiện API thêm dịch vụ !");
      console.log(error);
    } finally {
    }
  };

  const handleUpdateMedicalService = async (
    idMedicalService,
    medicalService
  ) => {
    try {
      const result = await MedicaService.updateMedicalService(
        idMedicalService,
        medicalService
      );
      if (result) {
        toast.success("Cập nhật một dịch vụ thành công ♥");
        getAllMedical();
      } else {
        toast.warning("Thất bại khi cập nhật một dịch vụ");
      }
    } catch (error) {
      toast.error("Lỗi khi loading API cập nhật dịch vụ y tế ");
      console.log(error);
    } finally {
    }
  };

  const handleServiceById = async (idService) => {
    try {
      const result = await MedicaService.findMedicalServiceById(idService);
      if (result) {
        setFormData(result);
        setMedicalService(result);
      } else {
        setFormData({});
        setMedicalService(result);
      }
    } catch (error) {
      toast.error("Lỗi khi loading api Lấy một dịch vụ y tế");
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formAction = e.nativeEvent.submitter.value;
    console.log("FormACtion", formAction);
    try {
      if (formAction === "add") {
        const updateFormData = {
          ...formData,
          price: parseFloat(formData.price),
        };
        handleSaveMedicalService(updateFormData);
      } else if (formAction === "update") {
        const updateFormData = {
          ...formData,
          price: parseFloat(formData.price),
        };
        handleUpdateMedicalService(medicalService?.id, updateFormData);
      }
    } catch (error) {
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-6 p-6">
      <h8 className="text-2xl font-bold">Quản lý dịch vụ y tế</h8>
      <div className="flex flex-col lg:flex-row gap-1">
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h5 className="text-xl font-semibold text-slate-700 mb-4">
            Số lượng sử dụng dịch vụ y tế
          </h5>
          <div className="overflow-x-auto">
            <div style={{ width: chartWidthMedicalTypeUsages }}>
              <Bar data={usageChartData} options={options} />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h5 className="text-xl font-semibold text-slate-700 mb-4">
            Thống kê phản hồi dịch vụ y tế
          </h5>
          <div className="overflow-x-auto">
            <div style={{ width: chartWidthMedicalTypeReviews }}>
              <Bar data={feedbackChartData} options={options} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal(null, "save")}
        >
          <Plus size={18} /> Thêm dịch vụ y tế
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 dark:bg-slate-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                STT
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Ảnh
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Tên Dịch vụ
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Giá
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Mô tả
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-200">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {medicalServices.map((service, index) => (
              <tr
                key={service.id}
                className="border-t border-gray-200 dark:border-slate-600"
              >
                <td className="py-4 px-4 text-sm text-blue-600 font-semibold">
                  {index + 1}
                </td>
                <td className="py-4 px-4 text-sm text-slate-600 dark:text-slate-200">
                  <img
                    src={service?.imagePath}
                    alt={service?.nameService}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-4 px-4 text-sm text-blue-600 font-semibold">
                  {service?.nameService}
                </td>
                <td className="py-4 px-4 text-sm text-blue-600 font-semibold">
                  {service?.price.toLocaleString()} VNĐ
                </td>
                <td className="py-4 px-4 text-sm text-blue-600 font-semibold">
                  {service?.description}
                </td>

                <td className="py-4 px-4 text-sm">
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={() => openModal(service, "edit")}
                      className="text-blue-500 dark:text-blue-600"
                    >
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(service)}
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
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {/* Modal sửa */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {isEmptyObject(medicalService) === false
                ? "Cập nhật dịch vụ y tế"
                : "Thêm Dịch vụ y tế"}
            </Dialog.Title>
            <form onSubmit={handleSubmit}>
              {true && (
                <div className="space-y-4">
                  {/* Tạo các trường nhập liệu cho các thuộc tính khác của dịch vụ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ảnh dịch vụ y tế
                    </label>
                    <input
                      type="text"
                      name="imagePath"
                      value={formData.imagePath}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Tên dịch vụ
                    </label>
                    <input
                      type="text"
                      name="nameService"
                      value={formData.nameService}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mô tả dịch vụ
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giá dịch vụ
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex justify-end gap-x-2">
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Huỷ
                    </button>
                    <button
                      type="submit"
                      name="action"
                      value={isEmptyObject(medicalService) ? "add" : "update"}
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      {isEmptyObject(medicalService) === false ? "Lưu" : "Thêm"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal xác nhận xoá */}
      {isDeleteConfirmOpen && (
        <ServiceDeleteModal
          show={isDeleteConfirmOpen}
          handleClose={handleClose}
          id={medicalService?.id}
          resrtDataList={getAllMedical}
          service={medicalService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
