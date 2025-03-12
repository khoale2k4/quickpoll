import React from "react";

const CustomDot = ({ cx, cy, payload, selectedDate, onClick }) => {
    const date = new Date(selectedDate);
    const isSelected = payload.day === date.getDate();
    return (
        <circle
            cx={cx}
            cy={cy}
            r={isSelected ? 6 : 4}
            fill={isSelected ? "red" : "#66C2FF"}
            onClick={() => {
                console.log("Dot clicked:", payload);
                onClick(payload);
            }}
            style={{ cursor: "pointer", pointerEvents: "all" }}
        />
    );
};

export default CustomDot;
