import { useState } from "react";
import { Lock, Unlock, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

const AccountManagementPage = () => {
const [accounts, setAccounts] = useState([
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    password: "123456",
    address: "Hà Nội",
    phone: "0987654321",
    role: "Admin",
    isLocked: false,
  },
  {
    id: 2,
    name: "Lê Thị B",
    email: "b@example.com",
    password: "123456",
    address: "Hồ Chí Minh",
    phone: "0987654322",
    role: "User",
    isLocked: false,
  },
  {
    id: 3,
    name: "Trần Văn C",
    email: "c@example.com",
    password: "123456",
    address: "Đà Nẵng",
    phone: "0987654323",
    role: "User",
    isLocked: true,
  },
]);


  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredAccounts = accounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const records = filteredAccounts.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredAccounts.length / recordsPerPage);

  const toggleLockAccount = (id) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, isLocked: !acc.isLocked } : acc
      )
    );
    const account = accounts.find((acc) => acc.id === id);
    toast.success(
      `Tài khoản ${account.name} đã ${account.isLocked ? "mở khóa" : "bị khóa"}!`
    );
  };

  const prePage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, npage));
  const changePage = (e, n) => setCurrentPage(n);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold ml-8">Quản lý tài khoản</h2>

      <div className="flex flex-wrap items-center justify-between gap-4 ml-7">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên tài khoản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded pr-10 w-64"
            />
            <Search className="absolute right-2 top-2.5 text-gray-400" size={20} />
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
                  <th className="px-4 py-2 text-left w-[10%]">Chức vụ</th>
                  <th className="px-4 py-2 text-center w-[15%]">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((acc, index) => (
                    <tr key={acc.id} className="!border-t">
                      <td className="px-4 py-2">{firstIndex + index + 1}</td>
                      <td className="px-4 py-2">{acc.name}</td>
                      <td className="px-4 py-2">{acc.email}</td>
                      <td className="px-4 py-2">{acc.phone}</td>
                      <td className="px-4 py-2">{acc.address}</td>
                      <td className="px-4 py-2">{acc.role}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleLockAccount(acc.id)}
                          className={`p-2 rounded-full ${
                            acc.isLocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                          }`}
                          title={acc.isLocked ? "Mở khóa" : "Khóa tài khoản"}
                        >
                          {acc.isLocked ? <Unlock size={20} /> : <Lock size={20} />}
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

          {npage > 1 && (
            <ul className="flex justify-center items-center gap-2 py-3 border-t border-gray-200">
              {currentPage > 1 && (
                <li>
                  <button className="px-4 py-2 text-blue-900" onClick={prePage}>
                    &lt;
                  </button>
                </li>
              )}
              {Array.from({ length: npage }, (_, i) => i + 1).map((n) => (
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
              {currentPage < npage && (
                <li>
                  <button className="px-4 py-2 text-blue-900" onClick={nextPage}>
                    &gt;
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
