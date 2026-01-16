import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // <--- IMPORTANT: IMPORT CSS HERE

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageTest from './pages/ImageTest';
import ImageResult from './pages/ImageResult.jsx';
import SymptomTest from './pages/SymptomTest';
import SymptomResult from './pages/SymptomResult.jsx';
import CombinedTest from './pages/CombinedTest';
import CombinedResult from './pages/CombinedResult.jsx';
import AboutPCOS  from './pages/AboutPCOS.jsx';
import DietExercise from './pages/DietExercise.jsx';
import Awareness from './pages/Awareness.jsx';
import Contact from './pages/Contact.jsx';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check/image" element={<ImageTest />} />
            <Route path="/check/symptom" element={<SymptomTest />} />
            <Route path="/check/combined" element={<CombinedTest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutPCOS />} />
            <Route path="/result/image" element={<ImageResult />} />
            <Route path="/result/symptom" element={<SymptomResult />} />
            <Route path="/result/combined" element={<CombinedResult />} />
            <Route path="/diet" element={<DietExercise />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/contact" element={<Contact />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;