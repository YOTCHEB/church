import { useState, useEffect } from 'react';
import { FaDownload, FaTimes, FaHeart, FaMobileAlt, FaCheck } from 'react-icons/fa';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Check if user already dismissed or installed
    const dismissed = localStorage.getItem('installPromptDismissed');
    const installed = localStorage.getItem('appInstalled');
    
    if (dismissed || installed) return;

    // Check if already installed (running as PWA)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      localStorage.setItem('appInstalled', 'true');
      return;
    }

    // Check if on mobile or tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isDesktop = !isMobile;
    
    // Show on both mobile and desktop after delay
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3000); // Show after 3 seconds

    // Listen for install prompt (Android/Chrome desktop)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // iOS Safari - show instructions
      setShowPrompt(false);
      localStorage.setItem('installPromptDismissed', 'true');
      
      // Create custom alert for iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        alert('📱 To install this app:\n\n1. Tap the Share button (⬆️ icon)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right corner\n\nThe app will appear on your home screen!');
      } else {
        alert('📱 To install this app:\n\n1. Tap the menu (⋮) in your browser\n2. Tap "Install app" or "Add to Home screen"\n3. Confirm the installation\n\nThe app will be added to your home screen!');
      }
      return;
    }

    // Android/Desktop Chrome install
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      localStorage.setItem('appInstalled', 'true');
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="install-prompt-overlay" onClick={handleDismiss}>
      <div className="install-prompt" onClick={(e) => e.stopPropagation()}>
        <div className="install-prompt-content">
          <button className="install-dismiss" onClick={handleDismiss}>
            <FaTimes />
          </button>
          <div className="install-icon">
            <FaHeart />
          </div>
          <div className="install-badge">
            <FaMobileAlt />
            <span>Install Our App</span>
          </div>
          <h3>Get the Jehovah Jireh App</h3>
          <ul className="install-features">
            <li><FaCheck /> Quick access from home screen</li>
            <li><FaCheck /> Works offline</li>
            <li><FaCheck /> Faster loading</li>
            <li><FaCheck /> No browser distractions</li>
          </ul>
          <button className="install-btn" onClick={handleInstall}>
            <FaDownload /> Install Now - It's Free!
          </button>
          <p className="install-note">Takes less than 30 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
