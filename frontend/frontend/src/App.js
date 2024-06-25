import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecommendationPage from "./pages/RecommendationPage";
import PropertyListingsPage from "./pages/PropertyListingsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminDashboardPage from "./pages/AdminDashboard";
import "./App.css";

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    if (userToken) {
      setIsAuthenticated(true);
    }
    setIsAdmin(adminStatus);
  }, []);

  const showNavbar = !["/login", "/signup","/forgot-password"].includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <Navbar isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommendations" element={<RecommendationPage />} />
        <Route path="/properties" element={<PropertyListingsPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setIsAuthenticated={setIsAuthenticated}
              setIsAdmin={setIsAdmin}
            />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {isAdmin && <Route path="/admin" element={<AdminDashboardPage />} />}
      </Routes>
      <ToastContainer/>
    </>
  );
};
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
