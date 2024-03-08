// Box.js
import React from "react";

interface BoxProps {
  content?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  height?: string;
  width?: string;
  textPosition?: "top" | "bottom"; // New prop for text position
}

const Box: React.FC<BoxProps> = ({
  content,
  backgroundColor,
  textColor,
  fontSize,
  height,
  width,
  textPosition = "bottom", // Default to bottom
}) => {
  const boxStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    fontSize,
    height,
    width,
    overflow: "hidden",
    position: "relative",
  };

  const boxContentStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    marginTop: textPosition === "top" ? "10%" : "auto", // Adjust margin-top based on textPosition
    marginBottom: textPosition === "bottom" ? "auto" : "0", // Adjust margin-bottom based on textPosition
  };

  if (textPosition === "top") {
    boxContentStyle.top = "0";
  } else if (textPosition === "bottom") {
    boxContentStyle.bottom = "0";
  }

  return (
    <div className="box" style={boxStyle}>
      {content && <div className="box-content" style={boxContentStyle}>{content}</div>}
    </div>
  );
};

export default Box;
