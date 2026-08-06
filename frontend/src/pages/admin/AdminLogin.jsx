import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock, FaEnvelope, FaArrowRight, FaHeart, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../../authService';
import supabase from '../../supabase';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      let isAuthenticated = false;
      
      if (supabase) {
        isAuthenticated = await authService.isAuthenticated();
      } else {
        isAuthenticated = !!localStorage.getItem('demoAdmin');
      }
      
      if (isAuthenticated) {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!supabase) {
      // Demo mode when Supabase is not configured
      setTimeout(() => {
        if (email === 'admin@jehovahjireh.org' && password === 'admin123') {
          localStorage.setItem('demoAdmin', 'true');
          localStorage.setItem('adminEmail', email);
          navigate('/admin/dashboard', { replace: true });
        } else {
          setError('Invalid credentials. Try: admin@jehovahjireh.org / admin123');
          setLoading(false);
        }
      }, 500);
      return;
    }

    try {
      await authService.signIn(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src="/logo.png" alt="Jehovah Jireh" className="login-logo-image" />
            <div className="login-logo-text">
              <span>Jehovah Jireh</span>
              <small>ADMIN PORTAL</small>
            </div>
            <h1>Dashboard Login</h1>
            <p>Jehovah Jireh Ministry</p>
            <span className="login-subtitle">Manage your ministry dashboard</span>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="error-message">
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label>
                <FaEnvelope className="input-icon" />
                Email Address
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@jehovahjireh.org" 
                required 
              />
            </div>

            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                Password
              </label>
              <div className="password-input">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter password" 
                  required 
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-login" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Logging in...
                </>
              ) : (
                <>
                  Login <FaArrowRight />
                </>
              )}
            </button>

            <div className="demo-credentials">
              {!supabase ? (
                <>
                  <p><strong>Demo Credentials:</strong></p>
                  <p>Email: admin@jehovahjireh.org</p>
                  <p>Password: admin123</p>
                </>
              ) : null}
            </div>
          </form>

          <div className="login-footer">
            <a href="/" className="back-link">
              ← Back to Website
            </a>
            <p className="copyright">
              © {new Date().getFullYear()} Jehovah Jireh Ministry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
