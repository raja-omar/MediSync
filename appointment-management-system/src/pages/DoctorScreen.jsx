import React, { useState } from "react";
import DoctorSidebar from "../components/DoctorSidebar";
import DocCalendar from "../components/DoctorCalendar";

import "../styles/App.css";

function App() {
  const [patientData, setPatientData] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="app-container">
      <DoctorSidebar
        className="sdebar"
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
      {!isFullScreen && (
        <DocCalendar className="main-section" setPatientData={setPatientData} />
      )}
    </div>
  );
}

export default App;
