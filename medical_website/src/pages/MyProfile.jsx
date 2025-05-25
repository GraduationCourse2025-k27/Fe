import { use, useEffect, useState } from "react";
import * as ClinetService from "../service/Auth/AuthApi";
import { toast, ToastContainer } from "react-toastify";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    fullName: localStorage.getItem("fullName") || "",
    image: "https://cdn-icons-png.flaticon.com/512/8345/8345328.png",
    email: localStorage.getItem("email") || "",
    phone: localStorage.getItem("phone") || "",
    address: localStorage.getItem("address") || "",
    gender: "",
    dob: "",
  });
  const [id, setId] = useState(localStorage.getItem("id") || null);
  const [isEdit, setIsEdit] = useState(false);

  console.log("iduser", id);

  useEffect(() => {
    if (id) {
      setId(localStorage.getItem("id"));
    }
  }, [localStorage.getItem("id")]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const { image, dob, gender, ...restFormData } = userData;
    //   const result = await ClinetService.updateClient(restFormData, id);
    //   if (result) {
    //     toast.success("Cập nhật thông tin thành công", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //   } else {
    //     toast.error("Cập nhật thông tin thất bại");
    //   }
    // } catch (error) {
    //   toast.error("lỗi khi fetch Api");
    //   console.error(error);
    // }
    console.log(123);
  };

  return (
    <div className="min-h-screen flex flex-col mt-5">
      <div className="flex-grow flex items-center justify-center p-4 sm:p-5 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-md sm:max-w-xl bg-white border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 text-sm">
            <div className="relative">
              {isEdit ? (
                <div>
                  <img
                    className="w-40 h-40 sm:w-50 sm:h-40 rounded mx-auto object-cover"
                    src={userData?.image}
                    alt="Profile"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 mx-auto block text-xs sm:text-sm"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setUserData((prev) => ({ ...prev, image: imageUrl }));
                      }
                    }}
                  />
                </div>
              ) : (
                <img
                  className="w-40 h-40 sm:w-50 sm:h-40 rounded mx-auto object-cover"
                  src={userData?.image}
                  alt="Profile"
                />
              )}
            </div>
            {isEdit ? (
              <input
                className="bg-gray-50 text-2xl sm:text-3xl font-medium max-w-full text-center"
                type="text"
                value={userData?.fullName}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, fullName: e.target.value }))
                }
              />
            ) : (
              <p className="font-medium text-2xl sm:text-3xl text-neutral-800 text-center">
                {userData?.fullName}
              </p>
            )}
            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
              <p className="text-neutral-500 underline text-base sm:text-lg">
                Thông tin cá nhân
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2 sm:gap-y-3 mt-2 sm:mt-3 text-neutral-700 items-start sm:items-center">
                <p className="font-medium">Email:</p>
                <p className="text-blue-900 text-xs sm:text-sm">
                  {userData?.email}
                </p>

                <p className="font-medium">Số Điện Thoại:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 px-2 py-1 w-full text-xs sm:text-sm"
                    type="text"
                    value={userData?.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-blue-900 text-xs sm:text-sm">
                    {userData?.phone}
                  </p>
                )}

                <p className="font-medium">Địa chỉ:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 px-2 py-1 w-full text-xs sm:text-sm"
                    type="text"
                    value={userData?.address}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-xs sm:text-sm">{userData?.address}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-neutral-500 underline text-base sm:text-lg">
                Thông tin cơ bản
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2 sm:gap-y-3 mt-2 sm:mt-3 text-neutral-700 items-start sm:items-center">
                <p className="font-medium">Giới tính:</p>
                {isEdit ? (
                  <select
                    className="bg-gray-100 px-2 py-1 w-full text-xs sm:text-sm"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData?.gender}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                ) : (
                  <p className="text-xs sm:text-sm">{userData?.gender}</p>
                )}

                <p className="font-medium">Ngày sinh:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 px-2 py-1 w-full text-xs sm:text-sm"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    value={userData?.dob}
                  />
                ) : (
                  <p className="text-xs sm:text-sm">{userData?.dob}</p>
                )}
              </div>
            </div>

            <div className="text-center pb-2">
              {isEdit ? (
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm"
                  onClick={() => setIsEdit(false)}
                >
                  Lưu
                </button>
              ) : (
                <button
                  className="bg-blue-900 text-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-blue-600 text-xs sm:text-sm"
                  onClick={() => setIsEdit(true)}
                >
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
