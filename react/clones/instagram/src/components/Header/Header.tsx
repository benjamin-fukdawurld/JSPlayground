import React, { ReactNode } from "react";

import { AddStoryButton, HomeButton, MessageButton } from "./index";

type Props = {
  children?: ReactNode;
};

export function HeaderContainer({ children }: Props) {
  return (
    <div className="flex flex-row justify-between items-center py-[0.25rem] px-4 h-12 w-full fixed z-10 bg-white">
      <div className="absolute -bottom-0 left-0 h-[1px] w-full bg-gray-300" />
      {children}
    </div>
  );
}

export default function Header({}: Props) {
  return (
    <HeaderContainer>
      <AddStoryButton />
      <HomeButton />
      <MessageButton />
    </HeaderContainer>
  );
}
