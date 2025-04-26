import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";

import bannerImage from '../assets/Infographic.jpg';
import { Link } from 'react-router-dom';


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
  {
    id: 6,
    title: 'Tăng "sức đề kháng", bảo vệ túi tiền và sức khỏe trước quảng cáo từ người nổi tiếng',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/zoom/260_156/324455921873985536/2025/4/18/kham-suc-khoe-lai-xe-1744950288614973871854-7-0-507-800-crop-17449502967261283918675.jpg',
    desc: 'SKĐS - Sở Y tế Hà Nội công bố danh sách 65 cơ sở khám, chữa bệnh liên thông thành công dữ liệu giấy khám sức khỏe lái xe lên Cổng Thông tin giám định BHYT để thực hiện dịch vụ công trực tuyến.',
    date: "10/04/2025",
  },
  {
    id: 7,
    title: 'Thêm một bệnh viện tạm dừng tư vấn sữa của công ty trong đường dây sản xuất sữa giả',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2025/4/18/ha-thanh-1-1744943646368487635377.jpeg',
    desc: 'Tại hội nghị, PGS.TS Nguyễn Hà Thanh, Viện trưởng Viện Huyết học – Truyền máu Trung ương cho biết: Sau nhiều thập kỷ hình thành và phát triển, đến nay, công tác truyền máu.',
    date: "10/04/2025",
  },
  {
    id: 8,
    title: 'Danh sách 65 cơ sở đủ điều kiện cấp giấy khám sức khỏe lái xe liên thông ở Hà Nội',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/12/edit-f4786938d9c76c9ac1ca8c94101fe072-17444214700331656693173.jpeg',
    desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
    date: "10/04/2025",
  },
  {
    id: 9,
    title: 'Cẩn trọng với bột ngọt không rõ xuất xứ, chỉ ghi ‘đóng gói tại Việt Nam’',
    image: 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/12/edit-f4786938d9c76c9ac1ca8c94101fe072-17444214700331656693173.jpeg',
    desc: 'SKĐS - Đó là nhận định của Giám đốc Bệnh viện Đa khoa (BVĐK) Ninh Thuận Lê Huy Thạch tại hội thảo khoa học "Cập nhật các phương pháp điều trị thay thế thận ở bệnh nhân bệnh thận mạn giai đoạn cuối" vừa được bệnh viện tổ chức.',
    date: "10/04/2025",
  },
];
const Article = () => {
  const [showAll, setShowAll] = useState(false);  // State để quản lý việc hiển thị tất cả các tin

  // Hàm toggle để hiển thị thêm tin tức
  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      {newsItems .length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4 text-sm font-semibold overflow-hidden mt-20">
          <marquee behavior="scroll" direction="left">🔥 Tin nóng: {newsItems [0].title} - {newsItems [0].date} - {newsItems [0].excerpt} 🔥</marquee>
        </div>
      )}
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

      {/* Đề xuất bài viết nổi bật khác */}
      <div className="mt-10 px-4 max-w-screen-xl mx-auto">
        <hr className="h-0.5 w-full from-black via-gray-800 to-black opacity-50 shadow-xl mb-6"></hr>
        <h4 className="text-xl font-bold mb-4 text-red-600"> Bài viết nổi bật</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(1, 7).map((article) => (
            <div
              key={article.id}
              className="bg-white overflow-hidden shadow hover:shadow-md transition-all duration-300"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-2">
                <h4 className="text-base font-semibold text-gray-800 line-clamp-2">{article.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.desc}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MdDateRange className="text-gray-500" /> {article.date}
                  </span>
                  <Link
                    to={`/detail-article/${article.id}`}
                    className="text-base font-medium !text-gray-600 !no-underline"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full bg-blue-900 text-white p-4 rounded-lg shadow-md overflow-hidden mt-10">
      {/* Banner */}
      <div className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: 'url("https://img4.thuthuatphanmem.vn/uploads/2020/07/05/anh-background-y-te_034616052.jpg")' }}></div>

      <div className="relative z-10 text-center py-12">
        <div className="text-3xl font-bold animate-bounce">
          <span> Chú ý! Tin tức y tế mới nhất đang được cập nhật. Xem ngay để không bỏ lỡ! </span>
        </div>
      </div>

      {/* Định nghĩa CSS cho hiệu ứng bounce */}
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }

        .animate-shake {
          animation: shake 0.8s ease infinite;
        }
      `}</style>
    </div>
      <div className="mt-12 px-4 max-w-screen-xl mx-auto">
        <h4 className="text-xl font-bold ml-8 mb-1 text-blue-700">Tin tức gần đây</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Cột trái - Video nổi bật lớn hơn */}
          <div className="md:col-span-2 rounded-lg">
            {[ 
              {
                title: "Bản Tin Y Tế 16/4: Nữ sinh lớp 9 uống thuốc diệt chuột, cảnh báo' | VTV24",
                videoUrl: "https://www.youtube.com/embed/_tTpYfTLCmI"
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-2 mb-6">
                <iframe
                  className="w-full aspect-[5/3] rounded"
                  src={item.videoUrl}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="text-sm mt-2 font-semibold text-gray-700 text-center">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Cột phải - Danh sách video khác và kênh hot */}
          <div className="grid grid-cols-1 gap-6 mt-2">
            <div className="space-y-4">
              {[ 
                {
                  title: "Cách phòng ngừa đột quỵ đúng cách",
                  videoUrl: "https://www.youtube.com/embed/95drwCy_eRE"
                },
                {
                  title: "Lợi ích của khám sức khỏe định kỳ",
                  videoUrl: "https://www.youtube.com/embed/95drwCy_eRE"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg mb-6 max-w-4xl mx-auto">
                  <iframe
                    className="w-full aspect-[17/9] rounded"
                    src={item.videoUrl}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <p className="text-sm mt-2 font-semibold text-gray-700 text-center">{item.title}</p>
                </div>
              ))}
            </div>
         </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex gap-4 p-4">
          <div className="flex flex-col lg:flex-row gap-4 w-full">
            {/* Cột bên trái chứa tin tức */}
            <div className="flex-1 lg:w-2/3">
              {newsItems.slice(0, showAll ? newsItems.length : 4).map((item) => (
                <Link
                  to={`/detail-article/${item.id}`}
                  key={item.id}
                  className="block hover:shadow-lg"
                  style={{ color: '#1f2937', textDecoration: 'none' }}
                >
                  <div className="flex flex-col sm:flex-row w-full  p-2 mb-3">
                  <div className="flex flex-col sm:flex-row items-start w-full  p-2 mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full sm:w-60 h-36 object-cover"
                    />
                    <div className="sm:ml-4 flex-1 flex flex-col justify-start">
                      <h4 className="text-base font-semibold">{item.title}</h4>
                      <p className="text-sm mt-2 hidden sm:block overflow-hidden text-ellipsis line-clamp-2">{item.desc}</p>
                    </div>
                  </div>


                  </div>
                </Link>
              ))}

              {!showAll && newsItems.length > 4 && (
                <button
                  onClick={handleShowMore}
                  className="mt-2 text-gray-600 hover:underline"
                >
                  Xem thêm...
                </button>
              )}
            </div>

            {/* Cột bên phải chứa banner */}
            <div className="w-full lg:w-80 flex flex-col gap-4 hidden lg:block">
              <img src={bannerImage} alt="Banner" className="w-full h-auto shadow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
