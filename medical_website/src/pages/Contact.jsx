import React, { useState } from "react";
import { BiPaperclip } from "react-icons/bi";
export default function Contact() {
  const [fileName, setFileName] = useState("");

  // Xử lý khi người dùng chọn tệp
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  // Xử lý khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của biểu mẫu
    const form = e.target;
    const formData = new FormData(form); // Thu thập tất cả dữ liệu biểu mẫu, bao gồm tệp

    try {
      // Gửi dữ liệu đến điểm cuối (giả định là '/api/contact')
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Biểu mẫu đã được gửi thành công!");
        form.reset(); // Đặt lại biểu mẫu sau khi gửi thành công
        setFileName(""); // Xóa tên tệp hiển thị
      } else {
        alert("Gửi biểu mẫu thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi biểu mẫu:", error);  
      alert("Đã xảy ra lỗi khi gửi biểu mẫu.");
    }
  };

  return (
    <div className="pt-5 m-5">
     
      <div className="max-w-4xl mx-auto bg-white rounded border flex flex-col md:flex-row gap-6 p-6 md:p-8">
        {/* Biểu mẫu liên hệ */}
        <div className="w-full md:w-1/2 space-y-4">
          <h4 className="text-xl font-bold mb-2 text-blue-900">LIÊN HỆ VỚI CHÚNG TÔI</h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên *"
              className="p-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại *"
              className="p-2 border rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Nhập email *"
              className="p-2 border rounded-md"
              required
            />
            <select name="issue" className="p-2 border rounded-md">
              <option>Vấn đề cần liên hệ</option>
              <option>Dịch vụ</option>
              <option>Kỹ thuật</option>
              <option>Khác</option>
            </select>
            <textarea
              name="details"
              placeholder="Nhập chi tiết vấn đề cần liên hệ"
              className="p-2 border rounded-md h-24"
            />

            {/* Phần đính kèm tệp */}
            <label
              htmlFor="file-upload"
              className="!flex items-center gap-2 text-blue-600 font-medium cursor-pointer"
            >
              <BiPaperclip className="text-lg" />
              <span>
                Đính kèm tài liệu
                {fileName && (
                  <span className="text-gray-600"> ({fileName})</span>
                )}
              </span>
            </label>

            <input
              id="file-upload"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Gửi ngay
            </button>
          </form>
        </div>

        {/* Thông tin liên hệ */}
        <div className="w-full md:w-1/2 space-y-4">
          <h4 className="text-xl font-bold mb-2 text-blue-900">ĐỊA CHỈ BỆNH VIỆN</h4>
          <div className="bg-white border border-blue-500 p-4 rounded-md">
            <p className="text-gray-700 text-sm mb-3">
              <strong>Số 124 Hải Phòng, Thạch Thang, Quận Hải Châu, Thành phố Đà Nẵng.</strong>
            </p>
            <div className="rounded-md overflow-hidden">
              <iframe
                title="Bệnh viện Đa khoa Đà Nẵng"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.4639863271033!2d108.21480441983637!3d16.072963450964515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183647beb45b%3A0x2b7c055c22c6c77b!2zQuG7h25oIHZp4buHbiDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1744446369577!5m2!1svi!2s"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
          <ul className="text-sm space-y-2  text-gray-700">
            <li>
              <strong>Hotline:</strong>{" "}
              <a href="tel:19006115" className="text-blue-600 !no-underline">
                0335452679
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:benhviendakhoa@gmail.com"
                className="text-blue-600 !no-underline"
              >
                benhviendakhoa@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
