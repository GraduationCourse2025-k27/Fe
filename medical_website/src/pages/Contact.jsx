import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ với chúng tôi!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-23">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Phần bản đồ */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md mb-6 text-center">
              <h1 className="text-2xl font-bold">Vị trí của bệnh viện</h1>
            </div>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1774.8377443370866!2d108.21454897421336!3d16.07267612857008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421900394d27b5%3A0x2f5e34a408ac14e6!2zQuG7h25oIHZp4buHbiDEkWEga2hvYSDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1743527506775!5m2!1svi!2s"
              width="100%"
              height="400"
              className="border-0 rounded-lg shadow-md"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="text-center mt-4">
  <a
    href="https://www.google.com/maps/dir/?api=1&destination=16.07267612857008,108.21454897421336"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md inline-block !no-underline"
  >
    Xem đường đi
  </a>
</div>
          </div>

          {/* Phần biểu mẫu */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md mb-6 text-center">
              <h1 className="text-2xl font-bold">Liên hệ với chúng tôi!</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Họ và tên:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ và tên"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Nhập email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Số điện thoại:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Ghi chú:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập ghi chú"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;