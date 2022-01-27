import React from "react";
import { ReactNode } from "react";
import UserIcon from "../../icons/UserIcon";

type Props = {
  className?: string;
  children?: ReactNode;
  src?: string;
  color?: string;
  active?: boolean;
};

function Avatar({ className, children, src, color, active }: Props) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div
        className="absolute w-full h-full border-2 rounded-full"
        style={{
          borderColor: active ? color : "transparent",
        }}
      />
      <div
        className="absolute rounded-full w-10/12 h-10/12 flex justify-center items-center text-white"
        style={{ backgroundColor: color }}
      >
        {src ? (
          <img className="w-full h-full flex" src={src} alt="avatar" />
        ) : (
          <div className={`w-full h-full bg-[${color}] py-1 flex justify-center items-center`}>
            <UserIcon className="h-10/12 w-10/12" solid color="#C0C0C0" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  className: "h-6 w-6",
  color: "#DDD",
};

export default Avatar;
