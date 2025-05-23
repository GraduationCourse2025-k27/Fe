import { useEffect, useState } from "react";
import { PencilLine, Trash, Plus, FileDown, History } from "lucide-react";
import * as MedicalRecords from "../service/admin/MedicalRecodrsAdminService";
import * as DoctorService from "../service/admin/DoctorManagement";
import { toast, ToastContainer } from "react-toastify";
import { formatDate } from "../../validation/common/FormatDate";
import { MedicalRecordModal } from "../modal/MedicalRecordsModal";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const MedicalRecordsPage = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prescriptionModal, setPrescriptionModal] = useState(null);
  const [idDoctor, setIdDoctor] = useState(14);
  const [medicalRecord, setMedicalRecord] = useState({});
  const [clientsByRoleUser, setClientsByRoleUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  //tinh toan phan trang
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(medicalRecords)
    ? medicalRecords.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(medicalRecords)
    ? Math.ceil(medicalRecords.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  const namePatient = "";

  useEffect(() => {
    const fecthMedicalRecordsData = async () => {
      try {
        await Promise.all([
          getClientsByRoleUser(),
          getAllRecordsByDoctorAndNamePatient(idDoctor, searchName),
        ]);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi loading api từ medical Records");
      }
    };
    fecthMedicalRecordsData();
  }, []);

  useEffect(() => {
    getAllRecordsByDoctorAndNamePatient(idDoctor, searchName);
    setCurrentPage(1);
  }, [searchName]);
  const openModal = async (record = {}, action) => {
    if (!clientsByRoleUser.length) {
      toast.error("Danh sách người giám hộ không lấy được");
      return;
    }
    if (action === "save") {
      setMedicalRecord({});
    }
    if (record && action === "edit") {
      await findMedicalRecordsById(record?.id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadWord = (record) => {
    const content = `
      Hồ sơ bệnh án
      - Bệnh nhân: ${record?.client?.fullName}
      - Bác sĩ: ${record?.doctor?.client?.fullName}
      - Chuẩn đoán: ${record?.diagnosis}
      - Ngày sinh bệnh nhân : ${formatDate(record?.birthDatePatient)}
      - giới tính :${record?.gender}
      - Ghi chú: ${record?.note}
      - Ngày tạo: ${formatDate(record?.createdAt)}
      - Đơn thuốc: ${record?.prescription}
    `;
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `HoSoBenhAn.doc`;
    link.click();
  };

  const exportToExcel = (medicalRecords) => {
    // Map the medicalRecords array to the format needed for the Excel file
    const formattedData = medicalRecords.map((record, index) => ({
      STT: index + 1,
      "Bác sĩ": record?.doctor?.client?.fullName || "N/A",
      "Người giám hộ": record?.client?.fullName || "N/A",
      "Bệnh nhân": record?.namePatient || "N/A",
      "Chuẩn đoán": record?.diagnosis || "N/A",
      "Đơn thuốc": record?.prescription || "N/A",
      "Ngày sinh bệnh nhân": formatDate(record?.birthDatePatient) || "N/A",
      "Giới tính": record?.gender || "N/A",
      "Ghi chú": record?.note || "N/A",
      "Ngày tạo": formatDate(record?.createdAt) || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Medical Records");

    worksheet["!cols"] = [
      { wch: 5 }, // STT
      { wch: 20 }, // Bác sĩ
      { wch: 20 }, // Người giám hộ
      { wch: 20 }, // Bệnh nhân
      { wch: 30 }, // Chuẩn đoán
      { wch: 30 }, // Đơn thuốc
      { wch: 20 }, // Ngày sinh bệnh nhân
      { wch: 10 }, // Giới tính
      { wch: 30 }, // Ghi chú
      { wch: 20 }, // Ngày tạo
    ];

    // Generate and download the Excel file
    XLSX.writeFile(workbook, "MedicalRecords.xlsx");
  };

  const getAllRecordsByDoctorAndNamePatient = async (idDoctor, namePatient) => {
    try {
      const result = await MedicalRecords.getAllRecordsByDoctor(
        idDoctor,
        namePatient
      );
      if (result) {
        setMedicalRecords(result);
      } else {
        setMedicalRecords([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getClientsByRoleUser = async () => {
    try {
      const result = await DoctorService.getClientsByRoleUser();
      setClientsByRoleUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveMedicalRecords = async (medicalRecords) => {
    try {
      const result = await MedicalRecords.createRecords(medicalRecords);
      if (result) {
        toast.success("Tạo một hồ sơ bệnh án thành công ☺");
        getAllRecordsByDoctorAndNamePatient(idDoctor, namePatient);
      } else {
        toast.warning("Thất bại khi tạo một hồ sơ bệnh án !");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };

  const handleUpdateMedicalRecords = async (idMedicalRecords, records) => {
    try {
      const result = await MedicalRecords.updateRecords(
        idMedicalRecords,
        records
      );
      if (result) {
        toast.success("Cập nhật thông tin bệnh nhân thành công !");
        getAllRecordsByDoctorAndNamePatient(idDoctor, namePatient);
      } else {
        toast.warning("Thất bại khi cập nhật một bác sĩ!");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  const findMedicalRecordsById = async (idMedicalRecords) => {
    try {
      const result = await MedicalRecords.findRecordsById(idMedicalRecords);
      if (result) {
        if (result?.birthDatePatient) {
          result.birthDatePatient = format(
            new Date(result.birthDatePatient),
            "dd/MM/yyyy"
          );
        }
        setMedicalRecord(result);
        if (
          result?.client &&
          !clientsByRoleUser.find((c) => c.id === result?.client?.id)
        ) {
          const clientResult = await DoctorService.getClientById(
            result?.client?.id
          );
          setClientsByRoleUser((prev) => [...prev, clientResult]);
        }
      } else {
        setMedicalRecord({});
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <div className="flex flex-col gap-4 ml-8">
      <h2 className="text-2xl font-bold">Quản lý hồ sơ bệnh án</h2>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <input
          type="text"
          placeholder="Tìm theo tên bệnh nhân..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <div className="flex gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => exportToExcel(medicalRecords)}
          >
            <FileDown size={18} /> Tải danh sách về excel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => openModal(null, "save")}
          >
            <Plus size={18} /> Tạo hồ sơ bệnh án
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl bg-white border rounded h-[65vh] flex flex-col">
          <div className="flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-600 text-left text-sm">
              <tr>
                <th className="px-4 py-2">STT</th>
                <th className="px-4 py-2">Bác sĩ</th>
                <th className="px-4 py-2">Người giám hộ</th>
                <th className="px-4 py-2">Bệnh Nhân</th>
                <th className="px-4 py-2">Chuẩn đoán</th>
                <th className="px-4 py-2">Đơn thuốc</th>
                <th className="px-4 py-2">Ngày sinh bệnh nhân</th>
                <th className="px-4 py-2">Giới tính</th>
                <th className="px-4 py-2">Ghi chú</th>
                <th className="px-4 py-2">Ngày tạo</th>
                <th className="px-4 py-2">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecords.length > 0 ? (
                records.map((record, index) => (
                  <tr
                    key={record.id}
                    className="text-left hover:bg-gray-50 transition !border-t !border-gray-300"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {record?.doctor?.client?.fullName}
                    </td>
                    <td className="px-4 py-2">{record?.client?.fullName}</td>
                    <td className="px-4 py-2">{record?.namePatient}</td>
                    <td className="px-4 py-2">{record?.diagnosis}</td>
                    <td className="px-4 py-2">
                      <button
                        className="text-blue-600 underline hover:text-blue-800"
                        onClick={() => setPrescriptionModal(record)}
                      >
                        Xem
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      {formatDate(record?.birthDatePatient)}
                    </td>
                    <td className="px-4 py-2">{record?.gender}</td>
                    <td className="px-4 py-2">{record?.note}</td>
                    <td className="px-4 py-2">
                      {formatDate(record?.createdAt)}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => openModal(record, "edit")}
                        >
                          <PencilLine size={20} />
                        </button>
                        <button
                          onClick={() => handleDownloadWord(record)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FileDown size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[400px]">
                  <td colSpan="11" className="text-center py-4 text-gray-500">
                    Không có hồ sơ bệnh án nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>

        {npage > 0 && (
                       <ul className="pagination flex !justify-center items-center py-2 gap-2 border-t border-gray-200">
                         {npage > 1 && (
                           <li className="page-item">
                             <button
                               className="page-link px-4 py-2 text-blue-900 flex items-center"
                               onClick={prePage}
                             >
                               <BiChevronLeft size={24} />
                             </button>
                           </li>
                         )}
                         {numbers &&
                           numbers.map((n) => (
                             <li className="page-item" key={n}>
                               <button
                                 className={`page-link px-4 py-2 border rounded ${
                                   currentPage === n
                                     ? "bg-blue-900 text-blue"
                                     : "bg-white text-blue-900"
                                 }`}
                                 onClick={(e) => changePage(e, n)}
                               >
                                 <span className="text-blue">{n}</span>
                               </button>
                             </li>
                           ))}
                         {npage > 1 && (
                           <li className="page-item">
                             <button
                               className="page-link px-4 py-2 text-blue-900 flex items-center"
                               onClick={nextPage}
                             >
                               <BiChevronRight size={24} />
                             </button>
                           </li>
                         )}
                       </ul>
                     )}
        

         
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      {isModalOpen && (
        <MedicalRecordModal
          onClose={closeModal}
          onSave={handleSaveMedicalRecords}
          onUpdate={handleUpdateMedicalRecords}
          clients={clientsByRoleUser}
          record={medicalRecord}
        />
      )}

      {prescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Chi tiết đơn thuốc</h3>
            <p>{prescriptionModal?.prescription}</p>
            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setPrescriptionModal(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;
