import React from "react";

import StoryButton from "./StoryButton";

type Props = {};

export default function StoryBar({}: Props) {
  const AddTic = (
    <div
      className="
        absolute -bottom-0 -right-0 rounded-full h-5 w-5 text-white text-md font-bold
      bg-blue-400 border-[1px] border-white flex justify-center items-center
      "
    >
      +
    </div>
  );

  return (
    <div className="relative h-24 w-full bg-gray-50 flex flex-row justify-start items-center px-2 overflow-scroll no-scrollbar">
      <div className="absolute -bottom-0 left-0 h-[1px] w-full bg-gray-300" />
      <StoryButton src="/images/avatar.jpg" caption="Votre Story" tic={AddTic} />
      {[...Array(10)].map((_, index) => (
        <StoryButton key={index} src="/images/avatar.jpg" caption="Story" outline />
      ))}
    </div>
  );
}
