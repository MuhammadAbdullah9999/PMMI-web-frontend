import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Payment from "./Components/Payment/Payment";
import LandingPage from "./Components/LandingPage/LandingPage";
import CoursesPage from "./Components/Courses/CoursesPage";
import RegisterPage from "./Components/Authentication/Register/RegisterPage";
import LoginPage from "./Components/Authentication/Register/LoginPage";
import CourseDetail from "./Components/Courses/CourseDetail/CourseDetail";
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Default route */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/Payments" element={<Payment />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses/courseDetail/:courseName" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
