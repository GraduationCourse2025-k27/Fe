import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import AppRouter from './routes/AppRouter';




function App() {
  return (
    <>
      <div className="mx-4 sm:mx-[10%]">
        <AppRouter/>
      </div>
    </>
  );
}

export default App;
