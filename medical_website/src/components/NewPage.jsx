import React from 'react';
import { Link } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';

const images = [
    "https://soyte.hanoi.gov.vn/documents/5065338/8638102/BVDG.jpg/8fe1d42e-8f13-4806-a477-9439d3fc063e?t=1739526226709",
    "https://topdanangaz.com/wp-content/uploads/2024/04/benh-vien-da-khoa-da-nang_4.jpg",
    "https://baodanang.vn/dataimages/201712/original/images1414730_a1.jpg",
    "https://thangloidanang.com.vn/uploads/images/chia-se-yeu-thuong-tai-benh-vien-da-khoa-da-nang3.jpg",
    "https://lh6.googleusercontent.com/proxy/bRAvt_-OikpsnyReN_TtNeE-8jzAKGFxPUI4kHBYx293rUGgxtBAflMwq5lkTyefwAhPZuL_7BcbJCU6SFuz2onwl_PVKBnUF1OQAJzUBvX01XRzg84ZGrGOMwY6HuK1SwEnwG9ZQdQhtspzgjY93Zw",
  ];
  const newsItems = [
    {
      id: 1,
      title: 'Bệnh thận mạn giai đoạn cuối đang có xu hướng gia tăng và trẻ hóa',
      image: 'https://suckhoedoisong.qltns.mediacdn.vn/zoom/780_488/324455921873985536/2025/4/11/hoi-thao-17443683580151718967724-83-0-1333-2000-crop-1744368362445786262946.jpg',
      desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
      large: true,
      date: "10/04/2025",
    },
    {
      id: 2,
      title: 'TP.HCM phát hiện ca viêm não do vi rút cúm gia cầm H5N1 hiếm gặp',
      image: 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/11/bvdk-ninh-thuan-1744366725671887131712.jpg',
      desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
      date: "10/04/2025",
    },
    {
      id: 3,
      title: 'Cục An toàn thực phẩm hướng dẫn tra cứu sản phẩm bảo vệ sức khỏe.',
      image: 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/12/edit-f4786938d9c76c9ac1ca8c94101fe072-17444214700331656693173.jpeg',
      desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
      date: "10/04/2025",
    },
    {
      id: 4,
      title: 'Vụ nghi ngộ độc thực phẩm tại Trường tiểu học Võ Thị Sáu TP.HCM',
      image: 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2024/11/5/tiem-chung-17307937543341046014806.jpg',
      desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
      date: "10/04/2025",
    },
    {
      id: 5,
      title: 'TP.HCM phát hiện ca viêm não do vi rút cúm gia cầm H5N1 hiếm gặp',
      image: 'https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/12/06/thu-tuc-kham-chua-benh-bao-hiem-y-te.png',
      desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
      date: "10/04/2025",
    },
  ];

const NewsPage = () => {
    return (
        <div className="p-2">
            <div className="max-w-6xl mx-auto">
                <h4 className="text-xl md:text-3xl font-bold text-center mb-4">
                    TIN TỨC
                </h4>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 px-4 lg:px-30">
                        {/* Bài viết lớn bên trái */}
                        <div className="lg:col-span-2 bg-white overflow-hidden">
                          {newsItems.filter(item => item.large).map(item => (
                            <div key={item.id}>
                              <img src={item.image} alt={item.title} className="w-full h-90 object-cover" />
                              <h4 className="text-base font-semibold mb-2 mt-2">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.desc}</p>
                              <span className="flex items-center gap-1">
                                <MdDateRange className="text-gray-500" /> {item.date}
                              </span>
                              {/* Chỉ 1 nút duy nhất mỗi item */}
                              <Link
                                to={`/detail-article/${item.id}`}
                                className="text-base font-medium !text-gray-500 !no-underline"
                              >
                                Xem chi tiết
                              </Link>
                            </div>
                          ))}
                        </div>
                
                        {/* 4 ảnh nhỏ chia 2 hàng 2 cột */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-3">
                          {newsItems
                            .filter((item) => !item.large)
                            .slice(0, 4)
                            .map((item) => (
                              <div
                                key={item.id}
                                className="bg-white overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105"
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="py-2 min-h-[60px] flex flex-col justify-between">
                                  <h6 className="text-xs leading-tight line-clamp-2">
                                    {item.title}
                                  </h6>
                                  <span className="flex items-center gap-1">
                                    <MdDateRange className="text-gray-500" /> {item.date}
                                  </span>
                                  <Link
                                    to={`/detail-article/${item.id}`}
                                    className="text-base font-medium !text-gray-600 !no-underline"
                                  >
                                    Xem chi tiết
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                        <Link
                            to="/article"
                            className="!no-underline text-blue px-4 py-2 rounded-lg transition flex justify-center items-center"
                        >
                            <button className='bg-blue-900 rounded px-8 py-2 text-white'>Xem tất cả</button>
                        </Link>
            </div>
        </div>
    );
};

export default NewsPage;
