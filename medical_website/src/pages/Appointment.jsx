import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { AppContext } from '../context/AppContext';
import { FiCalendar } from "react-icons/fi";
import RelatedDoctors from '../components/RelatedDoctors';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const Appointment = () => {

  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencySymol } = useContext(AppContext);

  const daysOfWeek = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc._id === docId);
    setDocInfo(foundDoc);
    console.log('Thông tin bác sĩ tìm được:', foundDoc);
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(18, 0, 0, 0);

      currentDate.setHours(i === 0 && currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 7);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-1 px-2 ml-2 mb-4 border text-xs rounded">{docInfo.experience}</button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">Giới thiệu</p>
            <p className="text-sm text-gray-900 max-w-[900px] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-900 font-medium">Giá khám: <span>{docInfo.fees} {currencySymol}</span></p>
        </div>
      </div>

      <div className="sm:ml-75 sm:pl-4 font-medium text-gray-700">
        <div className="font-medium text-gray-700 flex gap-2 my-2">
          <FiCalendar className="text-2xl text-blue-900" />
          <p className="text-lg m-0">Lịch khám</p>
        </div>

        <div className="flex gap-3 items-center w-full overflow-x-scroll">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center p-2 min-w-16 rounded cursor-pointer ${slotIndex === index ? 'bg-blue-900 text-white' : 'border border-gray-200'}`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className="flex overflow-x-auto gap-3 py-4">
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-900 text-white' : 'border border-gray-300 text-gray-600'}`}
            >
              {item.time}
            </div>
          ))}
        </div>
        <button 
  onClick={() => 
    navigate(`/confirmation`, {
      state: { 
        doctorId: docInfo._id,
        doctorName: docInfo.name,
        doctorImage: docInfo.image,
        selectedTime: slotTime
      }
    })
  } 
  className="bg-blue-900 text-white text-sm font-light px-10 py-2.5 rounded my-6"
>
  Xác nhận lịch khám
</button>

      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      <Footer />
    </div>
  );
};

export default Appointment;
