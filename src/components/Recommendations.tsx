import Link from "next/link";
import React from "react";
import ImageKit from "./ImageKit";

const Recommendations = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {/* user card */}
      <div className="flex items-center justify-between">
        {/* image and user info */}
        <div className="flex gap-2 items-center ">
          <div className="relative  rounded-full overflow-hidden h-10 w-10">
            <ImageKit
              src="/general/avatar.png"
              alt="Cha T"
              w={100}
              h={100}
              tr={true}
              className="cursor-pointer "
            />
          </div>
          <div className="">
            <h1>Cha T</h1>
            <span className="text-textGray shadow-sm">@chaT</span>
          </div>
        </div>
        {/* button */}
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        {/* image and user info */}
        <div className="flex gap-2 items-center ">
          <div className="relative  rounded-full overflow-hidden h-10 w-10">
            <ImageKit
              src="/general/avatar.png"
              alt="Cha T"
              w={100}
              h={100}
              tr={true}
              className="cursor-pointer "
            />
          </div>
          <div className="">
            <h1>Cha T</h1>
            <span className="text-textGray shadow-sm">@chaT</span>
          </div>
        </div>
        {/* button */}
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>
      <div className="flex items-center justify-between">
        {/* image and user info */}
        <div className="flex gap-2 items-center ">
          <div className="relative  rounded-full overflow-hidden h-10 w-10">
            <ImageKit
              src="/general/avatar.png"
              alt="Cha T"
              w={100}
              h={100}
              tr={true}
              className="cursor-pointer "
            />
          </div>
          <div className="">
            <h1>Cha T</h1>
            <span className="text-textGray shadow-sm">@chaT</span>
          </div>
        </div>
        {/* button */}
        <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
          Follow
        </button>
      </div>

      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
