import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function SearchIcon({ className, solid, color, fill, stroke }: IconProps) {
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
            d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
          <line
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="16.511"
            x2="22"
            y1="16.511"
            y2="22"
          ></line>
        </>
      ) : (
        <>
          <path
            d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></path>
          <line
            fill="none"
            stroke={stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="16.511"
            x2="22"
            y1="16.511"
            y2="22"
          ></line>
        </>
      )}
    </svg>
  );
}

SearchIcon.defaultProps = IconDefaultProps;

export default SearchIcon;
