import React, { useState, useEffect } from "react";
import PatientCard from "./PatientCard";
import { FaUser, FaUserMd, FaSearch, FaUserPlus } from "react-icons/fa";
import PatientRegistrationDialog from "./PatientRegistrationForm";
import "../styles/SidebarStyles.css";

const Sidebar = ({ patientData, setPatientData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);

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
    localStorage.setItem("Patient Data: ", JSON.stringify(formData));
    setShowDialog(false);
  };

  // const handleSearch = (searchTerm) => {
  //   const patients = JSON.parse(localStorage.getItem("patientData")) || [];
  //   const results = patients.filter((patient) =>
  //     patient.firstName.includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // };

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
              // onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div>
            {patientData ? (
              <div>
                <div className="patient-card">
                  {/* Add more patient details here */}
                  <PatientCard patientData={patientData} />
                </div>
              </div>
            ) : (
              <p>
                lorem ipsum
                khwksdflksnfkl;dsjfklsjdlbfjsbfjksbfjksnfjsdabfjdsanfdsnfbjdsabfds,fbnjkdslbfads;adde
                jksfdbjksabfsjkdabfsjklbfsdf skjbfjsadkabfdsakfd
              </p>
            )}
          </div>

          {/* <div>
            {searchResults.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div> */}
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
