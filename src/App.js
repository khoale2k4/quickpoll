import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import React, { useEffect } from 'react';
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Import Register page
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import Intergration from "./pages/Intergration";
import UserProfile from "./pages/UserProfile";
import Reminder from "./pages/Reminder";
import Action from "./pages/Action";
import AnimatedRoutes from "./components/AnimatedRoutes";
import DashboardStatistics from "./pages/Statistics";

const RedirectToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/login`, { replace: true });
  }, [navigate]);
  return null;
};

function App() {
  return (
    <Router>
      <Helmet>
        <title>Yolo Farm</title>
        <meta name="description" content="Đăng nhập vào hệ thống Yolo Farm để quản lý nông trại thông minh." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keywords" content="Yolo Farm, đăng nhập, nông nghiệp thông minh" />
      </Helmet>
      <AnimatedRoutes>
        <Route path="/" element={<RedirectToHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<DashboardStatistics />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/setup" element={<Setup />} />
        <Route path="/register/intergration" element={<Intergration />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/action" element={<Action />} />
      </AnimatedRoutes>
    </Router>
  );
}

export default App;
