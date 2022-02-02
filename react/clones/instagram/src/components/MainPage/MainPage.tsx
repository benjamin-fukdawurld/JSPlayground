import React from "react";
import { StoryBar, Feed, Header } from "../index";

type Props = {};

function MainPage({}: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full py-12">
        <StoryBar />
        <Feed />
      </main>
    </>
  );
}

export default MainPage;
