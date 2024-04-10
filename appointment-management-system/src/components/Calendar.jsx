import React, { useState } from "react";
import "../styles/Calendar.css";
import ErrorModal from "./ErrorModal";
import Sidebar from "./Sidebar";
import "../styles/PatientCardStyles.css";
// import { startOfWeek as dateFnsStartOfWeek, endOfWeek as dateFnsEndOfWeek, isWithinInterval } from 'date-fns';

let draggedPatient;
let draggedCellId;
let deleteCellId;

// docCalendar will have name for the calendar name, department, time off sched, minimap as well
const Calendar = ({
  patientData,
  setPatientData,
  docCalendar,
  setDocCalendar,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  // const [blockTimeMode, setBlockTimeMode] = useState(false);
  const [allWeeksData, setAllWeeksData] = useState({});
  const [allData, setAllData] = useState([]);
  const weekData = allData.filter(appointment => isSameWeek(appointment.date, currentWeekStart));
  const defaultCellsData = {};
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
    const nextWeekStart = getNextWeekStart();
    setAllWeeksData({
      ...allWeeksData,
      [currentWeekStart.toISOString()]: cellsData,
    });
    setCurrentWeekStart(nextWeekStart);
    setCellsData(allWeeksData[nextWeekStart.toISOString()] || defaultCellsData);
  };

  
  const goToPreviousWeek = () => {
    const previousWeekStart = getPreviousWeekStart();
    setAllWeeksData({
      ...allWeeksData,
      [currentWeekStart.toISOString()]: cellsData,
    });
    setCurrentWeekStart(previousWeekStart);
    setCellsData(allWeeksData[previousWeekStart.toISOString()] || defaultCellsData);
  };

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

  const renderCells = (dayIndex) => {
    const cells = [];
    for (let i = 9; i <= 17; i++) {
      const cellId = `${dayIndex}-${i}`;
      let isTimeOff = false;
      if (docCalendar) {
        isTimeOff = docCalendar.timeOff.includes(cellId); // Check if cellId is in timeOff list
      } else {
        isTimeOff = false;
      }

      const cellClassName = isTimeOff ? "cell lightred-bg" : "cell";

      cells.push(
        <div
          key={cellId}
          id={cellId}
          className={cellClassName}
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
  
  const jumpToToday = () => {
    setCurrentWeekStart(new Date());
  };

  return (
    <>
      <Sidebar
        className="sdebar"
        setPatientData={setPatientData}
        handleDragStart={handleDragStart}
        setDocCalendar={setDocCalendar}
      />
      <div className="calendar">
        <div className="calendar-header">
          <div className="current_doc">
            Currently seeing {docCalendar ? docCalendar.name : "No One"}&apos;s
            Calendar
          </div>
          <button onClick={jumpToToday} className="nav-button">
            Jump to today
          </button>

          <button onClick={goToPreviousWeek} className="nav-button">
            Previous Week
          </button>
          <button onClick={goToNextWeek} className="nav-button">
            Next Week
          </button>
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
