import { useState } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      name: "Võ Xuân Hải",
      date: "10/09/2024",
      content:
        "Lễ tân nhẹ nhàng, nhiệt tình, hỗ trợ nhanh. Bác sĩ Thắng tận tình, giải thích và đưa phác đồ rõ ràng.",
      stars: 5,
    },
    {
      name: "Nguyễn Thị Duyên",
      date: "27/07/2024",
      content:
        "Hài lòng về phòng khám, có thông tin trước, không phải chờ đợi.",
      stars: 4,
    },
    {
      name: "Trần Minh Tùng",
      date: "20/07/2024",
      content:
        "Tôi đặt lịch khám cho con, bác sĩ khám chu đáo, dịch vụ phòng khám tốt. Tôi không có phàn nàn gì.",
      stars: 5,
    },
    {
      name: "Bùi Minh Hoàng",
      date: "06/07/2024",
      content:
        "Tình trạng đã đỡ, cảm nhận phòng khám lịch sự, thoải mái. Đặt lịch qua BookingCare thuận tiện, được khám đúng khung giờ.",
      stars: 5,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    content: "",
    stars: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.content || formData.stars === 0) {
      alert("Vui lòng điền đầy đủ thông tin và chọn số sao.");
      return;
    }

    setFeedbacks([formData, ...feedbacks]);
    setFormData({ name: "", date: "", content: "", stars: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h4 className="text-2xl font-bold mb-6">
        Phản hồi của bệnh nhân sau khi đi khám
      </h4>

     

      {/* Danh sách đánh giá */}
      {feedbacks.map((fb, index) => (
        <div key={index} className="py-6 border-b last:border-b-0">
          <p className="font-semibold text-lg flex items-center gap-2 mb-1">
            {fb.name}
            <FaCheckCircle className="text-sky-400" />
            <span className="text-sky-400 text-base font-normal">
              đã khám ngày {fb.date}
            </span>
          </p>
          <div className="flex gap-1 text-yellow-400 mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={i < fb.stars ? "" : "text-gray-300"} />
            ))}
          </div>
          <p className="text-gray-700">{fb.content}</p>
        </div>
      ))}



       {/* Form đánh giá */}
       <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
  <input
    type="text"
    placeholder="Họ tên"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    className="w-full border border-gray-300 rounded-lg px-4 py-2"
  />
  <input
    type="date"
    value={formData.date}
    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
    className="w-full border border-gray-300 rounded-lg px-4 py-2"
  />
  <textarea
    placeholder="Nội dung phản hồi"
    value={formData.content}
    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
    className="w-full border border-gray-300 rounded-lg px-4 py-2"
  />
  <div className="flex items-center gap-1.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        onClick={() => setFormData({ ...formData, stars: star })}
        className={`cursor-pointer text-xl ${
          formData.stars >= star ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    <span className="text-sm text-gray-600 ml-2">Chọn số sao</span>
  </div>
  <button
    type="submit"
    className="self-start bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600"
  >
    Gửi đánh giá
  </button>
</form>

    </div>
  );
};

export default FeedbackList;
