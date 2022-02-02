import React from "react";
import { ReactNode } from "react";
import UserIcon from "../../icons/UserIcon";

type Props = {
  className?: string;
  children?: ReactNode;
  src?: string;
  color?: string;
  borderColor?: string;
  active?: boolean;
};

function Avatar({ className, children, src, color, active, borderColor }: Props) {
  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      <div
        className={`absolute w-[105%] h-[105%] rounded-full`}
        style={{ background: active ? borderColor : "transparent" }}
      />
      <div
        className="absolute rounded-full w-full h-full overflow-hidden flex justify-center items-center text-white border-2 border-white"
        style={{ background: color }}
      >
        {src ? (
          <img className="w-full h-full flex" src={src} alt="avatar" />
        ) : (
          <div className={`w-10/12 h-10/12 bg-[${color}] py-1 flex justify-center items-center`}>
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
  borderColor: "linear-gradient(45deg, orange, purple 50%)",
};

export default Avatar;
