import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorSidebarStyles.css";
import {
  FaUser,
  FaTrash,
  FaExpandAlt,
  FaCompressAlt,
  FaChevronDown,
} from "react-icons/fa";

const Sidebar = ({ isFullScreen, setIsFullScreen }) => {
  const navigate = useNavigate()
  const [notes, setNotes] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth);
  const [fontSize, setFontSize] = useState(16);
  const [patientDropdownVisible, setPatientDropdownVisible] = useState(false);
  const [lastWidth, setLastWidth] = useState(450);
  const [randomNotes, setRandomNotes] = useState([
    {
      text: "Patient needs to schedule a follow-up appointment in 2 weeks.",
      date: "2024-03-07",
      time: "10:30 AM",
    },
    {
      text: "Prescribed medication: Aspirin 75mg daily.",
      date: "2024-03-06",
      time: "02:15 PM",
    },
  ]);

  const patientDetails = {
    name: "John Doe",
    age: 35,
    gender: "Male",
    address: "123 Main St, City",
    contact: "+1234567890",
    chronicIllnesses: ["Hypertension", "Diabetes"],
    allergies: ["Penicillin", "Pollen"],
    medications: ["Lisinopril", "Metformin"],
    reasonForAppointment: "Routine check-up",
  };

  const togglePatientDropdown = () => {
    setPatientDropdownVisible(!patientDropdownVisible);
  };

  const increaseFontSize = () => {
    setFontSize((prevFontSize) => Math.min(prevFontSize + 1, 30));
  };

  const decreaseFontSize = () => {
    setFontSize((prevFontSize) => Math.max(prevFontSize - 1, 10));
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const submitNotes = () => {
    const newNote = {
      text: notes,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    setRandomNotes((prevNotes) => [...prevNotes, newNote]);
    setNotes("");
  };

  const handleFullScreen = () => {
    if (!isFullScreen) {
      setLastWidth(sidebarWidth);
      setSidebarWidth(window.innerWidth);
      console.log("it should be full screen");
    } else {
      setSidebarWidth(lastWidth);
      console.log("should not be full screen");
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(sidebarWidth + deltaX, 500);
      setSidebarWidth(newWidth);
      setLastWidth(sidebarWidth);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.userSelect = "auto";
  };

  const deleteNote = (index) => {
    const updatedNotes = [...randomNotes];
    updatedNotes.splice(index, 1);
    setRandomNotes(updatedNotes);
  };

  return (
    <div
      className="sidebar"
      style={{ width: sidebarWidth, fontSize: `${fontSize}px` }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="sidepanel-content">
        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <div className="top-sidebar">
          <div
            className="zoom-div"
            style={{ marginRight: "auto", fontSize: `${fontSize}px` }}
          >
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
            <button
              onClick={resetFontSize}
              style={{ fontSize: `${fontSize}px` }}
            >
              reset
            </button>
          </div>
          <div
            className="zoom-div"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            <button onClick={handleFullScreen} style={{ marginLeft: "auto" }}>
              {isFullScreen ? <FaCompressAlt /> : <FaExpandAlt />}
            </button>
          </div>
        </div>

        <div className="patient-info">
          <button
            className="dropbtn"
            onClick={togglePatientDropdown}
            style={{ fontSize: `${fontSize * 1.5}px` }}
          >
            <FaUser />
            Patient Information
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
            <p>
              <strong>Name:</strong> {patientDetails.name}
            </p>
            <p>
              <strong>Age:</strong> {patientDetails.age}
            </p>
            <p>
              <strong>Gender:</strong> {patientDetails.gender}
            </p>
            <p>
              <strong>Address:</strong> {patientDetails.address}
            </p>
            <p>
              <strong>Contact:</strong> {patientDetails.contact}
            </p>
            <p>
              <strong>Chronic Illnesses:</strong>{" "}
              {patientDetails.chronicIllnesses.join(", ")}
            </p>
            <p>
              <strong>Allergies:</strong> {patientDetails.allergies.join(", ")}
            </p>
            <p>
              <strong>Medications:</strong>{" "}
              {patientDetails.medications.join(", ")}
            </p>
            <p>
              <strong>Reason for Appointment:</strong>{" "}
              {patientDetails.reasonForAppointment}
            </p>
          </div>
        </div>

        <div className="notes-section">
          <div className="notes-container">
            <h2 style={{ fontSize: `${fontSize * 1.5}px` }}>Notes</h2>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Type notes here..."
            />
            <button onClick={submitNotes}>Submit</button>
          </div>

          <div className="random-notes">
            <h3 style={{ fontSize: `${fontSize * 1.25}px` }}>Patient Notes</h3>
            <ul>
              {randomNotes.map((note, index) => (
                <div key={index} className="note-item">
                  <li key={index}>
                    <p>{note.text}</p>
                    <p>
                      Date: {note.date}, Time: {note.time}
                    </p>
                  </li>
                  <button
                    className="delete-button"
                    onClick={() => deleteNote(index)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="loggedInDetails">
        <h2>Logged in as Dr.Saadman</h2>
        <h3>Employee Number: 1234</h3>
        <button onClick={() => navigate("/login")}>sign out</button>
      </div>
    </div>
  );
};

export default Sidebar;
