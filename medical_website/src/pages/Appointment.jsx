import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { FiCalendar } from "react-icons/fi";
import RelatedDoctors from '../components/RelatedDoctors';
import Footer from '../components/Footer';

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, Goikham, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviews, setReviews] = useState([]); // State để lưu các đánh giá
  const [newReview, setNewReview] = useState(''); // State để lưu đánh giá mới từ người dùng

  // Hàm lấy thông tin của bác sĩ dựa trên docId từ đường dẫn và gói khám 
  const fetchDocInfo = () => {
    let foundDoc = doctors.find((doc) => doc._id === docId);
  
    if (!foundDoc && Goikham) {
      foundDoc = Goikham.find((item) => item._id === docId);
    }
  
    setDocInfo(foundDoc);
    setReviews(foundDoc?.reviews || []);
  };
  

  const getAvailableSlots = () => {
    const today = new Date();
    const slots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(18, 0, 0, 0);

      const startHour = i === 0 ? Math.max(currentDate.getHours() + 1, 7) : 7;
      currentDate.setHours(startHour);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[0].length > 0) {
      setSelectedDate(docSlots[0][0].datetime);
    }
  }, [docSlots]);

  const handleSelectDate = (index) => {
    setSlotIndex(index);
    setSelectedDate(docSlots[index][0].datetime);
    setSlotTime('');
  };

  const handleSelectTime = (time) => {
    setSlotTime(time);
  };

  const handleConfirmation = () => {
    if (!slotTime || !selectedDate) {
      alert("Vui lòng chọn ngày và giờ khám trước khi xác nhận!");
      return;
    }

    navigate(`/confirmation`, {
      state: {
        doctorId: docInfo._id,
        doctorName: docInfo.name,
        doctorImage: docInfo.image,
        selectedTime: slotTime,
        selectedDate: selectedDate,
        doctorFees: docInfo.fees,
      },
    });
  };

  const handleAddReview = () => {
    if (newReview.trim() === '') {
      alert('Vui lòng nhập nội dung đánh giá!');
      return;
    }
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewReview('');
  };

  return docInfo && (
    <div className="mt-5 pt-5">
      <Header />
      <div className="flex flex-col sm:flex-row gap-4 mx-15">
        <div>
          <img className="bg-blue-900 w-full h-85 sm:max-w-72 rounded-lg" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-6 py-4 bg-white mx-2 sm:mx-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 font-bold">{docInfo.name}</p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
            <p>{docInfo.speciality}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">Giới thiệu</p>
            <p className="text-sm text-gray-900 max-w-[900px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-900 font-medium">Giá khám: <span>{docInfo.fees} {currencySymbol}</span></p>
        </div>
      </div>

      <div className="sm:ml-75 sm:pl-4 font-medium text-gray-700">
        <div className="font-medium text-gray-700 flex gap-2 my-3">
          <FiCalendar className="text-2xl text-blue-900" />
          <p className="text-lg m-0">Lịch khám</p>
        </div>

        <div className="flex gap-3 items-center w-full overflow-x-scroll">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => handleSelectDate(index)}
              className={`text-center p-2 min-w-16 rounded cursor-pointer ${slotIndex === index ? 'bg-blue-900 text-white' : 'border border-gray-200 hover:bg-gray-100' }`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-4 py-4">
  {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
    <div
      key={index}
      onClick={() => handleSelectTime(item.time)}
      className={`w-full max-w-[10rem] text-sm font-normal p-2 text-center min-h-[36px] rounded-md cursor-pointer transition-colors duration-200 ${
        item.time === slotTime
          ? 'bg-blue-900 text-white'
          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      }`}
    >
      {item.time}
    </div>
  ))}
</div>


        <button
          onClick={handleConfirmation}
          disabled={!slotTime || !selectedDate}
          className={`text-sm font-light px-10 py-2.5 rounded my-6 ${
            slotTime && selectedDate
              ? 'bg-blue-900 text-white cursor-pointer'
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'
          }`}
        >
          Xác nhận lịch khám
        </button>
      </div>

      {/* Hiển thị đánh giá */}
      <div className="container mx-auto mt-6">
        <h4 className="text-2xl font-bold md:text-left">Đánh giá</h4>
        <div className="reviews mt-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b border-gray-300 py-2">
                <p className="text-sm text-gray-800">{review}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Chưa có đánh giá nào.</p>
          )}
        </div>
        <div className="mt-4">
          <textarea
            className="w-full border border-gray-400 p-2 rounded-md"
            placeholder="Viết đánh giá..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-900 text-white rounded-md"
            onClick={handleAddReview}
          >
            Thêm đánh giá
          </button>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      <Footer />

    </div>
  );
};

export default Appointment;
