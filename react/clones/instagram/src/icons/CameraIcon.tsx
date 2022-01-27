import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function CameraIcon({ className, solid, color, fill, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
      viewBox="0 0 24 24"
      stroke={stroke}
    >
      <circle
        cx="12"
        cy="13.191"
        fill="none"
        r="4.539"
        stroke={stroke}
        stroke-linejoin="round"
        stroke-width="2"
      ></circle>
      <path
        d="M18.592 21.374A3.408 3.408 0 0022 17.966V8.874a3.41 3.41 0 00-3.41-3.409h-.52a2.108 2.108 0 01-1.954-1.375 2.082 2.082 0 00-2.204-1.348h-3.824A2.082 2.082 0 007.884 4.09 2.108 2.108 0 015.93 5.465h-.52A3.41 3.41 0 002 8.875v9.091a3.408 3.408 0 003.408 3.408z"
        fill="none"
        stroke={stroke}
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
    </svg>
  );
}

CameraIcon.defaultProps = IconDefaultProps;

export default CameraIcon;
