import React from 'react';
import '../styles/ErrorModal.css'; // Import CSS for styling

const ErrorModal = ({ onClose }) => {
  return (
    <div className="modal-bg">
      <div className="modal-dialog">
        <button className="close-btn" onClick={onClose}>
          &times; 
        </button>
        <h2>Error</h2>
        <p>
          You can't book an appointment during the doctor's blocked time! Please
          choose a time when the doctor is available.
        </p>
      </div>
    </div>
  );
};

export default ErrorModal;
