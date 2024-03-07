import React, { useState } from 'react';
import DoctorSidebar from '../components/DoctorSidebar';
import MainSection from '../components/MainSection';
import '../styles/App.css';

function App() {
  const [patientData, setPatientData] = useState(null);

  return (
    <div className="app-container">
      <DoctorSidebar className="sdebar" setPatientData={setPatientData} />
      <MainSection className="main-section" patientData={patientData} />
    </div>
  );
}

export default App;
