import { useState, useEffect } from 'react';
import { FaHeart, FaEye, FaBullseye, FaPrayingHands, FaUsers, FaBible, FaAward, FaGlobe } from 'react-icons/fa';
import { staffService } from '../supabaseService';
import './About.css';

const About = () => {
  const [staff, setStaff] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const unsub = staffService.subscribeToStaff(setStaff);
    return () => unsub();
  }, []);

  const values = [
    { icon: <FaHeart />, title: 'Love', description: 'Unconditional love to all, reflecting Christ\'s love for us' },
    { icon: <FaEye />, title: 'Compassion', description: 'Seeing and responding to needs with empathy' },
    { icon: <FaBible />, title: 'Faith', description: 'Trusting God\'s provision in all circumstances' },
    { icon: <FaUsers />, title: 'Community', description: 'Building strong, supportive communities' },
    { icon: <FaAward />, title: 'Excellence', description: 'Serving with integrity and excellence' },
    { icon: <FaGlobe />, title: 'Inclusivity', description: 'Welcoming all regardless of background' },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className={`about-hero-content ${isVisible ? 'visible' : ''}`}>
          <span className="hero-badge">
            <FaHeart /> About Us
          </span>
          <h1>Jehovah Jireh Ministry</h1>
          <p className="hero-scripture">"The LORD will provide" - Genesis 22:14</p>
          <p className="hero-description">
            Led by the Holy Spirit, serving widows and orphans with God's unconditional love
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section mission-vision">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <div className="mv-icon"><FaEye /></div>
              <h2>Our Vision</h2>
              <div className="mv-line"></div>
              <p>Restoring hope and dignity through God's provision. We envision a world where widows and orphans experience security, love, and opportunity to thrive.</p>
            </div>
            <div className="mv-card featured">
              <div className="mv-icon"><FaBullseye /></div>
              <h2>Our Mission</h2>
              <div className="mv-line"></div>
              <p>Showing God's love through practical care, compassion, and empowerment to widows and orphans in Dzaleka Refugee Camp and surrounding communities.</p>
            </div>
            <div className="mv-card">
              <div className="mv-icon"><FaPrayingHands /></div>
              <h2>Our Purpose</h2>
              <div className="mv-line"></div>
              <p>Serving God by caring for the vulnerable, providing essential support, spiritual guidance, and pathways to self-sufficiency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <div className="story-line"></div>
              <p>
                Jehovah Jireh Ministry was born out of a divine calling to serve the vulnerable 
                in Dzaleka Refugee Camp. Founded on the biblical principle of caring for widows 
                and orphans, our ministry has grown from a small initiative to a comprehensive 
                support system for hundreds of families.
              </p>
              <p>
                Guided by the Holy Spirit and driven by God's love, we provide housing support, 
                food distribution, education assistance, healthcare access, and spiritual guidance 
                to those who need it most.
              </p>
              <div className="story-stats">
                <div className="story-stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Lives Impacted</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Families Served</span>
                </div>
                <div className="story-stat">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Years of Service</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <FaHeart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Banner */}
      <section className="scripture-banner">
        <div className="container">
          <blockquote>
            "Religion that God our Father accepts as pure and faultless is this: 
            to look after orphans and widows in their distress and to keep oneself 
            from being polluted by the world."
          </blockquote>
          <cite>- James 1:27 (NIV)</cite>
        </div>
      </section>

      {/* Staff Section */}
      <section className="section staff-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Leadership Team</h2>
            <p className="section-subtitle">
              Dedicated servants committed to God's mission
            </p>
          </div>
          <div className="staff-grid">
            {staff.length > 0 ? (
              staff.map((member) => (
                <div key={member.id} className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src={member.image_url || 'img/photos/coordinator.png'} alt={member.name} />
                    <div className="staff-overlay"></div>
                  </div>
                  <div className="staff-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.position}</p>
                    {member.email && <p className="contact">{member.email}</p>}
                    {member.bio && <p className="bio">{member.bio}</p>}
                  </div>
                </div>
              ))
            ) : (
              /* Default Staff with Images */
              <>
                <div className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src="img/photos/coordinator.png" alt="Coordinator" />
                  </div>
                  <div className="staff-info">
                    <h3>John Banda</h3>
                    <p className="position">Coordinator</p>
                  </div>
                </div>
                <div className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src="img/photos/vice _president.jpeg" alt="Vice Coordinator" />
                  </div>
                  <div className="staff-info">
                    <h3>Mary Phiri</h3>
                    <p className="position">Vice Coordinator</p>
                  </div>
                </div>
                <div className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src="img/photos/secre.jpeg" alt="Secretary" />
                  </div>
                  <div className="staff-info">
                    <h3>Grace Mwale</h3>
                    <p className="position">Secretary</p>
                  </div>
                </div>
                <div className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src="img/photos/tressure.jpeg" alt="Treasurer" />
                  </div>
                  <div className="staff-info">
                    <h3>Peter Kachale</h3>
                    <p className="position">Treasurer</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section about-cta">
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Partner With Us</h2>
            <p>
              Join us in our mission to serve widows and orphans. 
              Your support makes a lasting difference.
            </p>
            <div className="cta-buttons">
              <a href="/donate" className="btn btn-primary btn-lg">
                <FaHeart /> Donate Now
              </a>
              <a href="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
