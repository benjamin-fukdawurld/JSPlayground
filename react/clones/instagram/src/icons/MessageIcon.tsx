import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function MessageIcon({ className, solid, color, fill, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
      fill={fill}
      viewBox="0 0 24 24"
      stroke={stroke}
    >
      <line
        fill="none"
        stroke={stroke}
        stroke-linejoin="round"
        stroke-width="2"
        x1="22"
        x2="9.218"
        y1="3"
        y2="10.083"
      ></line>
      <polygon
        fill="none"
        points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
        stroke={stroke}
        stroke-linejoin="round"
        stroke-width="2"
      ></polygon>
    </svg>
  );
}

MessageIcon.defaultProps = IconDefaultProps;

export default MessageIcon;
