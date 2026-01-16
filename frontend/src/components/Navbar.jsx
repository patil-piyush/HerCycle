import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaChevronDown, FaUser } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-link-active' : '';

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        <Link to="/" className="logo">
          <div className="logo-icon"><FaHeart /></div>
          <span>PCOS<span style={{ color: 'var(--primary)' }}>mart</span></span>
        </Link>

        <div className="nav-center">
          <div className="nav-links">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/about" className={isActive('/about')}>About PCOS</Link>
            
            {/* Enhanced Dropdown */}
            <div className="nav-item-dropdown">
              <button className="dropdown-btn">
                Check PCOS <FaChevronDown size={10} />
              </button>
              <div className="dropdown-menu">
                <Link to="/check/image" className="dropdown-item">
                  <span className="dropdown-title">Image Test</span>
                  <span className="dropdown-desc">AI-powered ultrasound analysis</span>
                </Link>
                <Link to="/check/symptom" className="dropdown-item">
                  <span className="dropdown-title">Symptom Test</span>
                  <span className="dropdown-desc">Symptom-based screening</span>
                </Link>
                <Link to="/check/combined" className="dropdown-item">
                  <span className="dropdown-title">Combined Test</span>
                  <span className="dropdown-desc">Most accurate results</span>
                </Link>
              </div>
            </div>
            
            <Link to="/diet" className={isActive('/diet')}>Diet & Exercise</Link>
            <Link to="/awareness" className={isActive('/awareness')}>Awareness</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/login" style={{ fontWeight: '600', color: '#4A5568' }}>Login</Link>
          <Link to="/register" className="btn-register-nav">
            <FaUser size={14} /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;