// import { useState } from 'react';
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';
import Pdf from '../components/Pdf';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pdf' element={<Pdf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
