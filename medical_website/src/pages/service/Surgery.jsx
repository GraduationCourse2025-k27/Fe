import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AppContext } from '../../context/AppContext';
import Footer from '../../components/Footer';


const Surgery = () => {
    const { Goikham, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(Goikham);

  return (
    <div className='mt-5 pt-5'>
        <Header/>
        <div className="flex flex-col md:flex-row items-center px-6">
        {/* Thông tin bên trái */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Phẫu thuật là gì?</h1>
          <p className="text-gray-700 mb-3">
          Phẫu thuật là một phương pháp can thiệp y học quan trọng, giúp điều trị hoặc cải thiện các vấn đề sức khỏe bằng cách thao tác trực tiếp lên cơ thể, như cắt bỏ, sửa chữa hoặc thay thế các bộ phận bị tổn thương.
          </p>
          <p className="text-gray-700">
          Phẫu thuật không chỉ giúp điều trị hiệu quả nhiều bệnh lý nghiêm trọng như ung thư, tim mạch, xương khớp, mà còn đóng vai trò then chốt trong việc phục hồi chức năng cơ thể, giảm đau và nâng cao chất lượng cuộc sống cho người bệnh.
          </p>
          <p className="text-gray-700">
          Bên cạnh đó, những tiến bộ trong kỹ thuật phẫu thuật hiện đại như phẫu thuật nội soi, robot hỗ trợ hay phẫu thuật thẩm mỹ còn mang lại độ chính xác cao, giảm thiểu xâm lấn, rút ngắn thời gian hồi phục và giúp bệnh nhân sớm quay lại cuộc sống bình thường.
          </p>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/GenTest/banner_general.png"
            alt="Phẩu Thuật"
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



        <Footer/>

      
    </div>
  )
}

export default Surgery
