import React from 'react';
import PatientCard from './PatientCard';
const PatientCardContainer = ({ patientData }) => {
  return (
    <div className="patient-card-container">
      <h3>Current Patient:</h3>
      {patientData && <PatientCard {...patientData} />}
    </div>
  );
};

export default PatientCardContainer;
