import React from "react";
import Post from "../Post/Post";

type Props = {};

export default function Feed({}: Props) {
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <Post />
    </div>
  );
}
