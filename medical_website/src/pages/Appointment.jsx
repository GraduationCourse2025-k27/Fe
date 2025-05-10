import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FiCalendar } from "react-icons/fi";
import * as DoctorService from "../service/Doctor/DoctorApi";
import FeedbackList from "../components/FeedbackList";
import RelatedDoctors from "../components/RelatedDoctors";
import NoFoundData from "../components/NoFoundData";
import { BiCalendarX } from "react-icons/bi";

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const location = useLocation();
  const { currencySymbol } = useContext(AppContext);
  const daysOfWeek = [
    "CN",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [Doctor, setDoctor] = useState({});
  const [scheduleDoctors, setScheduleDoctors] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null); // Thêm state mới để lưu id

  useEffect(() => {
    if (docId) {
      findDoctorById(docId);
    }
  }, [docId]);

  useEffect(() => {
    if (docId && scheduleDoctors.length > 0) {
      getAvailableSlots(scheduleDoctors);
    }
  }, [docId, scheduleDoctors]);

  useEffect(() => {
    if (docSlots.length > 0 && docSlots[0].length > 0) {
      setSelectedDate(docSlots[0][0].datetime);
    }
  }, [docSlots]);

  // kiem tra query parameter showFeedBackForm
  const query = new URLSearchParams(location.search);
  const showFeedBackForm = query.get("showFeedBackForm") === "true";

  const findDoctorById = async (id) => {
    const result = await DoctorService.findDoctorById(id);
    setDoctor(result);
    setScheduleDoctors(result?.consultationSchedules);
  };

  const getAvailableSlots = (consultationSchedules) => {
    // Lọc các khung giờ chưa được đặt
    const availableSchedules = consultationSchedules.filter(
      (schedule) => !schedule.booked
    );

    // Nhóm các khung giờ theo ngày
    const slotsByDate = availableSchedules.reduce((acc, schedule) => {
      const date = schedule.dateAppointment;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        id: schedule.id,
        datetime: new Date(`${date}T${schedule.startTime}`),
        time: `${schedule.startTime.slice(0, 5)} - ${schedule.endTime.slice(
          0,
          5
        )}`,
      });
      return acc;
    }, {});

    // Tạo mảng slots cho 7 ngày (hoặc theo dữ liệu API)
    const today = new Date();
    const slots = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const dateKey = currentDate.toISOString().split("T")[0]; // Định dạng YYYY-MM-DD
      // Lấy danh sách khung giờ của ngày hiện tại, nếu không có thì trả về mảng rỗng

      let timeSlots = slotsByDate[dateKey] || [];

      if (timeSlots) {
        timeSlots = timeSlots.filter((slot) => {
          const timeDifference = (slot.datetime - now) / 1000;
          return timeDifference >= 3600;
        });
      }
      // Sắp xếp khung giờ theo thời gian bắt đầu
      timeSlots.sort((a, b) => a.datetime - b.datetime);

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  const handleSelectDate = (index) => {
    setSlotIndex(index);
    setSelectedDate(docSlots[index][0].datetime);
    setSlotTime("");
    setSelectedScheduleId(null);
  };

  const handleSelectTime = (time, id) => {
    setSlotTime(time);
    setSelectedScheduleId(id);
  };

  const handleConfirmation = () => {
    if (!slotTime || !selectedDate || !selectedScheduleId) {
      alert("Vui lòng chọn ngày và giờ khám trước khi xác nhận!");
      return;
    }

    navigate(`/confirmation`, {
      state: {
        doctorId: Doctor?.id,
        doctorName: Doctor?.client?.fullName,
        doctorImage: Doctor?.imagePath,
        selectedTime: slotTime,
        selectedDate: selectedDate,
        doctorFees: Doctor?.examinationPrice,
        selectScheduleId: selectedScheduleId,
      },
    });
  };

  return (
    Doctor && (
      <div className="mt-5 pt-5">
        <div className="flex flex-col sm:flex-row gap-4 mx-15">
          <div>
            <img
              className="bg-blue-900 w-full h-85 sm:max-w-72 rounded-lg"
              src={Doctor?.imagePath}
              alt={Doctor?.client?.fullName}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-6 py-4 bg-white mx-0 sm:mx-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl text-gray-900 font-bold">
              {Doctor?.client?.fullName}
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
              <p>{Doctor?.speciality?.name}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                Giới thiệu
              </p>
              <p className="text-sm text-gray-900 max-w-[900px] mt-1">
                {Doctor?.description}
              </p>
            </div>
            <p className="text-gray-900 font-medium">
              Giá khám:{" "}
              <span>
                {Doctor?.examinationPrice?.toLocaleString()} {currencySymbol}
              </span>
            </p>
          </div>
        </div>

        <div className=" ml-10 sm:ml-85 font-medium text-gray-700">
          <div className="font-medium text-gray-700 flex gap-2 my-3">
            <FiCalendar className="text-2xl text-blue-900" />
            <p className="text-lg m-0">Lịch khám</p>
          </div>

          {/* ngay lam viec */}
          <div className="flex gap-3 items-center w-full overflow-x-scroll">
            {docSlots.length > 0 ? (
              docSlots.map((item, index) => (
                <div
                  onClick={() => handleSelectDate(index)}
                  className={`text-center p-2 min-w-16 rounded cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-900 text-white"
                      : "border border-gray-200 hover:bg-gray-100"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full w-full flex justify-center">
                <NoFoundData
                  icon={BiCalendarX}
                  iconColor="text-red-400" // Màu đỏ để thể hiện cảnh báo
                  content="Bác sĩ không có lịch làm việc vào thời điểm này"
                  size={72}
                />
              </div>
            )}
          </div>

          {/* khung gio lam viec trong 1 ngay */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-4 py-4">
            {docSlots.length > 0
              ? docSlots[slotIndex].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectTime(item.time, item.id)}
                    className={`w-full max-w-[10rem] text-sm font-normal p-2 text-center min-h-[36px] rounded-md cursor-pointer transition-colors duration-200 ${
                      item.time === slotTime
                        ? "bg-blue-900 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.time}
                  </div>
                ))
              : null}
          </div>

          <button
            onClick={handleConfirmation}
            disabled={!slotTime || !selectedDate}
            className={`text-sm font-light px-10 py-2.5 rounded my-6 ${
              slotTime && selectedDate
                ? "bg-blue-900 text-white cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Xác nhận lịch khám
          </button>
        </div>
        <FeedbackList showFeedBackForm={showFeedBackForm} docId={docId} />

        <div>
          <RelatedDoctors speciality={Doctor?.speciality?.id} docId={""} />
        </div>
      </div>
    )
  );
};

export default Appointment;
