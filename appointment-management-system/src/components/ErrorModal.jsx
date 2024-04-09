// import React from "react";
// import "../styles/ErrorModal.css";

// const ErrorModal = ({ onClose }) => {
//   return (
//     <div className="modal-bg">
//       <div className="modal-dialog">
//         <button className="close-btn" onClick={onClose}>
//           &times;
//         </button>
//         <h2>Error</h2>
//         <p>
//           You can't book an appointment during the doctor's blocked time! Please
//           choose a time when the doctor is available.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ErrorModal;

import React from "react";
import "../styles/ErrorModal.css";

const ErrorModal = ({ onClose }) => {
  return (
    <div className="modal-bg">
      <div className="modal-dialog">
        <div className="error-icon">&#9888;</div>
        <h2>Error</h2>
        <p>
          You can't book an appointment during the doctor's blocked time! Please
          choose a time when the doctor is available.
        </p>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
