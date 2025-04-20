export const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
// email phải có đuôi @gmail.com
export const phoneRegex = /^(0|\+84)\d{9}$/;
// SĐT phải có 10 số và bắt đầu bằng 0 hoặc +84
export const nameRegex = /^[\p{L}]+(\s[\p{L}]+)+$/u;
// chứa ít nhất 2 từ
// hỗ trợ tiếng việt
// không chứa số hoặc ký tự đặc biệt
