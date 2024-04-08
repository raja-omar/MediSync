import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import Calendar from "../components/Calendar";

import "../styles/App.css";

function App() {
  const [patientData, setPatientData] = useState(null);

  return (
    <div className="app-container">
      {/* <MainSection className="main-section" patientData={patientData} /> */}
      <Calendar patientData={patientData} setPatientData={setPatientData} />
    </div>
  );
}

export default App;
