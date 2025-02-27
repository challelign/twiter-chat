import Link from "next/link";
import React from "react";
import { menuList } from "../constants/menu";
import ImageKit from "./ImageKit";
import Feed from "./Feed";
import Image from "next/image";
import Socket from "./Socket";
import Notification from "./Notification";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const LeftBar = async () => {
  const user = await currentUser();
  // const { user } = useUser();

  console.log(user);
  console.log(user?.imageUrl);
  if (!user) {
    return (
      <>
        <div className="flex items-center justify-center h-full text-center">
          Loading ...
        </div>
      </>
    );
  }

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-4">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <Link
          href="/"
          className="mx-3 bg-white rounded-full hover:bg-orange-400 aspect-square "
        >
          {/* <ImageKit src="/icons/logo.svg" alt="logo" w={24} h={24} /> */}
          <Image
            src={"/general/logo.jpg"}
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full  "
          />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col gap-4  xsm:hidden ">
          {menuList.map((item, i) => (
            <div key={item.id || i}>
              {i === 2 && user && (
                <div className="custom_item">
                  <Notification />
                </div>
              )}
              <Link
                href={item.link}
                className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              >
                <ImageKit
                  src={`/icons/${item.icon}`}
                  alt={item.name}
                  w={24}
                  h={24}
                />
                <span className="hidden xxl:inline">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
        {/* XSM DEVICE  START  */}
        <div className="hidden xsm:block flex-col gap-4 xsm:text-md xsm:p-0 xsm:gap-1">
          {menuList.map((item, i) => (
            <div key={item.id || i}>
              {i === 2 && user && (
                <div className="custom_item">
                  <Notification />
                </div>
              )}
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
            </div>
          ))}

          {/* XSM DEVICE  END  */}

          {/*POST BUTTON */}
          <Link
            href={"/compose/post"}
            className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
          >
            <ImageKit src="/icons/post.svg" alt="new post" w={15} h={15} />
          </Link>
          <Link
            href="/compose/post"
            className="hidden xxl:block bg-white text-black rounded-full font-bold py-1 px-20"
          >
            Post
          </Link>
        </div>
        {/* USER */}
        <div className=" flex items-center justify-between">
          <Link href={`${user?.username}`}>
            <div className="flex items-center gap-2 ">
              <div className="w-10 h-10 relative rounded-full overflow-hidden   ">
                {user?.imageUrl && (
                  <Image
                    src={user?.imageUrl || "/general/logo.jpg"}
                    alt="code rookie"
                    width={50}
                    height={50}
                    className="rounded-full  "
                    priority
                  />
                )}
              </div>

              <div className="hidden xxl:flex flex-col">
                <span className="font-bold">
                  {user.emailAddresses[0].emailAddress}
                </span>
                <span className="text-sm text-textGray">@{user?.username}</span>
              </div>
            </div>
          </Link>

          <div className="hidden xxl:block cursor-pointer font-bold">...</div>
        </div>
        <span className="text-lg text-textGray   flex-col font-bold block xsm:block sm:block md:block lg:block  xl:hidden">
          @{user?.username}
        </span>
        {/*  */}
      </div>
      <Socket />
    </div>
  );
};

export default LeftBar;
