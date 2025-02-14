"use client";
import Link from "next/link";
import React from "react";
import { menuList } from "../constants/menu";
import ImageKit from "./ImageKit";
import Feed from "./Feed";
import Image from "next/image";

const LeftBar = () => {
  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link
          href="/"
          className="p-2 bg-white rounded-full hover:bg-orange-400 aspect-square "
        >
          {/* <ImageKit src="/icons/logo.svg" alt="logo" w={24} h={24} /> */}
          <Image
            src={"/general/logo.jpg"}
            alt="Logo"
            width={70}
            height={70}
            className="rounded-full  "
          />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4  xsm:hidden ">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              key={item.id}
            >
              <ImageKit
                src={`/icons/${item.icon}`}
                alt={item.name}
                w={24}
                h={24}
              />
              <span className="hidden xxl:inline">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* XSM DEVICE  START  */}
        <div className="hidden xsm:block flex-col gap-4 xsm:text-md xsm:p-0 xsm:gap-1">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4  xsm:gap-1"
              key={item.id}
            >
              <ImageKit
                src={`/icons/${item.icon}`}
                alt={item.name}
                w={20}
                h={20}
                className="xsm:text-sm xsm:p-0"
              />
              <span className="hidden xxl:inline">{item.name}</span>
            </Link>
          ))}
        </div>
        {/* XSM DEVICE  END  */}

        {/*POST BUTTON */}
        <Link
          href={"/compose/post"}
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <ImageKit src="/icons/post.svg" alt="new post" w={24} h={24} />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <Link href={"/compose/post"}>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative rounded-full overflow-hidden">
              <ImageKit
                src="/general/avatar.png"
                alt="code rookie"
                h={100}
                w={100}
                tr={true}
              />
            </div>
            <div className="hidden xxl:flex flex-col">
              <span className="font-bold">Code Rookie</span>
              <span className="text-sm text-textGray">@code_rookie</span>
            </div>
          </div>
        </Link>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  );
};

export default LeftBar;
