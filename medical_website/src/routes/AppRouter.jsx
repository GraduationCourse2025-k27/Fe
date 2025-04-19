import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MyProfile from "../pages/MyProfile";
import MyAppointment from "../pages/MyAppointment";
import Service from "../pages/Service";
import Article from "../pages/Article";
import Doctors from "../pages/Doctors";
import Appointment from "../pages/Appointment";
import Confirmation from "../pages/Confirmation";
import Specialty from "../pages/service/Specialty";
import General from "../pages/service/General";
import CancerScreening from "../pages/service/CancerScreening";
import Test from "../pages/service/Test";
import Surgery from "../pages/service/Surgery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ultrasound from "../pages/service/Ultrasound";

const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/service" element={<Service />} />
          <Route path="/article/all" element={<Article />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/kham-chuyen-khoa" element={<Specialty />} />
          <Route path="/kham-tong-quat" element={<General />} />
          <Route path="/tam-soat-ung-thu" element={<CancerScreening />} />
          <Route path="/xet-nghiem" element={<Test />} />
          <Route path="/phau-thuat" element={<Surgery />} />
          <Route path="/sieu-am" element={<Ultrasound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppRouter;
