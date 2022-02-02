import React from "react";
import { SearchIcon, HomeIcon, AddIcon, LikeIcon } from "../../icons";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

type Props = {};

export default function NavBar({}: Props) {
  const userName = "fukdawurld";

  return (
    <nav className="fixed bottom-0 h-10 w-full py-2 px-4 flex flex-row justify-between items-center bg-white">
      <div className="absolute -top-0 left-0 h-[1px] w-full bg-gray-300" />

      <Link to="/">
        <HomeIcon />
      </Link>
      <Link to="/search">
        <SearchIcon />
      </Link>
      <Link to="/post">
        <AddIcon />
      </Link>
      <Link to="/accounts/activity">
        <LikeIcon />
      </Link>
      <Link to={`/${userName}`}>
        <Avatar src="/images/avatar.jpg" />
      </Link>
    </nav>
  );
}
