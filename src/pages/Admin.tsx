
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if admin is logged in on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login handler
  const handleLogin = (username: string, password: string) => {
    // Simple authentication for demo - in production use secure authentication
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminToken", "demo-token-12345");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />;
  }

  // If authenticated, show admin dashboard
  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin;
