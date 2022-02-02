import React, { ReactNode } from "react";
import Avatar from "../Avatar/Avatar";

type Props = {
  src: string;
  caption: string;
  outline?: boolean;
  tic?: ReactNode;
};

function StoryButton({ src, caption, outline, tic }: Props) {
  const Tic =
    typeof tic === "string" ? (
      <div
        className="
      absolute -top-0 -right-0 rounded-full h-5 w-5 text-white text-sm font-semibold bg-red-700
      flex justify-center items-center
      "
      >
        {tic}
      </div>
    ) : (
      tic
    );

  return (
    <div className="flex flex-col justify-center items-center px-2">
      <div className="relative">
        <Avatar className="w-16 h-16" src={src} active={outline} />
        <>{Tic}</>
      </div>
      <p className="text-xs pt-1">{caption}</p>
    </div>
  );
}

export default StoryButton;
