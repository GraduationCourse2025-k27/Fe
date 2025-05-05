import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import * as medicalService from "../../service/MedicalType/MedicalTypeApi";
import { BiPackage } from "react-icons/bi";
import NoFoundData from "../../components/NoFoundData";
const General = () => {
  const { currencySymbol } = useContext(AppContext);
  const [general, setGeneral] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllService();
  }, []);

  const getAllService = async () => {
    const result = await medicalService.findAllMedicalTypeByNameService(
      "tongquat"
    );
    setGeneral(result);
  };
  return (
    <div className="mt-5 pt-5">
      {/* Phần giới thiệu */}
      <div className="flex flex-col md:flex-row items-center px-6">
        {/* Thông tin bên trái */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Khám tổng quát là gì?</h1>
          <p className="text-gray-700 mb-3">
            Khám sức khỏe tổng quát là phương pháp giúp bản thân có cái nhìn
            chung về tình trạng sức khỏe hiện tại và phát hiện sớm các bệnh dễ
            mắc phải như tiểu đường, gout, huyết áp, mỡ máu, viêm gan, tim mạch,
            đột quỵ…
          </p>
          <p className="text-gray-700 mb-3">
            Dựa vào kết quả thăm khám và xét nghiệm tổng quát, bác sĩ sẽ chẩn
            đoán, phát hiện bệnh sớm, điều trị kịp thời và chính xác. Ngoài ra,
            khám tổng quát còn giúp đánh giá và điều chỉnh lối sống để hạn chế
            các rủi ro gây bệnh.
          </p>
          <p className="text-gray-700">
            Khám tổng quát cần được thực hiện định kỳ{" "}
            <b>ít nhất 6 tháng/lần.</b>
          </p>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/banner_general_home_test.png"
            alt="Khám tổng quát"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Danh sách gói khám */}
      <div className="container mx-auto px-4 my-8">
        <h4 className="text-2xl font-bold mb-6">
          Danh Sách Gói Khám Tổng Quát
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {general && general?.length > 0 ? (
            general.map((item) => (
              <div
                key={item.id}
                // onClick={() => navigate(`/appointment/${item._id}`)}
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

export default General;
