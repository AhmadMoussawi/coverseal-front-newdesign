// VerticalBoxGroup.js
import React from "react";

interface VerticalBoxGroupProps {
  boxes: React.ReactNode[];
  width?: string;
}

const VerticalBoxGroup: React.FC<VerticalBoxGroupProps> = ({ boxes, width = "100%" }) => {
  return (
    <div className="vertical-box-group" style={{ width }}>
      {boxes.map((box, index) => (
        <div key={index} className="vertical-box">
          {box}
        </div>
      ))}
    </div>
  );
};

export default VerticalBoxGroup;
