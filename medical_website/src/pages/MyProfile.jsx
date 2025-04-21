import { useState } from 'react'; // Import useState từ React
import Footer from '../components/Footer';
import Header from '../components/Header';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Minh Dung',
    image: 'https://pic-bstarstatic.akamaized.net/ugc/4e78bb74ac66ea760a6f22b7ea36d00a.jpg',
    email: 'dung@gmail.com',
    phone: '09876543',
    address: 'K38/7A Nguyễn Hữu Thọ, Quận Hải Châu, Tp Đà Nẵng',
    gender: 'Nam',
    dob: '2003-08-04'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="mt-5 p-5 ">
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        <div className="relative">
          {isEdit ? (
            <div>
              <img
                className="w-50 h-40 rounded mx-auto"
                src={userData.image}
              />
              <input
                type="file"
                accept="image/*"
                className="mt-2 mx-auto block"
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
              className="w-50 h-40 rounded mx-auto"
              src={userData.image}
            />
          )}
        </div>

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-full text-center"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 text-center ">{userData.name}</p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline text-lg">Thông tin cá nhân</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700 items-center">
            <p className="font-medium">Email:</p>
            <p className="text-blue-900">{userData.email}</p>

            <p className="font-medium">Số Điện Thoại:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 px-2 py-1 max-w-full"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-blue-900">{userData.phone}</p>
            )}

            <p className="font-medium">Địa chỉ:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 px-2 py-1 max-w-full"
                type="text"
                value={userData.address}
                onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>

        <div className="">
          <p className="text-neutral-500 underline text-lg">Thông tin cơ bản</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700 items-center">
            <p className="font-medium">Giới tính:</p>
            {isEdit ? (
              <select
                className="bg-gray-100 px-2 py-1"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            ) : (
              <p>{userData.gender}</p>
            )}

            <p className="font-medium">Ngày sinh:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 px-2 py-1"
                type="date"
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <p>{userData.dob}</p>
            )}
          </div>
        </div>

        <div className="text-center pb-2">
          {isEdit ? (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setIsEdit(false)}
            >
              Lưu
            </button>
          ) : (
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setIsEdit(true)}
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
