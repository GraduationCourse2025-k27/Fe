export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày, thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (0-11, nên +1)
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`;
};

export const validateContactForm = (formData) => {
  const errors = {};

  const fullName = formData.get("fullName")?.trim();
  if (!fullName) {
    errors.fullName = "Họ và tên là bắt buộc.";
  } else if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(fullName)) {
    errors.fullName = "Họ và tên chỉ chứa chữ cái và tối thiểu 2 ký tự.";
  }

  const phone = formData.get("phone")?.trim();
  if (!phone) {
    errors.phone = "Số điện thoại là bắt buộc.";
  } else if (!/^0\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.";
  }

  const email = formData.get("email")?.trim();
  if (!email) {
    errors.email = "Email là bắt buộc.";
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    errors.email = "Email không đúng định dạng.";
  }

  const issue = formData.get("issue");
  if (!issue || issue === "Vấn đề cần liên hệ") {
    errors.issue = "Vui lòng chọn một vấn đề.";
  }

  const details = formData.get("details")?.trim();
  if (details && details.length < 10) {
    errors.details = "Chi tiết phải có ít nhất 10 ký tự.";
  }

  const file = formData.get("file");
  if (file && file.size > 0) {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      errors.file = "Chỉ chấp nhận tệp PDF, DOC, hoặc DOCX.";
    } else if (file.size > 5 * 1024 * 1024) {
      errors.file = "Tệp phải nhỏ hơn 5MB.";
    }
  }

  return errors;
};


// confirmation 
export const validateConfirmationForm = (formData) => {
  const errors = {};

  const fullName = formData.fullName?.trim();
  if (!fullName) {
    errors.fullName = "Họ và tên là bắt buộc.";
  } else if (!/^[A-Za-zÀ-ỹ\s]{2,}$/.test(fullName)) {
    errors.fullName = "Họ và tên chỉ chứa chữ cái và tối thiểu 2 ký tự.";
  }

  const phone = formData.phone?.trim();
  if (!phone) {
    errors.phone = "Số điện thoại là bắt buộc.";
  } else if (!/^0\d{9}$/.test(phone)) {
    errors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số.";
  }

  const birthDate = formData.birthDate?.trim();
  if (!birthDate) {
    errors.birthDate = "Ngày sinh là bắt buộc.";
  } else {
    const birth = new Date(birthDate);
    const today = new Date();
    if (isNaN(birth.getTime()) || birth >= today) {
      errors.birthDate = "Ngày sinh không hợp lệ.";
    }
  }
  const gender = formData.gender?.trim();
  if (!gender) {
    errors.gender = "Vui lòng chọn giới tính.";
  }

  return errors;
}
