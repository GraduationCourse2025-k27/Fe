import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import { useState } from "react";

const images = [
    "https://ttythaichau.danang.vn/wp-content/uploads/2020/03/ANH-BENH-VIEN-GD2-Copy-2-1024x665.jpg",
    "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/486460193_1175992537654037_3312515513579178960_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Ujlmzt-pwz8Q7kNvgH3OYKV&_nc_oc=Adkj5F1SdAHcbUQeX_jLc98ewBhQ7xa-kcLP4kIFNIgODfpkJ8mez4kdvBBiAQ7LOsE7IIZ1ieq9AvFIvHftYtMm&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=kdFV9Evkl1zNsbVLpFcQ1A&oh=00_AYESF5r0XdkBvuOeUBKvzkm3ba7KkP3anx1jxZOqxFoOhQ&oe=67EC3859",
    "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/483925946_1166892491897375_8472355823271560671_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=lYh1fsCHMkwQ7kNvgHeJe7f&_nc_oc=AdkLNmNLuMSBxoEdqbbxrw1USaBpB6BtFg6OPAir4UeR9RWHeSEf1xljKioUlyvtIPvVPGKcbTZeZllGEhq1J3rW&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=QbGbgUMqjbo8W1UI0xrItw&oh=00_AYH8EwhozjBzRWrUvoQhC8PiLley4DpTkH2cfiUtS_BWig&oe=67EC255F",
    "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/486518330_1175870287666262_6598717465171315738_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=z5yoG767desQ7kNvgGCAjXZ&_nc_oc=AdmEQM6bHIJ2ZglrLH4iZQBaAXdy4M4a5xZovR-XMLr0-57RgoSwUey_j-M3k49t8NkAI7omTtHk1isjMJwH0k0f&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=i0SGONy1E2__jAoRRdtGOw&oh=00_AYENPtJ3jI0iPPzBT32qR27lNO7I3u1xMvGsLmNYoa-6zw&oe=67EC1899",
    "https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/484013812_1166892298564061_3119366492996022398_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=22ErSH00-QIQ7kNvgFKTnov&_nc_oc=AdlZMTs8_tvDVnloVuam5FxrNpTvK5QsN0Uplbi-w3s_jJ1aWksVILvN6SsT74BAiBnp_37gzM85wd_Ha5wvwx2I&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=QpKSSw1M54rLpyNifQET5w&oh=00_AYHAbKMMJzVkAwdEdamGtIL4rC_p0bya12kTAgl7SBgUjQ&oe=67EC26E5",
];

const HospitalSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="pt-5 px-2 md:px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                {/* Bên trái */}
                <div className="w-full md:w-2/3">
                    <Swiper
                        spaceBetween={10}
                        navigation
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[Navigation, Thumbs, Autoplay]}
                        className="rounded-lg"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={image}
                                    alt={`Main Slide ${index + 1}`}
                                    className="w-full h-[300px] md:h-[400px] object-cover rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Bên phải */}
                <div className="w-full md:w-1/3">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-2">
                        Hệ thống phòng khám và trung tâm của chúng tôi
                    </h2>
                    <p className="text-gray-700 mb-2 md:mb-2 text-sm md:text-base">
                        Bệnh viện Đa khoa Đà Nẵng là cơ sở y tế hàng đầu tại miền Trung, với trang thiết bị hiện đại và đội ngũ y bác sĩ giàu kinh nghiệm. Bệnh viện cung cấp dịch vụ chăm sóc sức khỏe toàn diện, luôn nỗ lực nâng cao chất lượng để đáp ứng nhu cầu khám chữa bệnh của người dân.
                    </p>

                    {/* Slider nhỏ */}
                    <div className="hidden md:block">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={3}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            modules={[Thumbs, Autoplay]}
                            className="rounded-lg"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-20 md:h-24 object-cover rounded-md cursor-pointer"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalSlider;
