import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FundDetails from './pages/FundDetails';
import SavedFunds from './pages/SavedFunds';
import Footer from './components/Footer';
import GoogleSuccess from './pages/GoogleSuccess';
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar stays at the top */}
        <Navbar />

        {/* Main content with flex-grow to push footer down */}
        <div className="container flex-grow-1 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fund/:code" element={<FundDetails />} />
            <Route path="/saved" element={<SavedFunds />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/google-success" element={<GoogleSuccess />} />

          </Routes>
        </div>

        {/* Footer sticks to the bottom if content is short */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
