import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaHandsHelping, FaHome, FaBook, FaUtensils, FaPrayingHands, FaArrowRight, FaWhatsapp, FaEye, FaBullseye, FaStar, FaQuoteLeft, FaPlay } from 'react-icons/fa';
import { staffService, programsService } from '../supabaseService';
import './Home.css';

const Home = () => {
  const [staff, setStaff] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const unsubStaff = staffService.subscribeToStaff(setStaff);
    const unsubPrograms = programsService.subscribeToPrograms((data) => {
      setPrograms(data.filter(p => p.is_active !== false));
      setLoading(false);
    });
    return () => {
      unsubStaff();
      unsubPrograms();
    };
  }, []);

  const stats = [
    { number: '500+', label: 'Lives Impacted', icon: <FaHeart /> },
    { number: '50+', label: 'Families Served', icon: <FaHome /> },
    { number: '100+', label: 'Children Educated', icon: <FaBook /> },
    { number: '10+', label: 'Years of Service', icon: <FaStar /> },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className={`hero-badge ${isVisible ? 'visible' : ''}`}>
            <FaHeart />
            <span>Welcome to</span>
          </div>
          <h1 className={`hero-title ${isVisible ? 'visible' : ''}`}>
            Jehovah Jireh <span className="text-gold">Ministry</span>
          </h1>
          <p className={`hero-scripture ${isVisible ? 'visible' : ''}`}>
            "The LORD will provide" - Genesis 22:14
          </p>
          <p className={`hero-description ${isVisible ? 'visible' : ''}`}>
            Led by the Holy Spirit, we serve widows and orphans with God's unconditional love 
            in Dzaleka Refugee Camp, bringing hope, dignity, and transformation to vulnerable communities.
          </p>
          <div className={`hero-buttons ${isVisible ? 'visible' : ''}`}>
            <Link to="/donate" className="btn btn-primary btn-lg">
              <FaHeart /> Donate Now
            </Link>
            <Link to="/videos" className="btn btn-outline btn-lg">
              <FaPlay /> Watch Videos
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-indicator"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Cards */}
      <section className="section vision-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Who We Are</h2>
            <p className="section-subtitle">
              A Christ-centered organization dedicated to serving the vulnerable
            </p>
          </div>
          <div className="vision-grid">
            <div className="vision-card">
              <div className="vision-card-icon">
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <div className="vision-card-line"></div>
              <p>Restoring hope and dignity through God's provision to widows and orphans in refugee communities.</p>
            </div>
            <div className="vision-card featured">
              <div className="vision-card-icon">
                <FaBullseye />
              </div>
              <h3>Our Mission</h3>
              <div className="vision-card-line"></div>
              <p>Showing God's love through practical care, compassion, and empowerment programs that transform lives.</p>
            </div>
            <div className="vision-card">
              <div className="vision-card-icon">
                <FaPrayingHands />
              </div>
              <h3>Our Purpose</h3>
              <div className="vision-card-line"></div>
              <p>Serving God by caring for the vulnerable, providing essential support and spiritual guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section programs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Ministries</h2>
            <p className="section-subtitle">
              Practical support demonstrating God's love in action
            </p>
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : programs.length > 0 ? (
            <div className="programs-grid">
              {programs.map((program) => (
                <div key={program.id} className="program-card">
                  <div className="program-card-icon">{program.icon}</div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <Link to="/programs" className="program-link">
                    Learn More <FaArrowRight />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="programs-grid">
              <div className="program-card">
                <div className="program-card-icon"><FaHome /></div>
                <h3>Housing Support</h3>
                <p>Providing safe, stable housing for widows and orphans in need.</p>
              </div>
              <div className="program-card">
                <div className="program-card-icon"><FaUtensils /></div>
                <h3>Food Distribution</h3>
                <p>Nutritious meals to families facing hunger and food insecurity.</p>
              </div>
              <div className="program-card">
                <div className="program-card-icon"><FaBook /></div>
                <h3>Education Support</h3>
                <p>Scholarships and supplies for children's educational journey.</p>
              </div>
              <div className="program-card">
                <div className="program-card-icon"><FaHeart /></div>
                <h3>Healthcare Ministry</h3>
                <p>Medical care and health education for vulnerable families.</p>
              </div>
              <div className="program-card">
                <div className="program-card-icon"><FaPrayingHands /></div>
                <h3>Spiritual Guidance</h3>
                <p>Bible study, prayer, and discipleship programs.</p>
              </div>
              <div className="program-card">
                <div className="program-card-icon"><FaHandsHelping /></div>
                <h3>Community Empowerment</h3>
                <p>Skills training and income generation programs.</p>
              </div>
            </div>
          )}
          <div className="text-center" style={{marginTop: '2.5rem'}}>
            <Link to="/programs" className="btn btn-secondary btn-lg">
              View All Programs <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="scripture-section">
        <div className="container">
          <div className="scripture-content">
            <FaQuoteLeft className="quote-icon" />
            <blockquote>
              Religion that God our Father accepts as pure and faultless is this: 
              to look after orphans and widows in their distress and to keep oneself 
              from being polluted by the world.
            </blockquote>
            <cite>- James 1:27 (NIV)</cite>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="section staff-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Leadership</h2>
            <p className="section-subtitle">
              Dedicated servants committed to God's mission
            </p>
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : staff.length > 0 ? (
            <div className="staff-grid">
              {staff.map((member) => (
                <div key={member.id} className="staff-card">
                  <div className="staff-image-wrapper">
                    <img src={member.image_url || 'img/photos/coordinator.png'} alt={member.name} />
                    <div className="staff-overlay"></div>
                  </div>
                  <div className="staff-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.position}</p>
                    {member.bio && <p className="bio">{member.bio.substring(0, 100)}...</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Default Staff with Images */
            <div className="staff-grid">
              <div className="staff-card">
                <div className="staff-image-wrapper">
                  <img src="img/photos/coordinator.png" alt="Coordinator" />
                  <div className="staff-overlay"></div>
                </div>
                <div className="staff-info">
                  <h3>John Banda</h3>
                  <p className="position">Coordinator</p>
                </div>
              </div>
              <div className="staff-card">
                <div className="staff-image-wrapper">
                  <img src="img/photos/vice _president.jpeg" alt="Vice Coordinator" />
                  <div className="staff-overlay"></div>
                </div>
                <div className="staff-info">
                  <h3>Mary Phiri</h3>
                  <p className="position">Vice Coordinator</p>
                </div>
              </div>
              <div className="staff-card">
                <div className="staff-image-wrapper">
                  <img src="img/photos/secre.jpeg" alt="Secretary" />
                  <div className="staff-overlay"></div>
                </div>
                <div className="staff-info">
                  <h3>Grace Mwale</h3>
                  <p className="position">Secretary</p>
                </div>
              </div>
              <div className="staff-card">
                <div className="staff-image-wrapper">
                  <img src="img/photos/tressure.jpeg" alt="Treasurer" />
                  <div className="staff-overlay"></div>
                </div>
                <div className="staff-info">
                  <h3>Peter Kachale</h3>
                  <p className="position">Treasurer</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <FaHeart />
              <span>Make a Difference</span>
            </div>
            <h2>Join Us in Our Mission</h2>
            <p>
              Your support helps us continue serving widows, orphans, and the vulnerable 
              in Dzaleka Refugee Camp. Every contribution brings hope and transformation.
            </p>
            <div className="cta-buttons">
              <a href="https://wa.me/265993506106" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">
                <FaWhatsapp /> Donate via WhatsApp
              </a>
              <Link to="/videos" className="btn btn-outline btn-lg">
                <FaPlay /> Watch Videos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="section give-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ways to Give</h2>
            <p className="section-subtitle">
              "Each of you should give what you have decided in your heart to give, 
              not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
            </p>
          </div>
          <div className="give-grid">
            <div className="give-card">
              <div className="give-card-icon">
                <FaHeart />
              </div>
              <h3>Financial Support</h3>
              <p>Monetary contributions help us provide essential services and respond to urgent needs.</p>
              <Link to="/donate" className="give-link">
                Donate Now <FaArrowRight />
              </Link>
            </div>
            <div className="give-card">
              <div className="give-card-icon">
                <FaHandsHelping />
              </div>
              <h3>Material Donations</h3>
              <p>Clothing, food, supplies, and essentials make a direct impact on families we serve.</p>
              <Link to="/donate" className="give-link">
                Learn More <FaArrowRight />
              </Link>
            </div>
            <div className="give-card">
              <div className="give-card-icon">
                <FaUtensils />
              </div>
              <h3>Volunteer Your Time</h3>
              <p>Share your skills and passion by volunteering with our ministry programs.</p>
              <Link to="/contact" className="give-link">
                Get Involved <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
