import React from 'react';
import './MainSection.css'
import Calendar from './Calendar';
const MainSection = ({ patientData }) => {
  return (
    <div className="main-section">
    <Calendar />
      {patientData ? (
        <div>
          <h3>Patient Details</h3>
          <p>First Name: {patientData.firstName}</p>
          <p>Last Name: {patientData.lastName}</p>
          <p>Age: {patientData.age}</p>
          <p>Health Card Number: {patientData.healthCardNumber}</p>
        </div>
      ) : (
        <p>No patient data available</p>
      )}
    </div>
  );
};

export default MainSection;
