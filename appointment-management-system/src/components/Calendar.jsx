import React, { useState } from 'react';
import '../styles/Calendar.css';

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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

  const renderDays = () => {
    const currentWeek = [];
    const currentDate = new Date(currentWeekStart);

    currentWeek.push(
      <div key="times" className="time-column">
        {renderTimes()}
      </div>
    );

    for (let i = 0; i < 5; i++) {
      // Loop only for 5 days (Mon-Fri)
      // Skip Saturday and Sunday
      while (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      currentWeek.push(
        <div key={i} className="calendar-day">
          <div className="day-date">
            <h3>{formattedDate}</h3>
          </div>
          {renderCells()}
        </div>
      );

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentWeek;
  };


  const renderTimes = () => {
    const times = [];
    for (let i = 8; i <= 17; i++) {
      const timeLabel = i < 10 ? `0${i}:00` : `${i}:00`; // Format time label
      times.push(
        <div key={i} className="time-cell">
          <div className="time-label">{timeLabel}</div>
        </div>
      );
    }
    return times;
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 8; i <= 17; i++) {
      cells.push(
        <div key={i} className="cell">
          {/* cells added here*/}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousWeek} className="nav-button">
          Previous Week
        </button>
        <button onClick={goToNextWeek} className="nav-button">
          Next Week
        </button>
      </div>
      <div className="calendar-body">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
