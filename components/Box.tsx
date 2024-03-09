// Box.js
import React, { useEffect, useState } from "react";

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
  const [boxWidth, setBoxWidth] = useState(width || "280px"); // Default to provided width or 280px
  //const [boxHeight, setBoxHeight] = useState(height || "100px"); // Default to provided height or 100px

  useEffect(() => {
    const handleResize = () => {
      // Update width based on screen size
    //   setBoxWidth(window.innerWidth > 1200 ? "280px" : "200px");
        if (window.innerWidth < 800) {
            setBoxWidth("160px");
        } else if (window.innerWidth < 1500) {
            setBoxWidth("200px");
        } else {
            setBoxWidth("280px");
        }
    };

    // Initial call to set width
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const boxStyle: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    fontSize,
    height,
    width: boxWidth,
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
