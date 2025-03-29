import react from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Service from './pages/Service';
import Article from './pages/Article';
import Doctors from './pages/Doctors';
import Apointment from './pages/Apointment';
import Header from './components/Header';
import Navbar2 from './components/Navbar2';
import Navbar  from './components/Navbar';
import ChatbotBubble from './components/chatbot/ChatbotBubble';
import ChatbotPage from './components/chatbot/ChatbotPage';
import ServiceList from './components/ServiceList';
import Specialized from './components/Specialized';
import Footer from './components/Footer';
import WhyChooseUs from './components/WhyChooseUs';
import AwardSlider from './components/AwardSlider';
import HospitalSlider from './components/HospitalSlider';
import MediaShowcase from './components/MediaShowcase';
import NewsPage from './components/NewPage';

 
function App() {
  return (
    <>
      <div class="mx-4 sm:mx-[10%]">
        
        <Header/>
        <Navbar2/>
        <ServiceList/>
        <WhyChooseUs/>
        <AwardSlider/>
        <HospitalSlider/>
        <Specialized/>
        <MediaShowcase/>
        <NewsPage/>
      
        
  

       
        {/* <Navbar/> */}
        <ChatbotBubble/>
        {/* <ChatbotPage/> */}

        <Footer/>
        
       
   
        
     
       
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/doctors/:speciality' element={<Doctors/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/article/all' element={<Article/>}/>
          <Route path='/my-appointment' element={<MyAppointment/>}/>
          <Route path='/appointment:docId' element={<Apointment/>}/>
          {/* <Route path='/chatbotpage' element={<ChatbotPage/>}/> */}
         
          
          
        </Routes>
      
      </div>
    </>
  );
}

export default App;
