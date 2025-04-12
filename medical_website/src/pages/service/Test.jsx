import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { AppContext } from '../../context/AppContext';

const Test = () => {
  const { Goikham, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const goiXetNghiem = Goikham?.filter((item) => item.type === 'xet-nghiem');

  return (
    <div className="mt-5 pt-5">
      <Header />

      {/* Thông tin giới thiệu */}
      <div className="flex flex-col md:flex-row items-center px-6">
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Xét nghiệm tổng quát là gì?</h1>
          <p className="text-gray-700 mb-3">
            Xét nghiệm tổng quát được xem là một phương pháp kiểm tra sức khỏe tiện lợi, nhanh chóng và được hầu hết bác sĩ chỉ định trong các trường hợp khám chữa bệnh.
          </p>
          <p className="text-gray-700 mb-3">
            Thông qua những chỉ số từ kết quả xét nghiệm máu và nước tiểu, bạn sẽ nắm rõ tình trạng cơ thể hiện tại và phát hiện những vấn đề về sức khỏe hoặc các bệnh lý cơ bản như: bệnh gout, bệnh tiểu đường, tình trạng tăng men gan, rối loạn chức năng gan, thận, xơ vữa động mạch hoặc tầm soát một số loại ung thư như ung thư vú, ung thư cổ tử cung, …
          </p>
          <p className="text-gray-700 mb-3">
            Việc phát hiện bệnh sớm sẽ giúp cho việc điều trị và phòng ngừa trở nên dễ dàng và hiệu quả hơn.
          </p>
          <p className="text-gray-700">
            Giúp bạn <b>tiết kiệm được rất nhiều thời gian, chi phí và sức lực.</b>
          </p>
        </div>

        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/banner_general.png"
            alt="Xét nghiệm"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Danh sách gói xét nghiệm */}
      <div className="container mx-auto px-4 my-8">
        <h4 className="text-2xl font-bold mb-6">Danh Sách Gói Xét Nghiệm</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goiXetNghiem && goiXetNghiem.length > 0 ? (
            goiXetNghiem.map((item) => (
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
            <p className="text-gray-700 text-center col-span-full">
              Không có gói xét nghiệm nào để hiển thị.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Test;
