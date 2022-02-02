import React, { ReactNode } from "react";
import { StoryBar, Feed } from "../index";
import { HeaderContainer } from "../Header";
type Props = {};

interface ActivityListProps {
  children?: ReactNode;
  className?: string;
  title: ReactNode;
}

function ActivityList({ className, children, title }: ActivityListProps) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <div className="absolute -bottom-0 left-0 h-[1px] w-full bg-gray-300" />
      <h2 className="font-semibold text-sm pl-4">{title}</h2>
      {children}
    </div>
  );
}

ActivityList.defaultProps = {
  className: "relative w-full",
};

function ActivityPage({}: Props) {
  return (
    <>
      <HeaderContainer>
        <h1 className="w-full h-full flex justify-center items-center font-semibold">Activité</h1>
      </HeaderContainer>
      <main className="min-h-screen w-full py-12">
        <ActivityList title="Aujourd'hui"></ActivityList>
        <ActivityList title="Cette semaine"></ActivityList>
        <ActivityList title="Ce mois-ci"></ActivityList>
        <ActivityList title="Plus tôt"></ActivityList>
      </main>
    </>
  );
}

export default ActivityPage;
