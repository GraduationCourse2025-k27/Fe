import Footer from '../../components/Footer'
import Header from '../../components/Header'
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';


const CancerScreening = () => {
  const { Goikham, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  console.log(Goikham);
  return (
    <div className='mt-5 pt-5'>
        <Header/>
        <div className="flex flex-col md:flex-row items-center px-6">
        {/* Thông tin bên trái */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-2xl font-bold mb-4">Tầm soát ung thư là gì ?</h1>
          <p className="text-gray-700 mb-3">
          Tầm soát ung thư là thực hiện các phương pháp xét nghiệm, chẩn đoán nhằm phát hiện dấu hiệu của ung thư, để biết mình có nguy cơ mắc ung thư không khi ở giai đoạn rất sớm và chưa có bất cứ biểu hiện nào của bệnh. Ngoài ra, tầm soát ung thư còn phát hiện được những tổn thương tiền ung thư, là những tổn thương không phải ung thư nhưng có nhiều khả năng chuyển thành ung thư sau này.
          </p>
          <p className="text-gray-700 font-bold">
          Vì sao nên thực hiện tầm soát ung thư sớm ?
          </p>
          <p className="text-gray-700">
          Ung thư là căn bệnh rất nguy hiểm, bệnh thường diễn tiến âm thầm và không có biểu hiện rõ ràng ở giai đoạn đầu, khi phát hiện bệnh thường ở giai đoạn muộn, đã có biểu hiện ra bên ngoài như đau, lở loét, sùi, chảy máu mủ,…
          </p>
          <p>Đa số bệnh nhân ung thư khi nhập viện đều ở giai đoạn muộn, gần như 70% - 80% bệnh nhân đã ở giai đoạn ung thư tiến xa. Việc phát hiện ở giai đoạn muộn làm cho việc điều trị không được hiệu quả và làm cho thời gian sống của người bệnh giảm đi.
Tầm soát, phát hiện sớm ung thư là cách tốt nhất giúp phòng ngừa bệnh lý ung thư, tăng cơ hội điều trị thành công, tiết kiệm tối đa chi phí và bảo vệ sức khỏe của mỗi người.</p>
        </div>

        {/* Hình ảnh bên phải */}
        <div className="md:w-1/2 p-4">
          <img
            src="https://edoctor.io/assets/dich-vu/CancerScreening/banner_general.png"
            alt="Tầm Soát Ung Thư"
            className="w-full rounded-lg"
          />
        </div>
      </div>
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

export default CancerScreening
