import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AppContext } from '../../context/AppContext';

const Surgery = () => {
  const { Goikham, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const goiPhauThuat = Goikham?.filter((item) => item.type === 'phau-thuat');

  return (
    <div className="mt-5 pt-5">
      <Header />

      {/* Phần giới thiệu */}
      <div className="flex flex-col md:flex-row items-center px-6">
        {/* Thông tin bên trái */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Phẫu thuật là gì?</h1>
          <p className="text-gray-700 mb-3">
            Phẫu thuật là một phương pháp can thiệp y học quan trọng, giúp điều trị hoặc cải thiện các vấn đề sức khỏe bằng cách thao tác trực tiếp lên cơ thể, như cắt bỏ, sửa chữa hoặc thay thế các bộ phận bị tổn thương.
          </p>
          <p className="text-gray-700 mb-3">
            Phẫu thuật không chỉ giúp điều trị hiệu quả nhiều bệnh lý nghiêm trọng như ung thư, tim mạch, xương khớp, mà còn đóng vai trò then chốt trong việc phục hồi chức năng cơ thể, giảm đau và nâng cao chất lượng cuộc sống cho người bệnh.
          </p>
          <p className="text-gray-700">
            Những tiến bộ trong kỹ thuật phẫu thuật hiện đại như nội soi, robot hỗ trợ hay phẫu thuật thẩm mỹ mang lại độ chính xác cao, giảm thiểu xâm lấn, rút ngắn thời gian hồi phục và giúp bệnh nhân sớm quay lại cuộc sống bình thường.
          </p>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/GenTest/banner_general.png"
            alt="Phẫu Thuật"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Danh sách gói khám */}
      <div className="container mx-auto px-4 my-8">
        <h4 className="text-2xl font-bold mb-6">Danh Sách Gói Phẫu Thuật</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goiPhauThuat && goiPhauThuat.length > 0 ? (
            goiPhauThuat.map((item) => (
             
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-blue-50 w-full h-60 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <span className="text-gray-900 text-lg font-semibold block mb-2">
                    {item.name}
                  </span>
                  <span className="text-black  border rounded text-lg font-bold block mt-3 p-2">
                    Giá: {item.fees.toLocaleString()} {currencySymbol}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">Không có gói khám nào để hiển thị.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Surgery;
