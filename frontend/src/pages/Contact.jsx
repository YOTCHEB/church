import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaPaperPlane, FaHeart, FaWhatsapp, FaCheckCircle } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Us',
      details: ['Dzaleka Refugee Camp', 'Malawi'],
      color: '#c9a227'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      details: ['+265 993 506 106', 'Mon-Fri: 9am-5pm'],
      color: '#38a169'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      details: ['info@jehovahjirehministry.org', 'Support available 24/7'],
      color: '#1a365d'
    },
    {
      icon: <FaClock />,
      title: 'Office Hours',
      details: ['Mon-Fri: 8am-5pm', 'Sat: 9am-1pm', 'Sun: Closed'],
      color: '#ed8936'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="contact-hero-content">
          <span className="hero-badge">
            <FaHeart /> Get In Touch
          </span>
          <h1>Contact Us</h1>
          <p className="hero-description">
            Have questions about our ministry? Want to partner with us? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-info-section">
        <div className="container">
          <div className="contact-cards-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="info-card-icon" style={{ background: `linear-gradient(135deg, ${info.color}, ${info.color}dd)` }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i}>{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section contact-form-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Side */}
            <div className="contact-info-side">
              <h2>Let's Start a Conversation</h2>
              <p className="contact-intro">
                Whether you have questions about our programs, want to partner with us, 
                or simply want to learn more, we're here to help.
              </p>

              <div className="quick-contact">
                <h3>Quick Contact</h3>
                <a href="https://wa.me/265993506106" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
              </div>

              <div className="social-connect">
                <h3>Follow Us on Social Media</h3>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-link twitter">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-link instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>

              <div className="map-container">
                <div className="map-placeholder">
                  <FaMapMarkerAlt className="map-icon" />
                  <h4>Dzaleka Refugee Camp</h4>
                  <p>Malawi</p>
                  <span className="map-note">Visit us to see our work firsthand</span>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon-wrapper">
                    <FaCheckCircle />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting us. We've received your message and will get back to you within 24-48 hours.</p>
                  <button 
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="your@email.com"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+265 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Subject *</label>
                    <select 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Donations">Donations</option>
                      <option value="Volunteering">Volunteering</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message *</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="6" 
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                  </button>

                  <p className="form-note">
                    We typically respond within 24-48 hours. For urgent matters, 
                    please call us directly or message on WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Quick answers to common questions about our ministry
            </p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How can I donate?</h4>
              <p>You can donate financially through our website, via WhatsApp, or by contacting us directly. We also accept material donations like clothing, food, and school supplies.</p>
            </div>
            <div className="faq-item">
              <h4>Can I volunteer?</h4>
              <p>Yes! We welcome volunteers. Contact us to discuss your skills and availability. We have opportunities for both local and international volunteers.</p>
            </div>
            <div className="faq-item">
              <h4>How do you use donations?</h4>
              <p>100% of your donations go directly to supporting our programs including housing, food distribution, education, and healthcare for widows and orphans.</p>
            </div>
            <div className="faq-item">
              <h4>Can I visit the ministry?</h4>
              <p>Yes! We welcome visitors. Please contact us in advance to schedule a visit and learn more about our work in Dzaleka Refugee Camp.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
