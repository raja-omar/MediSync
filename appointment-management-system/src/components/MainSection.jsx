import React from "react";
import "../styles/MainSection.css";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainSection = ({ patientData, setPatientData }) => {
  return (
    <div className="main-section">
      <Sidebar className="sdebar" setPatientData={setPatientData} />
      <Calendar />
      {/* {patientData ? (
        <div>
          <h3>Patient Details</h3>
          <p>First Name: {patientData.firstName}</p>
          <p>Last Name: {patientData.lastName}</p>
          <p>Age: {patientData.age}</p>
          <p>Health Card Number: {patientData.healthCardNumber}</p>
        </div>
      ) : (
        <p>No patient data available</p>
      )} */}
    </div>
  );
};

export default MainSection;
