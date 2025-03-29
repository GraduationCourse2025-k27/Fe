import React from 'react';
import { Link } from 'react-router-dom';

const newsArticles = [
    {
        id: 1,
        title: 'Bệnh viện Đa khoa Đà Nẵng nâng cao chất lượng khám chữa bệnh',
        date: '25/03/2025, 08:45',
        author: 'Minh An',
        description: 'Bệnh viện Đa khoa Đà Nẵng đầu tư cơ sở vật chất và nâng cao trình độ y tế nhằm đáp ứng nhu cầu khám chữa bệnh của người dân khu vực miền Trung.',
        image: 'https://www.rolatex.net/filemanager/media/ki-thuat-vien-hinh-anh.jpg',
    },
    {
        id: 2,
        title: 'Cải thiện chất lượng dịch vụ tại Bệnh viện Đa khoa Đà Nẵng',
        date: '22/03/2025, 09:20',
        author: 'Thanh Hà',
        description: 'Bệnh viện Đa khoa Đà Nẵng đã triển khai nhiều dịch vụ mới nhằm đáp ứng nhu cầu khám chữa bệnh ngày càng cao của người dân.',
        image: 'https://i.ex-cdn.com/taichinhdoanhnghiep.net.vn/files/mainguyen/2021/11/25/kham-benh-1558.jpg',
    },
    {
        id: 3,
        title: 'Bệnh viện Đa khoa Đà Nẵng tiên phong chuyển đổi số trong quản lý y tế',
        date: '18/03/2025, 11:15',
        author: 'Hoài Nam',
        description: 'Việc ứng dụng chuyển đổi số giúp Bệnh viện Đa khoa Đà Nẵng tối ưu hóa quy trình quản lý, nâng cao trải nghiệm bệnh nhân và tăng cường hiệu quả khám chữa bệnh.',
        image: 'https://ksbtdanang.vn/uploads/news/2022_03/chuyen-doi-so-1.png',
    },
    
];

const NewsPage = () => {
    return (
        <div className="p-2">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
                    Tin tức
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsArticles.map((article) => (
                        <Link
                            key={article.id}
                            to={`/artical/${article.id}`}
                            className="bg-white p-3 rounded-lg shadow-md !no-underline"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-36 object-cover rounded-md"
                            />
                            <h4 className="mt-2 text-black font-semibold ">{article.title}</h4>
                            <p className="text-xs text-gray-500 ">{article.date} - {article.author}</p>
                            <p className="mt-1 text-sm text-gray-700 ">{article.description}</p>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <Link
                        to="/artical/all"
                        className=" !no-underline text-blue px-4 py-2 rounded-lg transition"
                    >
                        Xem tất cả
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
