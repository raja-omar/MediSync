import React, { useState } from "react";
import { FaUser, FaUserMd, FaSearch, FaUserPlus } from "react-icons/fa";
import PatientRegistrationDialog from "./PatientRegistrationForm";
import "../styles/SidebarStyles.css";

const Sidebar = ({ setPatientData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);

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

  return (
    <div className="sidebar">
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
      <div>
        <table border="0" className="invisible">
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
          </tr>
        </table>
      </div>
      <div className="dropbtn">
        <h3>Upcoming Appointments</h3>
        <br></br>
      </div>

      <div className="drag-card">
        <h3>10:00: Dr Heinz Ketchup</h3>
        <p>Saadman R.</p>
      </div>
      <div>
        <br></br>
      </div>
      <div className="drag-card">
        <h3>11:00: Dr Smit S.</h3>
        <p>Prat P.</p>
      </div>
      <div>
        <br></br>
      </div>
      <div className="drag-card">
        <h3>1:00: Dr Heinz Ketchup</h3>
        <p>Omar R.</p>
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
