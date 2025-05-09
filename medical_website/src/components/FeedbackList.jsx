import { useEffect, useState } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import * as ReviewService from "../service/Review/ReviewService";
import { formatDate } from "../validation/common/FormatDate";

const FeedbackList = ({ showFeedBackForm = false, docId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [idClient, setIdClient] = useState(localStorage.getItem("id") || null);

  const [formData, setFormData] = useState({
    doctorId: docId || 0,
    clientId: idClient || 0,
    content: "",
    rate: 0,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const storedid = localStorage.getItem("id");
      if (storedid !== idClient) {
        setIdClient(storedid);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [idClient]);

  useEffect(() => {
    if (idClient != null) {
      setFormData((prev) => ({
        ...prev,
        clientId: idClient ? parseInt(idClient) : 0,
        doctorId: docId ? parseInt(docId) : 0,
      }));
    }
  }, [idClient, docId]);

  useEffect(() => {
    handleListReviewByDoctor(docId);
  }, [docId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAssessDoctor = async (e) => {
    e.preventDefault();
    if (!formData.content || formData.rate === 0) {
      alert("Vui lòng điền nội dung và chọn số sao.");
      return;
    }
    try {
      const result = await ReviewService.assessDoctor(formData);
      if (result != null) {
        alert("Gửi đánh giá thành công");
        setFormData((prev) => ({
          ...prev,
          content: "",
          rate: 0,
        }));
        //load list review By Doctor
        handleListReviewByDoctor(docId);
      } else {
        alert("Gửi đánh giá thất bại");
      }
    } catch (error) {
      alert("Lỗi Fecth Data từ backend!");
      console.log(error);
    }
  };

  const handleListReviewByDoctor = async (idDoctor) => {
    const result = await ReviewService.listReviewByDoctor(idDoctor);
    if (result.length > 0) {
      setFeedbacks(result);
    } else {
      setFeedbacks([]);
    }
  };

  console.log("FormData", formData);
  console.log("ListDoctor", feedbacks);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h4 className="text-2xl font-bold mb-6">
        {feedbacks.length > 0 && "Phản hồi của bệnh nhân sau khi đi khám"}
      </h4>
      {/* Danh sách đánh giá */}
      {feedbacks.length > 0 &&
        feedbacks.map((fb, index) => (
          <div key={index} className="py-6 border-b last:border-b-0">
            <p className="font-semibold text-lg flex items-center gap-2 mb-1">
              {fb.client?.fullName}
              <FaCheckCircle className="text-sky-400" />
              <span className="text-sky-400 text-base font-normal">
                đã khám ngày {formatDate(fb.dateReview)}
              </span>
            </p>
            <div className="flex gap-1 text-yellow-400 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < fb.rate ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-700">{fb.content}</p>
          </div>
        ))}

      {/* Form đánh giá */}
      {showFeedBackForm && (
        <form
          onSubmit={handleAssessDoctor}
          className="my-4 flex flex-col gap-4"
        >
          <input
            hidden
            type="text"
            value={formData.clientId}
            onChange={(e) => handleInputChange("clientId", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            hidden
            type="text"
            value={formData.doctorId}
            onChange={(e) => handleInputChange("doctorId", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <textarea
            placeholder="Nội dung phản hồi"
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => handleInputChange("rate", star)}
                className={`cursor-pointer text-xl ${
                  formData.rate >= star ? "text-yellow-400" : "text-gray-300"
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
      )}
    </div>
  );
};

export default FeedbackList;
