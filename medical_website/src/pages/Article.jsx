import React, { useState, useEffect } from "react";
import { MdDateRange } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";

const images = [
  "https://soyte.hanoi.gov.vn/documents/5065338/8638102/BVDG.jpg/8fe1d42e-8f13-4806-a477-9439d3fc063e?t=1739526226709",
  "https://topdanangaz.com/wp-content/uploads/2024/04/benh-vien-da-khoa-da-nang_4.jpg",
  "https://baodanang.vn/dataimages/201712/original/images1414730_a1.jpg",
  "https://thangloidanang.com.vn/uploads/images/chia-se-yeu-thuong-tai-benh-vien-da-khoa-da-nang3.jpg",
  "https://lh6.googleusercontent.com/proxy/bRAvt_-OikpsnyReN_TtNeE-8jzAKGFxPUI4kHBYx293rUGgxtBAflMwq5lkTyefwAhPZuL_7BcbJCU6SFuz2onwl_PVKBnUF1OQAJzUBvX01XRzg84ZGrGOMwY6HuK1SwEnwG9ZQdQhtspzgjY93Zw",
];
const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // TODO: Khi có backend, mở comment dòng fetch này
    // fetch("http://localhost:8080/api/articles")
    //   .then(response => response.json())
    //   .then(data => setArticles(data))
    //   .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));

    // Dữ liệu giả lập trước khi có backend
    setArticles(Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Bài viết số ${i + 1}`,
      excerpt: "Mô tả ngắn về bài viết này...",
      image: images[i % images.length],  // Lấy ảnh theo vòng lặp
      date: "10/04/2025",
    })));
  }, []);

  return (
    <div>
      {articles.length > 0 && (
        <div className="bg-red-600 text-white py-2 px-4 text-sm font-semibold overflow-hidden mt-20">
          <marquee behavior="scroll" direction="left">🔥 Tin nóng: {articles[0].title} - {articles[0].date} - {articles[0].excerpt} 🔥</marquee>
        </div>
      )}
      <Header />
      <div className="container mx-auto p-6 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.length > 0 && (
            <div className="md:col-span-2 bg-white shadow-md rounded-lg overflow-hidden relative w-full h-[400px]">
            <a href="#" className="block relative w-full h-full">
              {/* Ảnh luôn vừa khít khung */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
          
              {/* Chữ trên ảnh */}
              <div className="absolute top-4 left-4 text-white drop-shadow-lg">
                <h2 className="text-xl font-bold">{articles[0].title}</h2>
                <div className="flex items-center text-sm">
                  <MdDateRange className="mr-1" /> <span>{articles[0].date}</span>
                </div>
                <p className="text-sm">{articles[0].excerpt}</p>
              </div>
            </a>
          </div>

          )}

          <div className="md:col-span-1 grid grid-cols-1 gap-4">
            {articles.slice(1, 5).map((article) => (
              <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden flex">
                <img src={article.image} alt={article.title} className="w-1/3 object-cover" />
                <div className="p-2 flex-1">
                  <h3 className="text-sm font-semibold">{article.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center">
                    <MdDateRange className="mr-1" /> {article.date}
                  </p>
                  <a href="#" className="text-blue-500 text-xs">Start reading →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;
