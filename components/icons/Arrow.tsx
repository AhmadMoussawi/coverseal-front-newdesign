import { Icon, IconProps } from "./Icon";

interface Props extends IconProps {
  strokeWidth?: number;
}

export function Arrow({ color, strokeWidth }: Props) {
  return (
    <Icon className="arrow" viewBox="0 0 47.54 25.39" color={color}>
      <defs>
        <style>{`.cls-1{fill:none;stroke-miterlimit:10;stroke-width:${
          strokeWidth || 1.5
        };}`}</style>
      </defs>
      <polyline className="cls-1" points="46.06 1.22 23.77 23.51 1.48 1.22" />
    </Icon>
  );
}
