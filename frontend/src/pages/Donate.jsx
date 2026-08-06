import { useState } from 'react';
import { FaHeart, FaWhatsapp, FaCreditCard, FaHandHoldingHeart, FaEnvelope, FaPhone, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { donationsService } from '../supabaseService';
import './Donate.css';

const Donate = () => {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    donor_phone: '',
    amount: '',
    donation_type: 'Financial',
    message: '',
    is_anonymous: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await donationsService.addDonation(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const donationOptions = [
    {
      type: 'Financial',
      icon: <FaCreditCard />,
      title: 'Financial Support',
      description: 'Monetary donations help us provide essential services and respond to urgent needs in the community.',
      color: '#c9a227'
    },
    {
      type: 'Material',
      icon: <FaHandHoldingHeart />,
      title: 'Material Donations',
      description: 'Clothing, food, school supplies, and essential items make a direct impact on families we serve.',
      color: '#38a169'
    },
    {
      type: 'Volunteer',
      icon: <FaHeart />,
      title: 'Volunteer Your Time',
      description: 'Share your skills, passion, and time by volunteering with our ministry programs and activities.',
      color: '#e53e3e'
    }
  ];

  return (
    <div className="donate-page">
      {/* Hero Section */}
      <section className="donate-hero">
        <div className="hero-overlay"></div>
        <div className="donate-hero-content">
          <span className="hero-badge">
            <FaHeart /> Give Today
          </span>
          <h1>Make a Difference</h1>
          <p className="hero-scripture">"God loves a cheerful giver" - 2 Corinthians 9:7</p>
          <p className="hero-description">
            Your generosity brings hope, dignity, and transformation to widows and orphans in Dzaleka Refugee Camp
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="section donation-options">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ways to Give</h2>
            <p className="section-subtitle">
              Choose how you'd like to support our ministry and make an impact
            </p>
          </div>
          <div className="options-grid">
            {donationOptions.map((option, index) => (
              <div 
                key={option.type} 
                className={`option-card ${formData.donation_type === option.type ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, donation_type: option.type }))}
              >
                <div className="option-icon" style={{ background: `linear-gradient(135deg, ${option.color}, ${option.color}dd)` }}>
                  {option.icon}
                </div>
                <h3>{option.title}</h3>
                <p>{option.description}</p>
                {formData.donation_type === option.type && (
                  <div className="selected-badge">
                    <FaCheckCircle /> Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="section donate-form-section">
        <div className="container">
          <div className="donate-grid">
            {/* Info Side */}
            <div className="donate-info">
              <h2>Partner With Us</h2>
              <p className="info-intro">
                Your support enables us to continue our mission of serving widows and orphans 
                with God's love. Every contribution, no matter the size, makes a meaningful difference.
              </p>
              
              <div className="impact-list">
                <div className="impact-item">
                  <FaCheckCircle className="impact-icon" />
                  <div>
                    <h4>Transparent Giving</h4>
                    <p>100% of your donation goes directly to supporting our programs</p>
                  </div>
                </div>
                <div className="impact-item">
                  <FaCheckCircle className="impact-icon" />
                  <div>
                    <h4>Immediate Impact</h4>
                    <p>Your gifts provide food, shelter, education, and hope to those in need</p>
                  </div>
                </div>
                <div className="impact-item">
                  <FaCheckCircle className="impact-icon" />
                  <div>
                    <h4>Ongoing Support</h4>
                    <p>Join a community of givers committed to long-term transformation</p>
                  </div>
                </div>
              </div>

              <div className="contact-donate">
                <h3>Have Questions?</h3>
                <div className="contact-methods">
                  <a href="tel:+265993506106" className="contact-method">
                    <FaPhone />
                    <span>+265 993 506 106</span>
                  </a>
                  <a href="mailto:info@jehovahjirehministry.org" className="contact-method">
                    <FaEnvelope />
                    <span>info@jehovahjirehministry.org</span>
                  </a>
                </div>
              </div>

              <a href="https://wa.me/265993506106" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <FaWhatsapp /> Donate via WhatsApp
              </a>
            </div>

            {/* Form Side */}
            <div className="donate-form-card">
              <h2>Complete Your Gift</h2>
              
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon-wrapper">
                    <FaCheckCircle />
                  </div>
                  <h3>Thank You for Your Generosity!</h3>
                  <p>Your donation has been submitted successfully.</p>
                  <p className="blessing">May God bless you abundantly for your kindness!</p>
                  <button 
                    className="btn btn-outline-dark"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        donor_name: '',
                        donor_email: '',
                        donor_phone: '',
                        amount: '',
                        donation_type: 'Financial',
                        message: '',
                        is_anonymous: false
                      });
                    }}
                  >
                    Make Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Donation Type</label>
                    <div className="type-selector">
                      {['Financial', 'Material', 'Volunteer'].map(type => (
                        <button
                          key={type}
                          type="button"
                          className={`type-btn ${formData.donation_type === type ? 'active' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, donation_type: type }))}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      name="donor_name" 
                      value={formData.donor_name} 
                      onChange={handleChange} 
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email</label>
                      <input 
                        type="email" 
                        name="donor_email" 
                        value={formData.donor_email} 
                        onChange={handleChange} 
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input 
                        type="tel" 
                        name="donor_phone" 
                        value={formData.donor_phone} 
                        onChange={handleChange} 
                        placeholder="+265 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  {formData.donation_type === 'Financial' && (
                    <div className="form-group">
                      <label>Amount (MWK)</label>
                      <input 
                        type="number" 
                        name="amount" 
                        value={formData.amount} 
                        onChange={handleChange} 
                        min="0" 
                        placeholder="Enter amount"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Message (Optional)</label>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      rows="4"
                      placeholder="Share your thoughts or prayer requests..."
                    ></textarea>
                  </div>

                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="is_anonymous" 
                      checked={formData.is_anonymous} 
                      onChange={handleChange} 
                    />
                    <span>Make my donation anonymous</span>
                  </label>

                  <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : <><FaHeart /> Submit Donation</>}
                  </button>

                  <p className="form-note">
                    By submitting, you agree to our terms and privacy policy. 
                    You will receive a confirmation email if provided.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="scripture-banner donate-scripture">
        <div className="container">
          <blockquote>
            "Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver."
          </blockquote>
          <cite>- 2 Corinthians 9:7 (NIV)</cite>
        </div>
      </section>
    </div>
  );
};

export default Donate;
