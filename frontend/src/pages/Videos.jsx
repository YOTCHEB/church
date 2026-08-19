import { useState, useEffect } from 'react';
import { FaPlay, FaHeart, FaHandsHelping, FaUsers, FaArrowRight } from 'react-icons/fa';
import { videosService } from '../supabaseService';
import './Videos.css';

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videosService.getAllVideos();
        setVideos(data || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const featuredStats = [
    { icon: <FaHeart />, number: '500+', label: 'Lives Changed' },
    { icon: <FaUsers />, number: '50+', label: 'Families Served' },
    { icon: <FaHandsHelping />, number: '100+', label: 'Volunteers' },
  ];

  return (
    <div className="videos-page">
      {/* Hero Section */}
      <section className="videos-hero">
        <div className="hero-overlay"></div>
        <div className="videos-hero-content">
          <span className="hero-badge">
            <FaPlay /> Watch & See
          </span>
          <h1>Our Ministry in Action</h1>
          <p className="hero-description">
            Witness how God is working through Jehovah Jireh Ministry to transform lives 
            in Dzaleka Refugee Camp
          </p>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="section videos-stats">
        <div className="container">
          <div className="stats-grid">
            {featuredStats.map((stat, index) => (
              <div key={index} className="video-stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="section videos-main">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Videos</h2>
            <p className="section-subtitle">
              See the impact of your support and prayers in action
            </p>
          </div>

          {loading ? (
            <div className="videos-loading">
              <p>Loading videos...</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="videos-grid">
              {videos.map((video) => (
                <div 
                  key={video.id} 
                  className="video-card"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="video-thumbnail">
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt={video.title} />
                    ) : (
                      <video src={video.video_url} muted loop onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }} />
                    )}
                    <div className="play-button">
                      <FaPlay />
                    </div>
                    {video.duration && <span className="video-duration">{video.duration}</span>}
                  </div>
                  <div className="video-info">
                    <span className="video-category">{video.category}</span>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="videos-empty">
              <FaPlay style={{ fontSize: '3rem', color: '#c9a227', marginBottom: '1rem' }} />
              <p>Videos coming soon. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVideo(null)}>×</button>
            <div className="modal-video-container">
              <video src={selectedVideo.video_url} controls autoPlay />
            </div>
            <div className="modal-video-info">
              <span className="video-category">{selectedVideo.category}</span>
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section videos-cta">
        <div className="cta-overlay"></div>
        <div className="container">
          <div className="cta-content">
            <h2>Be Part of the Story</h2>
            <p>
              Your support makes these life-changing moments possible. 
              Join us in bringing hope to widows and orphans.
            </p>
            <div className="cta-buttons">
              <a href="/donate" className="btn btn-primary btn-lg">
                <FaHeart /> Donate Now
              </a>
              <a href="/contact" className="btn btn-outline btn-lg">
                Get Involved <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;
