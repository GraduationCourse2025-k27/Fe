import React, { useState } from "react";
import { BiPaperclip } from "react-icons/bi";

export default function Contact() {
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});

  // Hàm xác thực biểu mẫu
  const validateForm = (formData) => {
    const errors = {};

    // Xác thực Họ và tên
    const fullName = formData.get("fullName")?.trim();
    if (!fullName) {
      errors.fullName = "Họ và tên là bắt buộc.";
    } else if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(fullName)) {
      errors.fullName = "Họ và tên chỉ chứa chữ cái và tối thiểu 2 ký tự.";
    }

    // Xác thực Số điện thoại
    const phone = formData.get("phone")?.trim();
    if (!phone) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^0\d{9}$/.test(phone)) {
      errors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.";
    }

    // Xác thực Email
    const email = formData.get("email")?.trim();
    if (!email) {
      errors.email = "Email là bắt buộc.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Email không đúng định dạng.";
    }

    // Xác thực Vấn đề cần liên hệ
    const issue = formData.get("issue");
    if (!issue || issue === "Vấn đề cần liên hệ") {
      errors.issue = "Vui lòng chọn một vấn đề.";
    }

    // Xác thực Chi tiết vấn đề (tùy chọn)
    const details = formData.get("details")?.trim();
    if (details && details.length < 10) {
      errors.details = "Chi tiết phải có ít nhất 10 ký tự.";
    }

    // Xác thực Tệp đính kèm (tùy chọn)
    const file = formData.get("file");
    if (file && file.size > 0) {
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        errors.file = "Chỉ chấp nhận tệp PDF, DOC, hoặc DOCX.";
      } else if (file.size > 5 * 1024 * 1024) {
        errors.file = "Tệp phải nhỏ hơn 5MB.";
      }
    }

    return errors;
  };

  // Xử lý khi người dùng chọn tệp
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setErrors((prev) => ({ ...prev, file: "" }));
    } else {
      setFileName("");
    }
  };

  // Xử lý khi gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Xác thực biểu mẫu
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Dừng nếu có lỗi
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Biểu mẫu đã được gửi thành công!");
        form.reset();
        setFileName("");
        setErrors({});
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
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên *"
                className="p-2 border rounded-md w-full"
                required
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Nhập số điện thoại *"
                className="p-2 border rounded-md w-full"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Nhập email *"
                className="p-2 border rounded-md w-full"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <select name="issue" className="p-2 border rounded-md w-full">
                <option value="">Vấn đề cần liên hệ</option>
                <option value="Dịch vụ">Dịch vụ</option>
                <option value="Kỹ thuật">Kỹ thuật</option>
                <option value="Khác">Khác</option>
              </select>
              {errors.issue && <p className="text-red-500 text-xs mt-1">{errors.issue}</p>}
            </div>
            <div>
              <textarea
                name="details"
                placeholder="Nhập chi tiết vấn đề cần liên hệ"
                className="p-2 border rounded-md h-24 w-full"
              />
              {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
            </div>
            <div>
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer"
              >
                <BiPaperclip className="text-lg" />
                <span>
                  Đính kèm tài liệu
                  {fileName && <span className="text-gray-600"> ({fileName})</span>}
                </span>
              </label>
              <input
                id="file-upload"
                name="file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            </div>
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
          <ul className="text-sm space-y-2 text-gray-700">
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