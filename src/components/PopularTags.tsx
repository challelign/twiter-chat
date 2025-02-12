import React from "react";
import ImageKit from "./ImageKit";
import Link from "next/link";

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        {"What's "} Happening{" "}
      </h1>
      {/* Trends events */}
      <div className="flex gap-4">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          <ImageKit
            src="/general/event.png"
            alt="event"
            w={120}
            h={120}
            tr={true}
          />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-textGrayLight">Next.js vs Remit </h2>
          <span className="text-sm text-textGray"> Last Night</span>
        </div>
      </div>

      {/* topics */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm ">Technology * Trending</span>
          <ImageKit
            src="/icons/infoMore.svg"
            alt="info"
            w={16}
            h={16}
            className="cursor-pointer"
          />
        </div>
        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-textGray text-sm ">20k posts</span>
      </div>
      {/* topics */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm ">Technology * Trending</span>
          <ImageKit
            src="/icons/infoMore.svg"
            alt="info"
            w={16}
            h={16}
            className="cursor-pointer"
          />
        </div>
        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-textGray text-sm ">20k posts</span>
      </div>
      {/* topics */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm ">Technology * Trending</span>
          <ImageKit
            src="/icons/infoMore.svg"
            alt="info"
            w={16}
            h={16}
            className="cursor-pointer"
          />
        </div>
        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-textGray text-sm ">20k posts</span>
      </div>

      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;
