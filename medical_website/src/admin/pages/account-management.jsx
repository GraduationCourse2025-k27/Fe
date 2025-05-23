import { use, useEffect, useState } from "react";
import { Lock, Unlock, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import * as AccountService from "../service/admin/AccountManagement";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const AccountManagementPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const initialName = "";
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Array.isArray(accounts)
    ? accounts.slice(firstIndex, lastIndex)
    : [];
  const npage = Array.isArray(accounts)
    ? Math.ceil(accounts.length / recordsPerPage)
    : 0;
  const numbers = npage > 0 ? [...Array(npage).keys()].map((i) => i + 1) : [];

  useEffect(() => {
    getAllAccountByName(initialName);
  }, []);

  useEffect(() => {
    if (searchName) {
      getAllAccountByName(searchName);
      setCurrentPage(1);
    }
  }, [searchName]);

  const getAllAccountByName = async (fullName) => {
    try {
      const result = await AccountService.getAllAccountByName(fullName);
      if (result) {
        setAccounts(result);
      } else {
        setAccounts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const toggleLockAccount = async (id) => {
    const account = accounts.find((acc) => acc.id === id);
    const isLocked = account.clock;
    try {
      let result;
      if (isLocked) {
        result = await AccountService.unLockAccount(id);
      } else {
        result = await AccountService.lockAccount(id);
      }

      if (result) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.id === id ? { ...acc, clock: !acc.clock } : acc
          )
        );
        toast.success(
          `Tài Khoản ${account.fullName} đã ${
            isLocked ? "Bị khóa" : "Mở Khóa"
          } Thành Công`
        );
      } else {
        toast.warning(
          `Thất bại khi ${isLocked ? "Khóa" : "Mở Khóa"} tài khoản!`
        );
      }
    } catch (error) {
      toast.error(`Lỗi khi ${isLocked ? "Khóa" : "Mở Khóa"} tài khoản`);
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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold ml-8">Quản lý tài khoản</h2>

      <div className="flex flex-wrap items-center justify-between gap-4 ml-7">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên tài khoản..."
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
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-[1280px] bg-white  rounded overflow-hidden flex flex-col h-[80vh]">
          <div className="flex-grow overflow-y-auto">
            <table className="w-full table-fixed border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left w-[5%]">STT</th>
                  <th className="px-4 py-2 text-left w-[20%]">Tên</th>
                  <th className="px-4 py-2 text-left w-[20%]">Email</th>
                  <th className="px-4 py-2 text-left w-[10%]">SĐT</th>
                  <th className="px-4 py-2 text-left w-[20%]">Địa chỉ</th>
                  <th className="px-4 py-2 text-left w-[10%]">Vai Trò</th>
                  <th className="px-4 py-2 text-center w-[15%]">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((acc, index) => (
                    <tr key={acc.id} className="!border-t">
                      <td className="px-4 py-2">{firstIndex + index + 1}</td>
                      <td className="px-4 py-2">{acc.fullName}</td>
                      <td className="px-4 py-2">{acc.email}</td>
                      <td className="px-4 py-2">{acc.phone}</td>
                      <td className="px-4 py-2">{acc.address}</td>
                      <td className="px-4 py-2">{acc.role}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleLockAccount(acc.id)}
                          className={`p-2 rounded-full ${
                            acc.clock
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                          title={acc.clock ? "Mở khóa" : "Khóa tài khoản"}
                        >
                          {acc.clock ? (
                            <Lock size={20} />
                          ) : (
                            <Unlock size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="h-[300px]">
                    <td colSpan="7" className="text-center py-4">
                      Không có tài khoản nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* /*Phân trang */}
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
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AccountManagementPage;
