import React from 'react';

const Banner2 = () => {
    return (
        <div className="grid bg-blue-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10 grid-cols-1 md:grid-cols-2 items-center">
            {/* Left Section */}
            <div className="py-8 sm:py-10 md:py-14 lg:py-20 lg:pl-5">
                <div className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-semibold text-white ">
                    <p>Đặt lịch khám ngay</p>
                    <p className="mt-3">Với 100+ Bác sĩ đáng tin cậy</p>
                </div>
            </div>
            {/* Right Section */}
            <div className="flex justify-center items-center">
                <img
                    className="w-70 py-2 md:w-100 lg:w-120 h-auto"
                    src="https://edoctor.io/assets/bac-si/head_bg.png"
                    alt="Doctor banner"
                />
            </div>
        </div>
    );
};

export default Banner2;
