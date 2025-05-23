import { useEffect, useState } from "react";
import { PencilLine, Trash, Plus, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as DoctorManagement from "../service/admin/DoctorManagement";
import { DoctorModal } from "../modal/DoctorModal";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DoctorDeleteModal from "../modal/DoctorDeleteModal";
const DoctorManagementPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [clientsByRoleUser, setClientsByRoleUser] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [nameDoctor, setNameDoctor] = useState("");
  const [idSpeciality, setIdSpeciality] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDelete, setIsShowModalDelete] = useState(false);
  const [idDoctorDelete, setIdDoctorDelete] = useState(0);
  const intialIdSpecility = -1;
  const intialNameDoctor = "";
  const recordsPerPage = 6;
  //tinh toan phan trang
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(doctors)
    ? doctors.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(doctors)
    ? Math.ceil(doctors.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    const fetchDoctorManagementData = async () => {
      try {
        await Promise.all([
          getAllSpecialites(),
          getClientsByRoleUser(),
          getAllByDoctorByNameAndSpecialities(idSpeciality, nameDoctor),
        ]);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu Doctors:");
      }
    };
    fetchDoctorManagementData();
  }, []);

  useEffect(() => {
    getAllByDoctorByNameAndSpecialities(idSpeciality, nameDoctor);
    setCurrentPage(1);
  }, [idSpeciality, nameDoctor]);

  const openModal = async (doctor = {}, action) => {
    if (!clientsByRoleUser.length || !specialties.length) {
      toast.error("Danh sách clients hoặc specialties chưa được tải");
      return;
    }
    if (action === "save") {
      setDoctor({});
    }
    if (doctor && action === "edit") {
      await handleDoctorById(doctor.id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAllSpecialites = async () => {
    try {
      const result = await DoctorManagement.getAllSpeciality();
      setSpecialties(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientsByRoleUser = async () => {
    try {
      const result = await DoctorManagement.getClientsByRoleUser();
      setClientsByRoleUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllByDoctorByNameAndSpecialities = async (
    speciality,
    nameDoctor
  ) => {
    try {
      const result = await DoctorManagement.getAllDoctorByNameAndSpeciality(
        speciality,
        nameDoctor
      );
      if (result != null) {
        setDoctors(result);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveDoctor = async (Doctor) => {
    try {
      const result = await DoctorManagement.createDoctor(Doctor);
      if (result) {
        toast.success("Thêm một bác sĩ thành công ");
        getAllByDoctorByNameAndSpecialities(
          intialIdSpecility,
          intialNameDoctor
        );
      } else {
        toast.warning("Thất bại khi thêm một bác sĩ ");
      }
      closeModal();
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setIdDoctorDelete(0);
  };

  const handleUpdateDoctor = async (idDoctor, Doctor) => {
    try {
      const result = await DoctorManagement.updateDoctorById(idDoctor, Doctor);
      if (result) {
        toast.success("cập nhật một bác sĩ thành công ");
        getAllByDoctorByNameAndSpecialities(
          intialIdSpecility,
          intialNameDoctor
        );
      } else {
        toast.warning("Thất bại khi cập nhật một bác sĩ ");
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

  const handleDoctorById = async (idDoctor) => {
    try {
      const result = await DoctorManagement.findDoctorById(idDoctor);
      if (result) {
        setDoctor(result);
        if (
          result.client &&
          !clientsByRoleUser.find((c) => c.id === result.client.id)
        ) {
          const clientResult = await DoctorManagement.getClientById(
            result.client.id
          );
          setClientsByRoleUser((prev) => [...prev, clientResult]);
        }
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  const handleDeleteDoctorModal = (idDoctor) => {
    setIdDoctorDelete(idDoctor);
    setIsShowModalDelete(true);
  };

  return (
    <div className="flex flex-col gap-4 px-2 ">
      <h2 className="text-2xl font-bold ml-8">Quản lý bác sĩ</h2>

      <div className="flex flex-wrap items-center justify-between gap-4 ml-7">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên bác sĩ..."
              value={nameDoctor}
              onChange={(e) => setNameDoctor(e.target.value)}
              className="border px-3 py-2 rounded pr-10 w-64"
            />
            <Search
              className="absolute right-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          <select
            onChange={(e) => setIdSpeciality(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value={""}>-- Tất cả chuyên khoa --</option>
            {specialties.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal(null, "save")}
        >
          <Plus size={18} /> Thêm bác sĩ
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-[auto] bg-white border rounded overflow-hidden flex flex-col h-[auto]">
            <div className="flex-grow">
              <table className="w-full table-fixed  border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left w-[5%]">STT</th>
                    <th className="px-4 py-2 text-left w-[10%]">Ảnh</th>
                    <th className="px-4 py-2 text-left w-[25%]">Họ tên</th>
                    <th className="px-4 py-2 text-left w-[25%]">Chuyên khoa</th>
                    <th className="px-4 py-2 text-left w-[15%]">Giá khám</th>
                    <th className="px-4 py-2 text-center w-[20%]">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {records?.length > 0 ? (
                    records?.map((doc, index) => (
                      <tr key={doc?.id} className="!border-t">
                        <td className="px-4 py-2">{firstIndex + index + 1}</td>
                        <td className="px-4 py-2">
                          <img
                            src={doc?.imagePath}
                            alt={doc?.client?.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2 truncate">
                          {doc?.client?.fullName}
                        </td>
                        <td className="px-4 py-2 truncate">
                          {doc?.speciality.name}
                        </td>
                        <td className="px-4 py-2">{doc?.examinationPrice}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-4">
                            <button
                              className="text-blue-500"
                              onClick={() => openModal(doc, "edit")}
                            >
                              <PencilLine size={20} />
                            </button>
                            <button
                              className="text-red-500"
                              onClick={() => handleDeleteDoctorModal(doc.id)}
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[300px]">
                      <td colSpan="6" className="text-center py-4">
                        Không có bác sĩ nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {npage > 0 && (
              <ul className="flex justify-center items-center gap-2 py-3 border-t border-gray-200">
                {npage > 1 && (
                  <li>
                    <button
                      className="px-4 py-2 text-blue-900"
                      onClick={prePage}
                    >
                      <BiChevronLeft size={24} />
                    </button>
                  </li>
                )}
                {numbers &&
                  numbers.map((n) => (
                    <li key={n}>
                      <button
                        className={`px-4 py-2 border rounded ${
                          currentPage === n
                            ? "bg-blue-900 text-white"
                            : "bg-white text-blue-900"
                        }`}
                        onClick={(e) => changePage(e, n)}
                      >
                        {n}
                      </button>
                    </li>
                  ))}
                {npage > 1 && (
                  <li>
                    <button
                      className="px-4 py-2 text-blue-900"
                      onClick={nextPage}
                    >
                      <BiChevronRight size={24} />
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
      {isModalOpen && (
        <DoctorModal
          doctor={doctor}
          onClose={closeModal}
          onSave={handleSaveDoctor}
          clients={clientsByRoleUser}
          specialties={specialties}
          onUpdate={handleUpdateDoctor}
        />
      )}
      {isShowDelete && (
        <DoctorDeleteModal
          show={isShowDelete}
          handleClose={handleClose}
          id={idDoctorDelete}
          resertDataList={getAllByDoctorByNameAndSpecialities}
        />
      )}
    </div>
  );
};

export default DoctorManagementPage;
