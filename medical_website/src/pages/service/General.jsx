import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AppContext } from '../../context/AppContext';
import Footer from '../../components/Footer';

const General = () => {
  const { Goikham, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(Goikham);

  return (
    <div className="mt-5 pt-5">
      <Header />
      <div className="flex flex-col md:flex-row items-center px-6">
        {/* Thông tin bên trái */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Khám tổng quát là gì?</h1>
          <p className="text-gray-700 mb-3">
            Khám sức khỏe tổng quát là phương pháp giúp bản thân có cái nhìn chung về tình trạng sức khỏe hiện tại và phát hiện sớm các bệnh dễ mắc phải như
            tiểu đường, gout, huyết áp, mỡ máu, viêm gan, tim mạch, đột quỵ…
          </p>
          <p className="text-gray-700">
            Dựa vào kết quả thăm khám và xét nghiệm tổng quát, bác sĩ sẽ chẩn đoán, phát hiện bệnh sớm, điều trị kịp thời và chính xác. Ngoài ra, khám tổng quát
            còn giúp đánh giá và điều chỉnh lối sống để hạn chế các rủi ro gây bệnh.
          </p>
          <p className="text-gray-700">
            Khám tổng quát cần được thực hiện định kỳ <b>ít nhất 6 tháng/lần.</b>
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
      <div className="container mx-auto">
        <h4 className="text-2xl font-bold md:text-left">Danh Sách Gói Khám</h4>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {Goikham && Goikham.length > 0 ? (
            Goikham.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)} 
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-blue-50 w-full h-60 object-cover"
                />
                <div className="p-2">
                  <span className="text-gray-900 text-lg font-medium block mt-1">
                    {item.name}
                  </span>
                  <p className="text-gray-600 text-sm block mt-1">{item.about}</p>
                  <span className="text-green-500 text-lg font-bold block mt-2">
                    {item.fees.toLocaleString()} {currencySymbol}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center">Không có gói khám nào để hiển thị.</p>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default General;
