import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App.jsx";
import DoctorScreen from "./pages/DoctorScreen.jsx";
import Login from "./pages/newLogin.jsx";
import Register from "./pages/newRegister.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/doctorscreen" element={<DoctorScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
