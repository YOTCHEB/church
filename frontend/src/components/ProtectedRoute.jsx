import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../authService';
import supabase from '../supabase';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If Supabase is not configured, check for demo mode
      if (!supabase) {
        const demoMode = localStorage.getItem('demoAdmin');
        setIsAuthenticated(!!demoMode);
        setLoading(false);
        return;
      }

      // Check Supabase authentication
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);
    };

    checkAuth();

    // Subscribe to auth changes if Supabase is configured
    if (supabase) {
      const { unsubscribe } = authService.onAuthStateChange((event, session) => {
        setIsAuthenticated(!!session);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
