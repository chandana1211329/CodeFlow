import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntroLandingPage from './pages/IntroLandingPage';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import Learn from './pages/Learn';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import AnalyticsTracker from './components/AnalyticsTracker';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<IntroLandingPage />} />
          <Route path="/app" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/learn/:courseId" element={<PrivateRoute><Learn /></PrivateRoute>} />
          <Route path="/learn/:courseId/:topicId" element={<PrivateRoute><Learn /></PrivateRoute>} />
          <Route path="/learn/:courseId/:topicId/:subtopicId" element={<PrivateRoute><Learn /></PrivateRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
