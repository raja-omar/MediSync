import { useState } from "react";
import {
  FaUser,
  FaUserMd,
  FaSearch,
  FaUserPlus,
  FaChevronDown,
} from "react-icons/fa";
import PatientRegistrationDialog from "./PatientRegistrationForm";
import "../styles/SidebarStyles.css";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setPatientData }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [startX, setStartX] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const patients = [
    {
      firstName: "Saadman",
      lastName: "Rahman",
      phonenumber: "12345",
      healthCardNumber: "6789",
      address: "1st street 10 av T2P 5G3",
      dob: "2001-12-15",
    },
    {
      firstName: "Saadman",
      lastName: "Justin",
      phonenumber: "12390",
      healthCardNumber: "0987",
      address: "1st street 10 av T2P 5G3",
      dob: "2001-12-15",
    },
    {
      firstName: "Smit",
      lastName: "Saraiya",
      phonenumber: "098908",
      healthCardNumber: "1231",
      address: "India",
      dob: "2002-12-08",
    },
  ];

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => Math.min(prevFontSize + 1, 30));
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 1, 10)); // Limit minimum font size
  };

  const resetFontSize = () => {
    setFontSize(16); // Limit minimum font size
  };

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
    console.log(formData);
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      let newWidth = Math.max(sidebarWidth + deltaX, 300);
      newWidth = Math.min(newWidth, 700);
      setSidebarWidth(newWidth);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.userSelect = "auto";
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredResults = patients.filter(
      (patient) =>
        (patient.firstName + patient.lastName)
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        patient.phonenumber.includes(query) ||
        patient.dob.includes(query) ||
        patient.healthCardNumber.includes(query) ||
        patient.address.includes(query.toLowerCase())
    );
    setSearchResults(filteredResults.slice(0, 3)); // Get top 3 matching results
  };

  return (
    <div
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="sidepanel-content">
        <div className="resize-handle" onMouseDown={handleMouseDown} />
        <div className="zoom-div" style={{ fontSize: `${fontSize}px` }}>
          Zoom:
          <button
            onClick={increaseFontSize}
            style={{ fontSize: `${fontSize}px` }}
          >
            +
          </button>
          <button
            onClick={decreaseFontSize}
            style={{ fontSize: `${fontSize}px` }}
          >
            -
          </button>
          <button onClick={resetFontSize} style={{ fontSize: `${fontSize}px` }}>
            reset
          </button>
        </div>
        <div className="dropdown">
          <button
            className="dropbtn"
            onClick={togglePatientDropdown}
            style={{ fontSize: `${fontSize}px` }}
          >
            <FaUser /> Patient
            <div style={{ marginLeft: "auto" }}>
              <FaChevronDown />
            </div>
          </button>
          <div
            className={`dropdown-content ${
              patientDropdownVisible ? "open" : ""
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <button
              className="dropdown-item register-patient"
              onClick={openDialog}
              style={{ fontSize: `${fontSize}px` }}
            >
              Register new patient <FaUserPlus className="register-icon" />
            </button>
            <br></br>
            <h3>Patient Search</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search existing patient  &#x1F50D; "
                className="search-input"
                // value={searchQuery}
                onChange={handleSearchChange}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <br></br>
            <h3>Additional Filters</h3>
            <div
              className="search-container"
              style={{ fontSize: `${fontSize}px` }}
            >
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Phone number"
                className="search-input"
                // value={searchQuery}
                onChange={handleSearchChange}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div
              className="search-container"
              style={{ fontSize: `${fontSize}px` }}
            >
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Patient Health ID"
                className="search-input"
                // value={searchQuery}
                onChange={handleSearchChange}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div
              className="search-container"
              style={{ fontSize: `${fontSize}px` }}
            >
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Patient Address"
                className="search-input"
                // value={searchQuery}
                onChange={handleSearchChange}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
          </div>
          {searchResults.length > 0 && (
            <div>
              {searchResults.map((patient, index) => (
                <div key={index}>
                  <p>{`${patient.firstName} ${patient.lastName}`}</p>
                  <p>{patient.phonenumber}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown">
          <button
            className="dropbtn"
            onClick={toggleDoctorDropdown}
            style={{ fontSize: `${fontSize}px` }}
          >
            <FaUserMd /> Doctor
            <div style={{ marginLeft: "auto" }}>
              <FaChevronDown />
            </div>
          </button>
          <div
            className={`dropdown-content ${
              doctorDropdownVisible ? "open" : ""
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <div
              className="search-container"
              style={{ fontSize: `${fontSize}px` }}
            >
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Search doctor"
                className="search-input"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div className="search-container">
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Search Department"
                className="search-input"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div className="search-container">
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Enter start time"
                className="search-input"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div className="search-container">
              <FaSearch
                className="search-icon"
                style={{ fontSize: `${fontSize}px` }}
              />
              <input
                type="text"
                placeholder="Enter finish time"
                className="search-input"
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Logged in as Saadman</h2>
        <h3>Employee Number: 1234</h3>
        <button>sign out</button>
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
