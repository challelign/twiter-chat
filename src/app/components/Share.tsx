import Image from "next/image";
import React from "react";
import ImageKit from "./ImageKit";

const Share = () => {
  return (
    <div className="p-4 flex gap-4">
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <ImageKit src={"/general/avatar.png"} alt="" w={100} h={100} />
      </div>
      {/* Others */}
      <div className="flex-1 flex flex-col gap-4  ">
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="border-b-red-200/15 border-b-2  bg-transparent outline-none placeholder:text-textGray text-xl "
        />
        {/* PREVIEW IMAGE */}

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              className="hidden"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <ImageKit
                src="icons/image.svg"
                alt=""
                w={20}
                h={20}
                className="cursor-pointer"
              />
            </label>
            <ImageKit
              src="icons/gif.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/poll.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/emoji.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/schedule.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/location.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
          </div>
          <button className="bg-white text-black font-bold rounded-full py-2 px-4">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
