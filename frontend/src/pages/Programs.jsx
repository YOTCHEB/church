import { useState, useEffect } from 'react';
import { FaHome, FaUtensils, FaBook, FaHeart, FaHandsHelping, FaPrayingHands, FaArrowRight, FaImage } from 'react-icons/fa';
import { programsService } from '../supabaseService';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const unsub = programsService.subscribeToPrograms((data) => {
      setPrograms(data.filter(p => p.is_active !== false));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Program images from img/photos folder
  const programImages = [
    'img/photos/1768200744111.jpg',
    'img/photos/1768200744123.jpg',
    'img/photos/1768200744137.jpg',
    'img/photos/1768200744159.jpg',
    'img/photos/1768200744172.jpg',
    'img/photos/1768200744183.jpg',
    'img/photos/1768200744192.jpg',
    'img/photos/1768200744202.jpg',
    'img/photos/1768200744211.jpg',
    'img/photos/1768200744222.jpg',
    'img/photos/1768200744234.jpg',
    'img/photos/1768200744250.jpg',
    'img/photos/1768200744262.jpg',
    'img/photos/1768200744273.jpg',
    'img/photos/1768200744284.jpg',
    'img/photos/1768200744300.jpg',
  ];

  const defaultPrograms = [
    { icon: <FaHome />, title: 'Housing Support', description: 'Providing safe, stable housing solutions for widows and orphans, ensuring they have a secure foundation to rebuild their lives.', image: programImages[0] },
    { icon: <FaUtensils />, title: 'Food Distribution', description: 'Implementing sustainable food programs that provide nutritious meals to families facing hunger and food insecurity.', image: programImages[1] },
    { icon: <FaBook />, title: 'Education Support', description: 'Creating pathways to education through scholarships, school supplies, and learning resources for children.', image: programImages[2] },
    { icon: <FaHeart />, title: 'Healthcare Ministry', description: 'Providing access to basic healthcare services, medical supplies, and health education to vulnerable families.', image: programImages[3] },
    { icon: <FaPrayingHands />, title: 'Spiritual Guidance', description: 'Sharing God\'s Word and providing spiritual counseling to help individuals find hope, healing, and purpose.', image: programImages[4] },
    { icon: <FaHandsHelping />, title: 'Community Empowerment', description: 'Building sustainable communities through skills training, income generation, and capacity building programs.', image: programImages[5] }
  ];

  const displayPrograms = programs.length > 0 ? programs.map((p, i) => ({
    ...p,
    image: p.image_url || programImages[i % programImages.length]
  })) : defaultPrograms;

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="hero-overlay"></div>
        <div className={`programs-hero-content ${isVisible ? 'visible' : ''}`}>
          <span className="hero-badge">
            <FaHandsHelping /> Our Programs
          </span>
          <h1>Transforming Lives Through Ministry</h1>
          <p className="hero-description">
            Demonstrating God's love through practical support and holistic care
          </p>
        </div>
      </section>

      {/* Programs Grid with Images */}
      <section className="section programs-main">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">
              Comprehensive programs designed to meet physical, emotional, and spiritual needs
            </p>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <div className="programs-gallery-grid">
              {displayPrograms.map((program, index) => (
                <div 
                  key={program.id || index} 
                  className={`program-card-large ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="program-card-image" onClick={() => setSelectedImage(program.image)}>
                    <img src={program.image || programImages[index % programImages.length]} alt={program.title} />
                    <div className="image-overlay">
                      <FaImage />
                      <span>View Full Size</span>
                    </div>
                  </div>
                  <div className="program-card-content">
                    <div className="program-icon-badge">{program.icon}</div>
                    <h3>{program.title}</h3>
                    <p>{program.description}</p>
                    <div className="program-card-footer">
                      <a href="/donate" className="support-btn">
                        Support This Program <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="section programs-gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Program Gallery</h2>
            <p className="section-subtitle">
              See our ministry work in action through these photos
            </p>
          </div>
          <div className="photo-gallery-grid">
            {programImages.slice(0, 12).map((img, index) => (
              <div 
                key={index} 
                className="gallery-item"
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`Program ${index + 1}`} />
                <div className="gallery-overlay">
                  <FaImage />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Impact</h2>
            <p className="section-subtitle">
              By God's grace, see what He has done through this ministry
            </p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-number">500+</div>
              <div className="impact-label">Lives Transformed</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">50+</div>
              <div className="impact-label">Families Served</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">100+</div>
              <div className="impact-label">Children Educated</div>
            </div>
            <div className="impact-card">
              <div className="impact-number">10+</div>
              <div className="impact-label">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section programs-cta">
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Support Our Programs</h2>
            <p>
              Your donations make these life-changing programs possible. 
              Join us in bringing hope and transformation to widows and orphans.
            </p>
            <div className="cta-buttons">
              <a href="/donate" className="btn btn-primary btn-lg">
                <FaHeart /> Donate Now
              </a>
              <a href="/contact" className="btn btn-outline btn-lg">
                Learn More <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Programs;
