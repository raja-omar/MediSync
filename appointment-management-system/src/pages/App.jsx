import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import Calendar from "../components/Calendar";

import "../styles/App.css";

function App() {
  const [patientData, setPatientData] = useState(null);
  const [docCalendar, setDocCalendar] = useState();

  return (
    <div className="app-container">
      <Calendar
        patientData={patientData}
        setPatientData={setPatientData}
        docCalendar={docCalendar}
        setDocCalendar={setDocCalendar}
      />
    </div>
  );
}

export default App;
