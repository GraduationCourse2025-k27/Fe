import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import * as medicalService from "../../service/MedicalType/MedicalTypeApi";
import { useEffect } from "react";
import NoFoundData from "../../components/NoFoundData";
import { BiPackage } from "react-icons/bi"; 
const CancerScreening = () => {
  const { currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const [cancer, setCancer] = useState([]);

  useEffect(() => {
    getAllService();
  }, []);

  const getAllService = async () => {
    const result = await medicalService.findAllMedicalTypeByNameService(
      "ungthu"
    );
    setCancer(result);
  };
  return (
    <div className="mt-5 pt-5">
      {/* Phần giới thiệu */}
      <div className="flex flex-col md:flex-row items-center px-6">
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Tầm soát ung thư là gì?</h1>
          <p className="text-gray-700 mb-3">
            Tầm soát ung thư là thực hiện các phương pháp xét nghiệm, chẩn đoán
            nhằm phát hiện dấu hiệu của ung thư, để biết mình có nguy cơ mắc ung
            thư không khi ở giai đoạn rất sớm và chưa có bất cứ biểu hiện nào
            của bệnh. Ngoài ra, tầm soát ung thư còn phát hiện được những tổn
            thương tiền ung thư, là những tổn thương không phải ung thư nhưng có
            nhiều khả năng chuyển thành ung thư sau này.
          </p>
          <p className="text-gray-700 font-bold">
            Vì sao nên thực hiện tầm soát ung thư sớm?
          </p>
          <p className="text-gray-700 mb-3">
            Ung thư là căn bệnh rất nguy hiểm, bệnh thường diễn tiến âm thầm và
            không có biểu hiện rõ ràng ở giai đoạn đầu, khi phát hiện bệnh
            thường ở giai đoạn muộn, đã có biểu hiện ra bên ngoài như đau, lở
            loét, sùi, chảy máu mủ,…
          </p>
          <p className="text-gray-700">
            Đa số bệnh nhân ung thư khi nhập viện đều ở giai đoạn muộn, gần như
            70% - 80% bệnh nhân đã ở giai đoạn ung thư tiến xa. Việc phát hiện ở
            giai đoạn muộn làm cho việc điều trị không được hiệu quả và làm cho
            thời gian sống của người bệnh giảm đi. Tầm soát, phát hiện sớm ung
            thư là cách tốt nhất giúp phòng ngừa bệnh lý ung thư, tăng cơ hội
            điều trị thành công, tiết kiệm tối đa chi phí và bảo vệ sức khỏe của
            mỗi người.
          </p>
        </div>

        {/* Hình ảnh minh họa */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/CancerScreening/banner_general.png"
            alt="Tầm Soát Ung Thư"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Danh sách gói tầm soát */}
      <div className="container mx-auto px-4 my-8">
        <h4 className="text-2xl font-bold mb-6">Danh Sách Gói Tầm Soát</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cancer && cancer?.length > 0 ? (
            cancer.map((item) => (
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

export default CancerScreening;
