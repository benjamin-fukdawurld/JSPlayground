import React from "react";

import { IconDefaultProps, IconProps } from "./interfaces";

function BookmarkIcon({ className, solid, color, fill, stroke }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      color={color}
      fill={fill}
      viewBox="0 0 24 24"
    >
      {!solid ? (
        <>
          <polygon
            fill="none"
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          ></polygon>
        </>
      ) : (
        <>
          <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
        </>
      )}
    </svg>
  );
}

BookmarkIcon.defaultProps = IconDefaultProps;

export default BookmarkIcon;
