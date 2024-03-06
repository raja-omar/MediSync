import React from "react";
import "../styles/PatientCardStyles.css";
// const PatientCard = ({ patientData }) => {
//   return (
//     <div className="patient-card">
//       <h3>
//         {patientData.firstName} {patientData.lastName}
//       </h3>
//       <p>Age: {patientData.age}</p>
//       <p>Health ID: {patientData.healthCardNumber}</p>
//     </div>
//   );
// };

const PatientCard = ({ patientData }) => {
  return (
    <div className="patient-card">
      <h2>
        {patientData.firstName} {patientData.lastName}
      </h2>
      {/* Add more patient details here */}
    </div>
  );
};

export default PatientCard;
