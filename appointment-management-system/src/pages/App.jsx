import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainSection from "../components/MainSection";
import "../styles/App.css";

function App() {
  const [patientData, setPatientData] = useState(null);

  return (
    <div className="app-container">
      <Sidebar
        className="sdebar"
        setPatientData={setPatientData}
        patientData={patientData}
      />
      <MainSection className="main-section" patientData={patientData} />
    </div>
  );
}

export default App;
