import React, { useEffect, useState } from "react";
import { FiSearch, FiEdit, FiTrash2 } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import * as staffManagement from "../service/admin/EmployeeManagement";
import * as DoctorManagement from "../service/admin/DoctorManagement";
import StaffModal from "../modal/StaffModal";
import EmployeeDeleteModal from "../modal/EmployeeDeleteModal";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Employee, setEmployee] = useState({});
  const [clientsByRoleUser, setClientsByRoleUSer] = useState([]);
  const [idEmployeeDeleted, setIdEmployeeDeted] = useState(0);
  const [isShowDelete, setIsShowModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  //tinh toan phan trang
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(employees)
    ? employees.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(employees)
    ? Math.ceil(employees.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  const intialFullName = "";

  useEffect(() => {
    const fechStaffManagementData = async () => {
      try {
        await Promise.all([
          getAllEmployee(intialFullName),
          getClientByRoleUser(),
        ]);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu Staffs:");
      }
    };
    fechStaffManagementData();
  }, []);
  useEffect(() => {
    getAllEmployee(searchName);
    setCurrentPage(1);
  }, [searchName]);

  const openModal = async (employee = {}, action) => {
    if (!clientsByRoleUser.length) {
      toast.error("Danh sách clients chưa được tải");
      return;
    }
    if (action === "save") {
      setEmployee({});
    }
    if (employee && action === "edit") {
      await handleStaffById(employee.id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setIdEmployeeDeted(0);
  };

  const handleDelete = (id) => {
    setIdEmployeeDeted(id);
    setIsShowModalDelete(true);
  };

  const getAllEmployee = async () => {
    try {
      const result = await staffManagement.getAllEmployee(searchName);
      if (result) {
        setEmployees(result);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateStaff = async (staff) => {
    try {
      const result = await staffManagement.createEmployee(staff);
      if (result) {
        toast.success("Thêm một Nhân viên thành công");
        getAllEmployee(intialFullName);
      } else {
        toast.warning("Thất bại khi thêm một nhân viên !");
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStaff = async (idStaff, staff) => {
    try {
      const result = await staffManagement.updateEmployee(staff, idStaff);
      if (result) {
        toast.success("Cập nhật một nhân viên thành công");
        getAllEmployee(intialFullName);
      } else {
        toast.warning("Thất bại khi cập nhật một nhân viên");
      }
    } catch (error) {
      toast.error("Lỗi khi loading api");
      console.error(error);
    }
  };

  const handleStaffById = async (idStaff) => {
    try {
      const result = await staffManagement.findEmployeeById(idStaff);
      if (result) {
        setEmployee(result);
      }
      if (
        result.client &&
        !clientsByRoleUser.find((c) => c.id === result.client.id)
      ) {
        const clientResult = await DoctorManagement.getClientById(
          result.client.id
        );
        setClientsByRoleUSer((prev) => [...prev, clientResult]);
      }
    } catch (error) {
      console.error("Lỗi khi loading api");
      console.error(error);
    }
  };

  const getClientByRoleUser = async () => {
    try {
      const result = await DoctorManagement.getClientsByRoleUser();
      setClientsByRoleUSer(result);
    } catch (error) {
      console.error(error);
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
    <div className="flex flex-col gap-4 px-8">
      <h2 className="text-2xl font-bold ml-8">Quản lý nhân viên</h2>

      {/* Tìm kiếm + Thêm */}
      <div className="flex justify-between items-center mt-2 mb-4 ml-8 mr-8">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, số điện thoại, địa chỉ..."
            className="border pl-10 pr-3 py-2 rounded w-full"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setCurrentPage(1); // reset trang khi tìm kiếm
            }}
          />
        </div>

        <button
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => openModal(null, "save")}
        >
          + Thêm nhân viên
        </button>
      </div>

      {/* Danh sách nhân viên */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl bg-white border rounded overflow-hidden h-[70vh] flex flex-col">
          <div className="overflow-y-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-600 text-left text-sm">
                <tr>
                  <th className="py-3 px-4">STT</th>
                  <th className="py-3 px-4">Ảnh</th>
                  <th className="py-3 px-4">Tên</th>
                  <th className="py-3 px-4">Số điện thoại</th>
                  <th className="py-3 px-4">Địa chỉ</th>
                  <th className="py-3 px-4">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {records.map((emp, index) => (
                  <tr key={emp?.id} className="!border-t !border-gray-300">
                    <td className="py-3 px-4">{firstIndex + index + 1}</td>
                    <td className="py-3 px-4">
                      <img
                        src={emp?.imagePath}
                        alt={emp?.client?.fullName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">{emp?.client?.fullName}</td>
                    <td className="py-3 px-4">{emp?.client?.phone}</td>
                    <td className="py-3 px-4">{emp?.client?.address}</td>
                    <td className="py-3 px-4 flex gap-3 items-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-lg"
                        onClick={() => openModal(emp, "edit")}
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
                {records.length === 0 && (
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
          {npage > 0 && (
            <ul className="flex justify-center items-center gap-2 py-3 border-t border-gray-200">
              {npage > 1 && (
                <li>
                  <button className="px-4 py-2 text-blue-900" onClick={prePage}>
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
        <ToastContainer position="top-right" autoClose={1000} />
      </div>

      {/* Modal thêm/sửa */}

      {isModalOpen && (
        <StaffModal
          employee={Employee}
          clients={clientsByRoleUser}
          onUpdate={handleUpdateStaff}
          onClose={closeModal}
          onSave={handleCreateStaff}
        />
      )}

      {isShowDelete && (
        <EmployeeDeleteModal
          show={isShowDelete}
          handleClose={handleClose}
          id={idEmployeeDeleted}
          resertDataList={getAllEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;
