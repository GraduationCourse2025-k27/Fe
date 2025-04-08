import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const { doctorId, doctorName, doctorImage, selectedTime } = location.state || {};

  return (
    <div>
      <h2>Xác nhận lịch khám</h2>
      <img src={doctorImage} alt={doctorName} />
      <p>Bác sĩ: {doctorName}</p>
      <p>Thời gian khám: {selectedTime}</p>
      {/* Nút xác nhận cuối cùng hoặc gửi dữ liệu lên server */}
    </div>
  );
};

export default Confirmation;
