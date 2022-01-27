import React from "react";
import { SearchIcon, HomeIcon, AddIcon, LikeIcon } from "../../icons";
import Avatar from "../Avatar";

type Props = {};

export default function NavBar({}: Props) {
  return (
    <nav className="fixed bottom-0 h-10 w-full py-2 px-4 flex flex-row justify-between items-center">
      <div className="absolute -top-0 left-0 h-[1px] w-full bg-gray-300" />
      <HomeIcon />
      <SearchIcon />
      <AddIcon />
      <LikeIcon />
      <Avatar src="https://instagram.fptp3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/38720805_2148042228600397_195101406271635456_n.jpg?_nc_ht=instagram.fptp3-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=mflt5Ko814YAX_sNhDi&edm=ALbqBD0BAAAA&ccb=7-4&oh=00_AT_fsrpCKU98RgONUZhKCeBlGytagPXVopQlxwN3xf3LhQ&oe=61F8D247&_nc_sid=9a90d6" />
    </nav>
  );
}
