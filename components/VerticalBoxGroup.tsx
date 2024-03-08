// VerticalBoxGroup.js
import React from "react";

interface VerticalBoxGroupProps {
  boxes: React.ReactNode[];
}

const VerticalBoxGroup: React.FC<VerticalBoxGroupProps> = ({ boxes }) => {
  return (
    <div className="vertical-box-group">
      {boxes.map((box, index) => (
        <div key={index} className="vertical-box-group-row">
          {box}
        </div>
      ))}
    </div>
  );
};

export default VerticalBoxGroup;
