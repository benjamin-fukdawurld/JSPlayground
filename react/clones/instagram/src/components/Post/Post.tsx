import React from "react";
import { BookmarkIcon, CommentIcon, LikeIcon, SettingsIcon, ShareIcon } from "../../icons";
import Avatar from "../Avatar/Avatar";

type Props = {};

function Post({}: Props) {
  return (
    <div className="w-full py-1">
      <div className="relative w-full px-2 pt-2 pb-4 flex flex-row justify-start items-center">
        <div className="absolute -bottom-0 left-0 h-[1px] w-full bg-gray-300" />
        <Avatar className="w-8 h-8 px-4 my-1" src="/images/avatar.jpg" active />
        <div className="flex flex-col justify-start items-start flex-grow">
          <p className="pl-2 text-[0.875rem] font-semibold leading-tight">fukdawurld</p>
          <p className="pl-2 text-[0.75rem] leading-tight">Guadeloupe</p>
        </div>
        <SettingsIcon />
      </div>

      <img
        className="w-full object-contain max-h-[60vh]"
        src="/images/post.jpg"
        alt="image caption"
      />

      <div className="px-4">
        <div className="w-full flex flex-row justify-start items-center my-2">
          <LikeIcon className="h-10 w-10 pr-4" />
          <CommentIcon className="h-10 w-10 pr-4" />
          <ShareIcon className="h-10 w-10 pr-4" />
          <div className="w-1 h-1 flex-grow" />
          <BookmarkIcon className="h-6 w-6" />
        </div>

        <p className="text-[0.875rem] font-semibold leading-tight">{999} J'aime</p>

        <p className="text-[0.85rem] leading-tight pt-2">
          <span className="font-semibold">fukdawuld</span> Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>

        <div className="flex flex-col justify-start items-start">
          <div className="flex flex-row justify-start items-center">
            <p className="text-[0.85rem] leading-tight pt-2">
              <span className="font-semibold">fukdawuld</span> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
            <LikeIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
