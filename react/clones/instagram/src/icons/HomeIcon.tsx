import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function HomeIcon({ className, solid, color, fill, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
      fill={fill}
      viewBox="0 0 24 24"
      stroke={stroke}
    >
      {!solid ? (
        <>
          <path
            d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
            fill="none"
            stroke={stroke}
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </>
      ) : (
        <>
          <path
            d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
            fill="none"
            stroke={stroke}
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
        </>
      )}
    </svg>
  );
}

HomeIcon.defaultProps = IconDefaultProps;

export default HomeIcon;
