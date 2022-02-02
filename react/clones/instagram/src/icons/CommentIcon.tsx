import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function CommentIcon({ className, solid, color, fill, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill={fill}
      viewBox="0 0 24 24"
      stroke={stroke}
    >
      <path
        d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="2"
      ></path>
    </svg>
  );
}

CommentIcon.defaultProps = IconDefaultProps;

export default CommentIcon;
