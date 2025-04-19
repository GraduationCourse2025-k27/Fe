import React, { Suspense } from "react";
import { Navbar } from "react-bootstrap";
import AwardSlider from "../components/AwardSlider";
import Header from "../components/Header";
import HospitalSlider from "../components/HospitalSlider";
import Navbar2 from "../components/Navbar2";
import ServiceList from "../components/ServiceList";
import Specialized from "../components/Specialized";
import WhyChooseUs from "../components/WhyChooseUs";
import MediaShowcase from "../components/MediaShowcase";
import NewsPage from "../components/NewPage";
import Footer from "../components/Footer";
import ChatbotBubble from "../components/chatbot/ChatbotBubble";
import TopDoctor from "../components/TopDoctor";
import Newpage2 from "../components/NewPage2";
import { lazy } from "react";
import LazyLoad from "../components/Lazyload";

const Banner = lazy(() => import("../components/Banner"));

const Home = () => {
  return (
    <div>
      <Navbar2 />
      <ServiceList />
      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          <WhyChooseUs />
        </LazyLoad>
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          <AwardSlider />
        </LazyLoad>
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          {" "}
          <HospitalSlider />
        </LazyLoad>
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          <TopDoctor />
        </LazyLoad>
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          {" "}
          <Banner />
        </LazyLoad>
      </Suspense>

      <Specialized />

      <Suspense fallback={<div>loading...</div>}>
        <LazyLoad>
          <MediaShowcase />
        </LazyLoad>
      </Suspense>

      <NewsPage />

      <ChatbotBubble />
    </div>
  );
};

export default Home;
