import React, { useState } from "react";
import "../styles/Calendar.css";
import ErrorModal from "./ErrorModal";

let draggedPatient;
let draggedCellId;

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [blockTimeMode, setBlockTimeMode] = useState(false);
  const [cellsData, setCellsData] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false); // State to manage the visibility of the error modal

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
      // Remove the patient card from its previous location if it exists
      const updatedCellsData = { ...cellsData };
      Object.keys(updatedCellsData).forEach((key) => {
        if (updatedCellsData[key] === draggedPatient) {
          delete updatedCellsData[key];
        }
      });

      // Update the new cell with the patient card
      updatedCellsData[cellId] = draggedPatient;
      setCellsData(updatedCellsData);
    } else {
      console.log("NUH UH");
      setShowErrorModal(true);

      /* 

      THROW UP A MODAL IN THIS CASE 
      
      */
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const getNextWeekStart = () => {
    const nextWeekStart = new Date(currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7); // Add 7 days for the next week
    return nextWeekStart;
  };

  const getPreviousWeekStart = () => {
    const previousWeekStart = new Date(currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7); // Subtract 7 days for the previous week
    return previousWeekStart;
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(getNextWeekStart());
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(getPreviousWeekStart());
  };

  const handleBlockTimeToggle = () => {
    setBlockTimeMode(!blockTimeMode);
  };

  const renderTimeColumn = () => {
    const timeSlots = [];
    for (let i = 9; i <= 17; i++) {
      // Start at 9 AM and end at 5 PM
      timeSlots.push(
        <div key={i} className="time-slot">
          {i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
        </div>
      );
    }
    // this is so clutch
    // const cellHeight = document.querySelector('.day-date').offsetHeight;

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
      const formattedDay = day < 10 ? `0${day}` : day; // Add leading zero if needed

      const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      currentWeek.push(
        <div key={i} className="calendar-day">
          <div className="day-date">
            <h3>{formattedDate.replace(day, formattedDay)}</h3>
          </div>
          {renderCells(i)}
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentWeek;
  };

  const handleDeletePatient = (cellId) => {
    const updatedCellsData = { ...cellsData };
    delete updatedCellsData[cellId];
    setCellsData(updatedCellsData);
  };

  const handleCellClick = (event) => {
    if (blockTimeMode) {
      if (event.target.classList.contains("lightred-bg")) {
        event.target.classList.remove("lightred-bg");
      } else {
        event.target.classList.add("lightred-bg");
      }
    }
  };
  const renderCells = (dayIndex) => {
    const cells = [];
    for (let i = 9; i <= 17; i++) {
      // Start at 9 AM and end at 5 PM
      const cellId = `${dayIndex}-${i}`;
      cells.push(
        <div
          key={cellId}
          id={cellId}
          className="cell"
          onClick={(event) => handleCellClick(event)}
          onDrop={(event) => handleDrop(event, dayIndex, i)}
          onDragOver={handleDragOver}
          draggable={cellsData[cellId] ? "true" : "false"} // Enable dragging only if cell contains patient
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
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={goToPreviousWeek} className="nav-button">
            Previous Week
          </button>
          <div className="toggle-block-time">
            <label>{blockTimeMode ? "Disable Block Time" : "Block Time"}</label>
            <label className="switch">
              <input
                type="checkbox"
                id="read"
                name="read"
                checked={blockTimeMode}
                onChange={handleBlockTimeToggle}
              />
              <span className="slider"></span>
            </label>
          </div>

          <button onClick={goToNextWeek} className="nav-button">
            Next Week
          </button>
        </div>
        <div className="calendar-body">
          {renderTimeColumn()}
          {renderDays()}
        </div>
      </div>
      {showErrorModal && <ErrorModal onClose={handleCloseErrorModal} />}{" "}
    </>
  );
};

export default Calendar;
