import { FaFacebookF, FaTwitter, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-section about-section">
              <div className="footer-logo">
                <img src="/logo.png" alt="Jehovah Jireh Ministry" className="footer-logo-image" />
                <div className="footer-logo-text">
                  <span>Jehovah Jireh</span>
                  <small>MINISTRY</small>
                </div>
              </div>
              <p className="footer-description">
                "The LORD will provide" - Genesis 22:14
              </p>
              <p className="footer-tagline">
                Led by the Holy Spirit, serving widows and orphans with God's love in Dzaleka Refugee Camp.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook" className="social-link">
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="Twitter" className="social-link">
                  <FaTwitter />
                </a>
                <a href="#" aria-label="Instagram" className="social-link">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/"><span className="link-icon">›</span> Home</Link></li>
                <li><Link to="/about"><span className="link-icon">›</span> About Us</Link></li>
                <li><Link to="/videos"><span className="link-icon">›</span> Videos</Link></li>
                <li><Link to="/programs"><span className="link-icon">›</span> Programs</Link></li>
                <li><Link to="/donate"><span className="link-icon">›</span> Donate</Link></li>
                <li><Link to="/contact"><span className="link-icon">›</span> Contact</Link></li>
                <li><Link to="/admin" className="admin-link"><FaShieldAlt /> Admin</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div className="footer-section">
              <h4>Our Programs</h4>
              <ul className="footer-links">
                <li><Link to="/programs"><span className="link-icon">›</span> Housing Support</Link></li>
                <li><Link to="/programs"><span className="link-icon">›</span> Food Distribution</Link></li>
                <li><Link to="/programs"><span className="link-icon">›</span> Education Support</Link></li>
                <li><Link to="/programs"><span className="link-icon">›</span> Healthcare Ministry</Link></li>
                <li><Link to="/programs"><span className="link-icon">›</span> Spiritual Guidance</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section contact-section">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Dzaleka Refugee Camp, Malawi</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <a href="mailto:info@jehovahjirehministry.org">info@jehovahjirehministry.org</a>
                </li>
                <li>
                  <FaPhone className="contact-icon" />
                  <a href="tel:+265993506106">+265 993 506 106</a>
                </li>
                <li>
                  <FaClock className="contact-icon" />
                  <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} Jehovah Jireh Ministry. All rights reserved.
            </p>
            <p className="made-with">
              Made with <FaHeart className="heart" /> for God's glory
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
