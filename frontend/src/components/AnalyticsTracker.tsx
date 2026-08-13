import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from '../utils/analytics';

/**
 * Component that automatically tracks SPA route navigation using React Router.
 * Place inside <Router> in App.tsx.
 */
export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA on component mount
    initGA();
  }, []);

  useEffect(() => {
    // Construct full path combining pathname, hash, and search params
    const fullPath = `${location.pathname}${location.hash}${location.search}`;
    trackPageView(fullPath);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
