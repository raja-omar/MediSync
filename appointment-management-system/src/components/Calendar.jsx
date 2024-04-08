import React, { useState } from "react";
import "../styles/Calendar.css";
import ErrorModal from "./ErrorModal";
import Sidebar from "./Sidebar";

let draggedPatient;
let draggedCellId;
let deleteCellId;

const Calendar = ({ patientData, setPatientData }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  // const [blockTimeMode, setBlockTimeMode] = useState(false);
  const [cellsData, setCellsData] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleDragStart = (event, patientData, cellId) => {
    event.dataTransfer.setData("text/plain", "");
    draggedPatient = patientData;
    draggedCellId = cellId;
  };

  const handleDrop = (event, dayIndex, hour) => {
    event.preventDefault();
    const cellId = `${dayIndex}-${hour}`;
    if (!event.target.classList.contains("lightred-bg")) {
      const updatedCellsData = { ...cellsData };
      Object.keys(updatedCellsData).forEach((key) => {
        if (updatedCellsData[key] === draggedPatient) {
          delete updatedCellsData[key];
        }
      });
      updatedCellsData[cellId] = draggedPatient;
      setCellsData(updatedCellsData);
    } else {
      console.log("NUH UH");
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleConfirmDelete = () => {
    const updatedCellsData = { ...cellsData };
    delete updatedCellsData[deleteCellId];
    setCellsData(updatedCellsData);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleDeletePatient = (cellId) => {
    deleteCellId = cellId;
    setShowConfirmModal(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getNextWeekStart = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    return nextWeekStart;
  };

  const getPreviousWeekStart = () => {
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    return previousWeekStart;
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(getNextWeekStart());
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(getPreviousWeekStart());
  };

  // const handleBlockTimeToggle = () => {
  //   setBlockTimeMode(!blockTimeMode);
  // };

  const renderTimeColumn = () => {
    const timeSlots = [];
    for (let i = 9; i <= 17; i++) {
      timeSlots.push(
        <div key={i} className="time-slot">
          {i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
        </div>
      );
    }
    return <div className="time-column">{timeSlots}</div>;
  };

  const renderDays = () => {
    const currentWeek = [];
    const currentDate = new Date(currentWeekStart);

    for (let i = 0; i < 5; i++) {
      while (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const day = currentDate.getDate(); // Get the day of the month
      // const formattedDay = day < 10 ? `0${day}` : day; // Add leading zero if needed

      const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit", // Use 2-digit format for day
      });

      currentWeek.push(
        <div key={i} className="calendar-day">
          <div className="day-date">
            <h3>{formattedDate}</h3>
          </div>
          {renderCells(i)}
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentWeek;
  };

  // const handleCellClick = (event) => {
  //   if (blockTimeMode) {
  //     if (event.target.classList.contains("lightred-bg")) {
  //       event.target.classList.remove("lightred-bg");
  //     } else {
  //       event.target.classList.add("lightred-bg");
  //     }
  //   }
  // };

  const renderCells = (dayIndex) => {
    const cells = [];
    for (let i = 9; i <= 17; i++) {
      const cellId = `${dayIndex}-${i}`;
      cells.push(
        <div
          key={cellId}
          id={cellId}
          className="cell"
          onDrop={(event) => handleDrop(event, dayIndex, i)}
          onDragOver={handleDragOver}
          draggable={cellsData[cellId] ? "true" : "false"}
          onDragStart={(event) =>
            handleDragStart(event, cellsData[cellId], cellId)
          }
        >
          {cellsData[cellId] && (
            <div className="patient-card">
              <div className="patient-info">
                <h3>{cellsData[cellId].name}</h3>
                <p>Health ID: {cellsData[cellId].healthCardNumber}</p>
              </div>
              <button
                className="delete-patient-btn"
                onClick={() => handleDeletePatient(cellId)}
              >
                ❌
              </button>
            </div>
          )}
        </div>
      );
    }
    return cells;
  };

  return (
    <>
      <Sidebar
        className="sdebar"
        setPatientData={setPatientData}
        handleDragStart={handleDragStart}
      />
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousWeek} className="nav-button">
            Previous Week
          </button>
          <div className="current_doc">
            Currently seeing Dr. SDMN's Calendar
          </div>
          <button onClick={goToNextWeek} className="nav-button">
            Next Week
          </button>
          {/* <button onClick={handleBlockTimeToggle} className="nav-button">
            {blockTimeMode ? "Disable Block Time" : "Block Time"}
          </button> */}
        </div>
        <div className="calendar-body">
          {renderTimeColumn()}
          {renderDays()}
        </div>
      </div>
      {showErrorModal && <ErrorModal onClose={handleCloseErrorModal} />}
      {showConfirmModal && (
        <div className="modal-wrapper">
          <div className="modal">
            <p>Are you sure you want to delete this appointment?</p>
            <div className="modal-buttons">
              <button
                onClick={handleConfirmDelete}
                style={{ backgroundColor: "lightgreen" }}
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                style={{ backgroundColor: "lightcoral", color: "white" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calendar;
