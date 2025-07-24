import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginSignup from "./auth/LoginSinup";
import Profile from "./components/Profile";
import BookAppointment from "./pages/BookAppointment";
import ProtectedRoute from "./auth/Protected";
import Dashboard from "./pages/Dashboard";
import MyAppointments from "./pages/MyAppointments";
import { useDispatch, useSelector } from "react-redux";
import PatientPage from "./pages/Patient";
import {
  fetchProfileData,
  setUseridAndToken,
} from "./store/profile/profileReducer";
import "./App.css";
import Services from "./components/Servicer";
import { getAppointments } from "./store/appointments/appointmentSlice";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.sideBar);
  useEffect(() => {
    // Check if the user is logged in
    const data = JSON.parse(localStorage.getItem("userdata"));
    if (data) {
      setIsLoggedIn(true);
      dispatch(setUseridAndToken(data));
      dispatch(fetchProfileData(data.token));
      dispatch(getAppointments(data.token));
    }
    // check the user profile
  }, [dispatch]);
  return (
    <div>
      <Router>
        {isLoggedIn && <Header />}
        <main className={`${user ? "sidebarOpen" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book-appontment"
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />
            { <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            /> }
            <Route path="/login-signup" element={<LoginSignup />} />
            <Route path="/patient" element={isLoggedIn && <PatientPage />} />
          </Routes>
        </main>
      </Router>
      <footer className={`${user ? "sidebarOpen" : ""}`}>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
