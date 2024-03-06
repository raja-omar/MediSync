import React, { useState, useEffect, useRef } from "react";

const PatientCard = ({ patientData }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const x = e.clientX - position.x;
      const y = e.clientY - position.y;

      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX - cardRef.current.getBoundingClientRect().left;
    const offsetY = e.clientY - cardRef.current.getBoundingClientRect().top;
    setPosition({ x: offsetX, y: offsetY });
  };

  return (
    <div
      ref={cardRef}
      className="draggable-patient-card"
      style={{
        position: "absolute",
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        border: "1px solid #ccc",
        padding: "8px",
        backgroundColor: "#fff",
      }}
      onMouseDown={handleMouseDown}
    >
      <h2>
        {patientData.firstName} {patientData.lastName}
      </h2>
    </div>
  );
};

export default PatientCard;
