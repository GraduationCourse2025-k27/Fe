import React, { Suspense } from "react";
import AwardSlider from "../components/AwardSlider";
import HospitalSlider from "../components/HospitalSlider";
import Navbar2 from "../components/Navbar2";
import ServiceList from "../components/ServiceList";
import Specialized from "../components/Specialized";
import WhyChooseUs from "../components/WhyChooseUs";
import MediaShowcase from "../components/MediaShowcase";
import NewsPage from "../components/NewPage";
import ChatbotBubble from "../components/chatbot/ChatbotBubble";
import TopDoctor from "../components/TopDoctor";
import { lazy } from "react";
import LazyLoad from "../components/Lazyload";

const Banner = lazy(() => import("../components/Banner"));

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <Navbar2 />
      <div className="w-full px-2 sm:px-10">
        <ServiceList />
        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <WhyChooseUs />
          </LazyLoad>
        </Suspense>

        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <AwardSlider />
          </LazyLoad>
        </Suspense>

        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <HospitalSlider />
          </LazyLoad>
        </Suspense>

        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <TopDoctor />
          </LazyLoad>
        </Suspense>

        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <Banner />
          </LazyLoad>
        </Suspense>

        <Specialized />

        <Suspense fallback={<div className="text-center">Đang tải...</div>}>
          <LazyLoad>
            <MediaShowcase />
          </LazyLoad>
        </Suspense>

        <NewsPage />
      </div>
      <ChatbotBubble />
    </div>
  );
};

export default Home;