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
import Appointment from './pages/Appointment';
function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/article/all' element={<Article/>}/>
          <Route path='/article/' element={<Article/>}/>
          <Route path='/my-appointment' element={<MyAppointment/>}/>
          <Route path='/appointment/:docId' element={<Appointment/>}/>
          {/* <Route path='/chatbotpage' element={<ChatbotPage/>}/> */}
        </Routes>

      </div>
    </>
  );
}

export default App;
