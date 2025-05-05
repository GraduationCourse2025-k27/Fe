import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import * as medicalService from "../../service/MedicalType/MedicalTypeApi";
import { BiPackage } from "react-icons/bi";
import NoFoundData from "../../components/NoFoundData";
const Ultrasound = () => {
  const [ultrasound, setUltrasound] = useState([]);
  const { currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    getAllService();
  }, []);

  const getAllService = async () => {
    const result = await medicalService.findAllMedicalTypeByNameService(
      "sieuam"
    );
    setUltrasound(result);
  };

  return (
    <div className="mt-5 pt-5">
      {/* Thông tin giới thiệu */}
      <div className="flex flex-col md:flex-row items-center px-6">
        {console.log("ádasdádasd")}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Siêu âm là gì?</h1>
          <p className="text-gray-700 mb-3">
            Siêu âm (Ultrasound) là một phương pháp chẩn đoán hình ảnh không xâm
            lấn, sử dụng sóng âm tần số cao để ghi nhận hình ảnh bên trong cơ
            thể
          </p>
          <p className="text-gray-700 mb-3">
            Kỹ thuật siêu âm được sử dụng trong khảo sát nhiều cơ quan, bộ phận
            khác nhau trong cơ thể như tim, gan, thận, túi mật, lá lách, tuyến
            giáp, buồng trứng, tử cung, thai nhi, mạch máu,… nhằm phát hiện các
            khối u bất thường, những thay đổi ở các cơ quan và theo dõi sự phát
            triển của thai nhi. Mặc dù đây là kỹ thuật phổ biến, hiệu quả và an
            toàn nhưng khuyến cáo người bệnh chỉ nên thực hiện khi có chỉ định
            của bác sĩ.
          </p>
          <p className="text-gray-700 mb-3">
            Hầu hết các xét nghiệm chẩn đoán này được thực hiện bằng cách sử
            dụng một thiết bị siêu âm tác động lên bên ngoài cơ thể người bệnh.
            Trong một số trường hợp khác, thiết bị có thể được đặt bên trong cơ
            thể.
          </p>
        </div>

        <div className="md:w-1/2 p-4">
          <img
            src="https://cdn.samsungsuite.com/wp-content/uploads/2024/01/06200640/V6.jpg"
            alt="Siêu âm"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Danh sách gói siêu âm */}
      <div className="container mx-auto px-4 my-8">
        <h4 className="text-2xl font-bold mb-6">Danh Sách Gói Siêu Âm</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ultrasound && ultrasound?.length > 0 ? (
            ultrasound.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <img
                  src={item.imagePath}
                  alt={item.nameService}
                  className="bg-blue-50 w-full h-60 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <span className="text-gray-900 text-lg font-semibold block mb-2">
                    {item.nameService}
                  </span>
                  <span className="text-black  border rounded text-lg font-bold block mt-3 p-2">
                    Giá: {item.price.toLocaleString()} {currencySymbol}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full w-full flex justify-center">
              <NoFoundData
                icon={BiPackage}
                iconColor="text-yellow-400"
                content="Hiện tại không có gói khám nào"
                size={72}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ultrasound;
