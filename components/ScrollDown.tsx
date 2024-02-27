import React, { useCallback } from "react";
import { Color } from "../utils/constants";
import { Arrow } from "./icons";

interface Props {
  text: string;
  target: string;
  color: Color;
}

export function ScrollDown({ text, color, target }: Props) {
  const handleClickScrollDown = useCallback(() => {
    document.getElementById(target).scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="icon-container scroll-down" onClick={handleClickScrollDown}>
      <span>{text}</span>
      <Arrow color={color} />
    </div>
  );
}
