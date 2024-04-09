import { useState, useEffect, useMemo } from "react";
import {
  FaUser,
  FaUserMd,
  FaSearch,
  FaUserPlus,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import PatientRegistrationDialog from "./PatientRegistrationForm";
import "../styles/SidebarStyles.css";
// eslint-disable-next-line react/prop-types
const Sidebar = ({ setPatientData, handleDragStart, setDocCalendar }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [doctorDropdownVisible, setDoctorDropdownVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [startX, setStartX] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patientSearchQuery, setPatientSearchQuery] = useState({
    name: "",
    phonenumber: "",
    healthCardNumber: "",
    address: "",
    dob: "",
  });
  const [doctorSearchQuery, setDoctorSearchQuery] = useState({
    name: "",
    department: "",
  });

  const [docMinis, setDocMinis] = useState({
    "Saadman Rahman": "/saadman-rahman.PNG",
    "Saadman Justin": "/saadman-justin.PNG",
    "Omar Saraiya": "/omar-saraiya.PNG",
    "Smit Saraiya": "/smit-saraiya.PNG",
  });

  const [patientSearchResults, setPatientSearchResults] = useState([]);
  const [doctorSearchResults, setDoctorSearchResults] = useState([]);

  const patients = useMemo(
    () => [
      {
        name: "Saadman Rahman",
        phonenumber: "12345",
        healthCardNumber: "6789",
        address: "1st street 10 av T2P 5G3",
        dob: "2001-12-15",
      },
      {
        name: "Saadman Justin",
        phonenumber: "12390",
        healthCardNumber: "0987",
        address: "1st street 10 av T2P 5G3",
        dob: "2001-12-15",
      },
      {
        name: "Smit Saraiya",
        phonenumber: "098908",
        healthCardNumber: "1231",
        address: "India",
        dob: "2002-12-08",
      },
      {
        name: "Omar Saraiya",
        phonenumber: "098908",
        healthCardNumber: "9999",
        address: "Kashmir",
        dob: "2002-12-08",
      },
    ],
    []
  );

  const doctors = useMemo(
    () => [
      {
        name: "Saadman Rahman",
        department: "ortho",
        timeOff: [
          "1-9",
          "1-10",
          "1-11",
          "1-11",
          "1-12",
          "1-13",
          "1-14",
          "1-15",
        ],
      },
      {
        name: "Saadman Justin",
        department: "eye",
        timeOff: [
          "3-9",
          "3-10",
          "3-11",
          "3-11",
          "3-12",
          "3-13",
          "3-14",
          "3-15",
        ],
      },
      {
        name: "Smit Saraiya",
        department: "leg",
        timeOff: ["2-9", "2-10", "4-11", "4-12"],
      },
      {
        name: "Omar Saraiya",
        department: "nose",
        timeOff: [],
      },
    ],
    []
  );

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
    const newPatient = {
      name: formData.firstName + " " + formData.lastName,
      phonenumber: "192398",
      healthCardNumber: formData.healthCardNumber,
      address: formData.address,
      dob: formData.dob,
    };

    setPatientSearchResults((prevPatients) => [...prevPatients, newPatient]);
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

  useEffect(() => {
    let filteredPatients = [];
    if (
      patientSearchQuery.name ||
      patientSearchQuery.phonenumber ||
      patientSearchQuery.healthCardNumber ||
      patientSearchQuery.address
    ) {
      filteredPatients = patients
        .filter((patient) => {
          return (
            patient.name
              .toLowerCase()
              .includes(patientSearchQuery.name.toLowerCase()) &&
            patient.phonenumber.includes(patientSearchQuery.phonenumber) &&
            patient.healthCardNumber.includes(
              patientSearchQuery.healthCardNumber
            ) &&
            patient.address
              .toLowerCase()
              .includes(patientSearchQuery.address.toLowerCase())
          );
        })
        .slice(0, 3); // Limit to the first 3 search results
    }
    setPatientSearchResults(filteredPatients);
  }, [patients, patientSearchQuery]);

  const handlePatientSearchChange = (e, field) => {
    const value = e.target.value;
    setPatientSearchQuery((prevSearchQuery) => ({
      ...prevSearchQuery,
      [field]: value,
    }));
  };

  // for doc
  useEffect(() => {
    let filteredDoctors = [];
    if (doctorSearchQuery.name || doctorSearchQuery.department) {
      filteredDoctors = doctors
        .filter((patient) => {
          return (
            patient.name
              .toLowerCase()
              .includes(doctorSearchQuery.name.toLowerCase()) &&
            patient.department.includes(doctorSearchQuery.department)
          );
        })
        .slice(0, 3); // Limit to the first 3 search results
    }
    setDoctorSearchResults(filteredDoctors);
  }, [doctorSearchQuery, doctors]);

  const handleDoctorSearchChange = (e, field) => {
    const value = e.target.value;
    setDoctorSearchQuery((prevSearchQuery) => ({
      ...prevSearchQuery,
      [field]: value,
    }));
  };

  const changeDoc = (doc) => {
    setDocCalendar(doc);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
  };

  const handleClearPatient = () => {
    setSelectedPatient(null); // Clear selected patient
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
                onChange={(e) => handlePatientSearchChange(e, "name")}
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
                onChange={(e) => handlePatientSearchChange(e, "phonenumber")}
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
                onChange={(e) =>
                  handlePatientSearchChange(e, "healthCardNumber")
                }
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
                onChange={(e) => handlePatientSearchChange(e, "address")}
                style={{ fontSize: `${fontSize}px` }}
              />
            </div>
            <div className="search-result-container">
              {patientSearchResults.map((patient) => (
                <button
                  className="patient-search-button"
                  key={patient.name}
                  onClick={() => handlePatientSelect(patient)}
                >
                  <h3>{patient.name}</h3>
                  <p>Health ID: {patient.department}</p>
                  <div className="patient-details">
                    <p>Phone: {patient.phonenumber}</p>
                    <p>Address: {patient.address}</p>
                    <p>Date of Birth: {patient.dob}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {selectedPatient && (
          <div className="search-result-container">
            <div
              key={selectedPatient.healthCardNumber}
              draggable="true"
              onDragStart={(event) => handleDragStart(event, selectedPatient)}
              className="drag-card"
            >
              <div className="drag-card-content">
                <h3>{selectedPatient.name}</h3>
                <p>Health ID: {selectedPatient.healthCardNumber}</p>
              </div>
              <div className="clear-patient-icon" onClick={handleClearPatient}>
                ❌
              </div>
            </div>
          </div>
        )}
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
                onChange={(e) => handleDoctorSearchChange(e, "name")}
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
                onChange={(e) => handleDoctorSearchChange(e, "department")}
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
            <div className="search-result-container">
              {doctorSearchResults.map((doc) => (
                <button
                  className="patient-search-button"
                  key={doc.name}
                  onClick={() => changeDoc(doc)}
                >
                  <h3>{doc.name}</h3>
                  <p>Health ID: {doc.department}</p>
                  <div className="patient-details">
                    <img src={docMinis[doc.name]} alt={doc.name} />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="drag-card">
            <h3>Dr. Heinz Doofenshmirtz</h3>
            <p>practition: Orthopedics</p>
          </div>
        </div>
      </div>
      <div className="loggedInDetails">
        <h2>Logged in as Omar</h2>
        <h3>Employee Number: 4564</h3>
        <button>sign out</button>
      </div>
      {showDialog && (
        <PatientRegistrationDialog
          onClose={closeDialog}
          onSubmit={handleFormSubmit}
        />
      )}
      <div className="upcoming-appointments">
        {/* make up some upcoming appointments to display here for receptionist */}
      </div>
      <div className="Doctor Notes">
        {/* make up some upcoming appointments to display here for receptionist */}
      </div>
    </div>
    // </div>
  );
};

export default Sidebar;
