import { Color } from "../../utils/constants";

export interface IconProps {
  color: Color;
}

interface Props extends IconProps {
  viewBox: string;
  className?: string;
  children: React.ReactNode;
}

export function Icon({ color, viewBox, children, className }: Props) {
  return (
    <svg
      className={`icon ${className ? className : ""}`}
      viewBox={viewBox}
      data-color={color}
    >
      {children}
    </svg>
  );
}
