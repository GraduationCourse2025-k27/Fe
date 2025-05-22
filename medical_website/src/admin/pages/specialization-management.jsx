import { useEffect, useState } from "react";
import { PencilLine, Trash, Plus, Search } from "lucide-react";
import * as SpecialityAdminService from "../service/admin/SpecialityAdminService";
import { toast, ToastContainer } from "react-toastify";
import { SpecialtyModal } from "../modal/specialModal";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import SpecialModalDelete from "../modal/SpecialModalDelete";

const SpecializationManagementPage = () => {
  const [specialties, setSpecialties] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [speciality, setSpeciality] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [idSpecialityDelete, setIdSpecialityDelete] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 6;
  const nameSpeciality = "";
  //tinh toan phan trang
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = Array.isArray(specialties)
    ? specialties.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(specialties)
    ? Math.ceil(specialties.length / recordPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    getAllSpecialityByName(searchName);
  }, []);

  useEffect(() => {
    if (searchName) {
      getAllSpecialityByName(searchName);
      setCurrentPage(1);
    }
  }, [searchName]);

  const openModal = async (specialty = {}, action) => {
    console.log("specialty", specialty);

    if (action === "save") {
      setSpeciality({});
    }
    if (specialty && action === "edit") {
      await findSpecialityById(specialty.id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAllSpecialityByName = async (nameSpeciality) => {
    try {
      const result = await SpecialityAdminService.getAllByName(nameSpeciality);
      if (result != null) {
        setSpecialties(result);
      } else {
        setSpecialties([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findSpecialityById = async (id) => {
    try {
      const result = await SpecialityAdminService.findSpecialityById(id);
      if (result) {
        setSpeciality(result);
      } else {
        setSpeciality([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSpeciality = async (speciality) => {
    try {
      const result = await SpecialityAdminService.createSpeciality(speciality);
      if (result) {
        toast.success("Thêm một chuyên khoa thành công ");
        getAllSpecialityByName(nameSpeciality);
      } else {
        toast.warning("Thất bại khi thêm một chuyên khoa");
      }
      closeModal();
    } catch (error) {
      toast.error("lỗi khi loading api");
      console.log();
    }
  };

  const handleupdateSpeciality = async (id, updateSpeciality) => {
    try {
      const result = await SpecialityAdminService.updateSpeciality(
        id,
        updateSpeciality
      );
      if (result) {
        toast.success("Cập Nhật một chuyên khoa thành công ");
        getAllSpecialityByName(nameSpeciality);
        console.log("Debug");
      } else {
        toast.warning("Thất bại khi cập nhật một bác sĩ");
      }
      closeModal();
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.log(error);
    }
  };

  const handleModalDeleteSpeciality = (idSpeciality) => {
    setIdSpecialityDelete(idSpeciality);
    setIsShowDelete(true);
  };

  const handleClose = () => {
    setIsShowDelete(false);
    setIdSpecialityDelete(0);
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
    <div className="flex flex-col gap-4 px-2">
      <h2 className="text-2xl font-bold ml-8">Quản lý chuyên khoa</h2>
      <div className="flex flex-wrap items-center justify-between gap-4 ml-7">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên chuyên khoa..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border px-3 py-2 rounded pr-10 w-64"
            />
            <Search
              className="absolute right-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal(null, "save")}
        >
          <Plus size={18} /> Thêm chuyên khoa
        </button>
      </div>

      <div className="flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-2">
          <div className="w-full max-w-[1280px] bg-white border rounded flex flex-col h-[80vh]">
            <div className="flex-grow ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">STT</th>
                    <th className="px-4 py-2 text-left">Ảnh</th>
                    <th className="px-4 py-2 text-left">Tên chuyên khoa</th>
                    <th className="px-4 py-2 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {specialties.length > 0 ? (
                    records.map((spec, index) => (
                      <tr key={spec.id} className="!border-t !border-gray-300 ">
                        <td className="px-4 py-2">{firstIndex + index + 1}</td>
                        <td className="px-4 py-2">
                          <img
                            src={spec.imagePath}
                            alt={""}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2">{spec.name}</td>
                        <td className="px-4 py-2 text-center">
                          <div className="flex justify-center gap-4">
                            <button
                              className="text-blue-500"
                              onClick={() => openModal(spec, "edit")}
                            >
                              <PencilLine size={20} />
                            </button>
                            <button
                              className="text-red-500"
                              onClick={() =>
                                handleModalDeleteSpeciality(spec.id)
                              }
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Không có chuyên khoa nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-t border-gray-300">
              {npage > 0 && (
                <ul className="pagination flex justify-center items-center my-6 gap-2 mt-4">
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
              <SpecialtyModal
                specialty={speciality}
                onClose={closeModal}
                onSave={handleSaveSpeciality}
                onUpdate={handleupdateSpeciality}
              />
            )}

            {isShowDelete && (
              <SpecialModalDelete
                show={isShowDelete}
                handleClose={handleClose}
                id={idSpecialityDelete}
                resertDataList={getAllSpecialityByName}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationManagementPage;
