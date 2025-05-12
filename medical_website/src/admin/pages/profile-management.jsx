import { useState } from "react";
import { Pencil, Lock } from "lucide-react";
import profileImg from "../assets/profile-image.jpg";

const ProfileManagement = () => {
  const [user, setUser] = useState({
    fullName: "Mr.Tom",
    username: "Mr.Tom",
    email: "asdh@gmail.com",
    status: "Active",
    type: "Standard",
    joinedDate: "May 10, 2025",
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  // Các state cho modal sửa thông tin
  const [editedFullName, setEditedFullName] = useState(user.fullName);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);

  // Các state cho modal đổi mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSaveChanges = () => {
    // Cập nhật thông tin người dùng sau khi chỉnh sửa
    setUser({
      ...user,
      fullName: editedFullName,
      username: editedUsername,
      email: editedEmail,
    });
    setEditModalOpen(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }
    // Xử lý thay đổi mật khẩu tại đây
    setChangePasswordModalOpen(false);
    alert("Mật khẩu đã được thay đổi thành công.");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Phần tiêu đề My Profile */}
      <div className="flex items-center justify-between mb-6">
        <h8 className="text-2xl font-bold">Hồ Sơ Của Tôi</h8>
        <button
          onClick={() => setChangePasswordModalOpen(true)}
          className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          <Lock size={16} /> Đổi Mật Khẩu
        </button>
      </div>

      {/* Phần Thông tin cá nhân */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center overflow-hidden">
            <img src={profileImg} alt="Avatar" className="w-full h-full object-cover" />
        </div>
            <div>
              <p className="text-lg font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Thành viên từ {user.joinedDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditModalOpen(true)}
            className="text-blue-500 hover:text-red-600"
          >
            <Pencil size={18} />
          </button>
        </div>
      </div>

      {/* Phần Thông tin tài khoản */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Thông Tin Tài Khoản</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Họ và Tên</p>
            <p className="font-medium">{user.fullName}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Tên Người Dùng</p>
            <p className="font-medium">{user.username}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Trạng Thái Tài Khoản</p>
            <p className="font-medium">{user.status}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Loại Tài Khoản</p>
            <p className="font-medium">{user.type}</p>
          </div>
        </div>
      </div>

      {/* Modal sửa thông tin cá nhân */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Sửa Thông Tin</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Họ và Tên</label>
              <input
                type="text"
                value={editedFullName}
                onChange={(e) => setEditedFullName(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Tên Người Dùng</label>
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Email</label>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal đổi mật khẩu */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Đổi Mật Khẩu</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Mật khẩu mới</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-500">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setChangePasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
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

export default ProfileManagement;
