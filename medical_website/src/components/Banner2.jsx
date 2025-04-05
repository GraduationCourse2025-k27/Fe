import React from 'react'
import { useNavigate } from 'react-router-dom'


const Banner2 = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-blue-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-5 md:mx-10'>
            {/* trai */}
            <div className='flew-1 py-8 sm:py-10 md:py-14 lg:py-20 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p> Đặt lịch khám ngay</p>
                    <p className='mt-4'> Với 100+ Bác sĩ đáng tin cậy</p>
                </div>

            </div>
            {/* phai */}
            <div className="flex justify-center items-center">
                <img
                    className="w-full max-w-md h-59 sm:h-96 md:h-auto pl-6 p-2"
                    src="https://edoctor.io/assets/bac-si/head_bg.png"
                    alt="Doctor banner"
                />
            </div>



        </div>
    )
}

export default Banner2
