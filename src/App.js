import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PrivateRoute from "./components/routes/PrivateRoutes";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation"; // Keeps navigation globally accessible
import "./styles/App.css";

// Lazy-loaded components for optimized performance
const LandingPage = lazy(() => import("./LandingPage"));
const StudentLogin = lazy(() => import("./StudentLogin"));
const CounselorLogin = lazy(() => import("./CounselorLogin"));
const AppointmentBooking = lazy(() => import("./AppointmentBooking"));
const Chatbot = lazy(() => import("./Chatbot"));
const StudentDashboard = lazy(() => import("./StudentDashboard"));
const CounselorDashboard = lazy(() => import("./CounselorDashboard"));
const CounselorPage = lazy(() => import("./components/CounselorPage"));
const CounselorProfile = lazy(() => import("./components/CounselorProfile"));

const App = () => {
  return (
    <GoogleOAuthProvider clientId="681268107396-qvlmu3mlgsns92rle86mln83ng2fq9l6.apps.googleusercontent.com">
      <Router>
        {/* Global navigation accessible across routes */}
        <Navigation />

        <Layout>
          <Suspense fallback={<div className="loading">Loading, please wait...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/counselor-login" element={<CounselorLogin />} />

              {/* Protected Routes */}
              <Route
                path="/student/dashboard"
                element={<PrivateRoute role="STUDENT">{() => <StudentDashboard />}</PrivateRoute>}
              />
              <Route
                path="/student/dashboard/book"
                element={<PrivateRoute role="STUDENT">{() => <AppointmentBooking />}</PrivateRoute>}
              />
              <Route
                path="/chatbot"
                element={<PrivateRoute role="STUDENT">{() => <Chatbot />}</PrivateRoute>}
              />
              <Route
                path="/counselor-dashboard"
                element={<PrivateRoute role="COUNSELOR">{() => <CounselorDashboard />}</PrivateRoute>}
              />
              <Route
                path="/counselors"
                element={<PrivateRoute role="COUNSELOR">{() => <CounselorPage />}</PrivateRoute>}
              />
              <Route
                path="/counselors/:id"
                element={<PrivateRoute role="COUNSELOR">{() => <CounselorProfile />}</PrivateRoute>}
              />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;