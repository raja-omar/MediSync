import React, { useState } from "react";
import { FaUser, FaUserMd, FaSearch, FaUserPlus } from "react-icons/fa";
import PatientRegistrationDialog from "./PatientRegistrationForm";
import "../styles/SidebarStyles.css";

const Sidebar = ({ setPatientData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250); // Initial width of the sidebar
  const [startX, setStartX] = useState(0);

  const togglePatientDropdown = () => {
    setPatientDropdownVisible(!patientDropdownVisible);
    if (doctorDropdownVisible) {
      setDoctorDropdownVisible(false);
    }
  };

  const toggleDoctorDropdown = () => {
    setDoctorDropdownVisible(!doctorDropdownVisible);
    if (patientDropdownVisible) {
      setPatientDropdownVisible(false);
    }
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleFormSubmit = (formData) => {
    setPatientData(formData);
    setShowDialog(false);
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(sidebarWidth + deltaX, 300); // Limit minimum width
      setSidebarWidth(newWidth);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.userSelect = "auto";
  };

  return (
    <div
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="resize-handle" onMouseDown={handleMouseDown} />

      <div className="dropdown">
        <button className="dropbtn" onClick={togglePatientDropdown}>
          <FaUser /> Patient
        </button>
        <div
          className={`dropdown-content ${patientDropdownVisible ? "open" : ""}`}
        >
          <button
            className="dropdown-item register-patient"
            onClick={openDialog}
          >
            Register new patient <FaUserPlus className="register-icon" />
          </button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search existing patient  &#x1F50D; "
              className="search-input"
            />
          </div>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn" onClick={toggleDoctorDropdown}>
          <FaUserMd /> Doctor
        </button>
        <div
          className={`dropdown-content ${doctorDropdownVisible ? "open" : ""}`}
        >
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search doctor"
              className="search-input"
            />
          </div>
        </div>
      </div>
      {showDialog && (
        <PatientRegistrationDialog
          onClose={closeDialog}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Sidebar;
