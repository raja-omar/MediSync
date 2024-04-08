import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import Calendar from "../components/Calendar";

import "../styles/App.css";

function App() {
  const [patientData, setPatientData] = useState(null);
  const [nameOfCalendar, setNameOfCalendar] = useState("No one");

  return (
    <div className="app-container">
      <Calendar
        patientData={patientData}
        setPatientData={setPatientData}
        nameOfCalendar={nameOfCalendar}
        setNameOfCalendar={setNameOfCalendar}
      />
    </div>
  );
}

export default App;
