import React from 'react'
import { Navbar } from 'react-bootstrap'
import AwardSlider from '../components/AwardSlider'
import Header from '../components/Header'
import HospitalSlider from '../components/HospitalSlider'
import Navbar2 from '../components/Navbar2'
import ServiceList from '../components/ServiceList'
import Specialized from '../components/Specialized'
import WhyChooseUs from '../components/WhyChooseUs'
import MediaShowcase from '../components/MediaShowcase'
import NewsPage from '../components/NewPage'
import Footer from '../components/Footer'
import ChatbotBubble from '../components/chatbot/ChatbotBubble'
import TopDoctor from '../components/TopDoctor'
import Banner from '../components/Banner'
import Newpage2 from '../components/NewPage2'

const Home = () => {
  return (
    <div>
      <Header/>
      <Navbar2/>
      <ServiceList/>
      <WhyChooseUs/>
      <AwardSlider/>
      <HospitalSlider/>
      <TopDoctor/>
      <Banner/>
      <Specialized/>
      <MediaShowcase/>
      
      <NewsPage/>
     
      <Footer/>
      <ChatbotBubble/>
    </div>
  )
}

export default Home
