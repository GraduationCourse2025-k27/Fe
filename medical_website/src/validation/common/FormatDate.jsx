export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày, thêm số 0 nếu cần
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (0-11, nên +1)
  const year = date.getFullYear(); // Lấy năm

  return `${day}/${month}/${year}`;
};
