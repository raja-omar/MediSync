import React from 'react';
import './PatientCardStyles.css'
const PatientCard = ({ firstName, lastName, age, healthCardNumber }) => {
  return (
    <div className="patient-card">
      <h3>
        {firstName} {lastName}
      </h3>
      <p>Age: {age}</p>
      <p>Health Card Number: {healthCardNumber}</p>
    </div>
  );
};

export default PatientCard;
