import React, { useState } from "react";
import "../styles/DoctorSidebarStyles.css";

const Sidebar = () => {
  const [notes, setNotes] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(450); // Initial width of the sidebar

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

  const randomNotes = [
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
  ];

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const submitNotes = () => {
    console.log("Notes submitted:", notes);
    setNotes("");
  };

  const handleMouseDown = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(sidebarWidth + deltaX, 200); // Limit minimum width
      setSidebarWidth(newWidth);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="resize-handle"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <div className="patient-info">
        <h2>Patient Information</h2>
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
          <strong>Medications:</strong> {patientDetails.medications.join(", ")}
        </p>
        <p>
          <strong>Reason for Appointment:</strong>{" "}
          {patientDetails.reasonForAppointment}
        </p>
      </div>
      <div className="notes-section">
        <div className="notes-container">
          <h2>Notes</h2>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Type notes here..."
          />
          <button onClick={submitNotes}>Submit</button>
        </div>

        <div className="random-notes">
          <h3>Random Notes</h3>
          <ul>
            {randomNotes.map((note, index) => (
              <li key={index}>
                <p>{note.text}</p>
                <p>
                  Date: {note.date}, Time: {note.time}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
