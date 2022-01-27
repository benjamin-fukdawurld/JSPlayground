import React from "react";

import { AddStoryButton, HomeButton, MessageButton } from "./index";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="flex flex-row justify-between items-center py-[0.25rem] px-4 h-12 w-full fixed z-10 bg-white">
      <div className="absolute -bottom-0 left-0 h-[1px] w-full bg-gray-300" />
      <AddStoryButton />
      <HomeButton />
      <MessageButton />
    </div>
  );
}
