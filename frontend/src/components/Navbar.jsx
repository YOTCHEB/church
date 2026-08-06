import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaHandsHelping, FaHeart, FaPhone, FaPlay } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/videos', label: 'Videos', icon: <FaPlay /> },
    { path: '/programs', label: 'Programs', icon: <FaHandsHelping /> },
    { path: '/donate', label: 'Donate', icon: <FaHeart /> },
    { path: '/contact', label: 'Contact', icon: <FaPhone /> }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Jehovah Jireh" className="logo-image" />
          <div className="logo-text">
            <span className="logo-title">Jehovah Jireh</span>
            <span className="logo-subtitle">MINISTRY</span>
          </div>
        </Link>

        <div className={`nav-links ${isMobileOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="mobile-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
