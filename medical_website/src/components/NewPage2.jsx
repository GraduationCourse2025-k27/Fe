import React from 'react';

const newsItems = [
  {
    id: 1,
    title: 'Shutdown Week tại Absolute Software (Việt Nam): Khi dân IT được “chữa lành” đúng nghĩa!',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=400&fm=webp',
    desc: 'Trong tháng 3/2025, Absolute Software (Việt Nam) được vinh dự nhận giải thưởng Top Công ty IT Tốt Nhất Việt Nam năm 2025...',
    large: true,
  },
  {
    id: 2,
    title: 'Rakuten Vietnam: Những giá trị tạo nên môi trường làm việc...',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=500&h=270&fm=webp',
  },
  {
    id: 3,
    title: 'Top 30 Công ty IT tốt nhất Việt Nam 2025 lộ diện',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=500&h=270&fm=webp',
  },
  {
    id: 4,
    title: 'Vietnam\'s Top 30 Best IT Companies 2025 Revealed',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=500&h=270&fm=webp',
  },
  {
    id: 5,
    title: 'Code and Run: Giải chạy bộ trực tuyến dành cho cộng đồng IT',
    image: 'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=500&h=270&fm=webp',
  },
];

const Newpage2 = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Bài viết lớn bên trái */}
      <div className="lg:col-span-2 shadow bg-white  overflow-hidden">
        {newsItems.filter(item => item.large).map(item => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} className="w-full h-82 object-cover" />
            <div className="p-3">
              <h2 className="text-base font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.desc}</p>
              <a href="#" className="text-indigo-600 text-sm hover:underline">Start reading &rarr;</a>
            </div>
          </div>
        ))}
      </div>

      {/* 4 ảnh nhỏ chia 2 hàng 2 cột */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
  {newsItems.filter(item => !item.large).slice(0, 4).map(item => (
    <div
      key={item.id}
      className="bg-white shadow overflow-hidden flex flex-col"
    >
      <img src={item.image} alt={item.title} className="w-full h-32 object-cover" />
      <div className="p-2 min-h-[60px] flex flex-col justify-between">
        <h3 className="text-sm leading-tight line-clamp-2">
          {item.title}
        </h3>
        <a href="#" className="text-indigo-600 text-[11px] hover:underline mt-1">
          Start reading &rarr;
        </a>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default Newpage2;
