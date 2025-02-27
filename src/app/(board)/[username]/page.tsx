import Link from "next/link";
import React, { use } from "react";
import ImageKit from "../../../components/ImageKit";
import Feed from "../../../components/Feed";
import { prisma } from "@/db/dbConnection";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import FollowButton from "@/components/FollowButton";
import Image from "next/image";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }

  const username = (await params).username;
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId
        ? {
            where: {
              followerId: userId,
            },
          }
        : undefined,
    },
  });

  if (!user) {
    notFound();
  }
  return (
    <div className="">
      {/* profile title */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084] ">
        <Link href={"/"}>
          <ImageKit src="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.displayName}</h1>
      </div>
      {/* info */}
      <div className="">
        {/* cover and avatar container */}
        <div className="relative w-full -z-10">
          {/* cover */}
          <div className="w-full aspect-[3/1] relative ">
            {/* <ImageKit
              src={user.cover || "/general/cover.jpg"}
              alt="back"
              w={600}
              h={200}
              tr={true}
            /> */}

            <Image
              className="h-56"
              src={user.cover || "/general/cover.jpg"}
              alt="back"
              width={600}
              height={100}
            />
          </div>
          {/* avatar */}
          {/* -translate-y-1/2  will make translate to top of y half of the height*/}
          <div className="w-1/5 aspect-square   rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            {/* <ImageKit
              src={user.img || "/general/noAvatar.png"}
              alt={user.displayName as string}
              w={100}
              h={100}
              tr={true}
            /> */}
            <Image
              src={user.img || "/general/cover.jpg"}
              alt="back"
              width={100}
              height={100}
            />
          </div>
          {/* <Link href={"/"}>
            <ImageKit src="/general/cover.jpg" alt="back" w={600} h={600} /> 
          </Link>{" "} */}
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <ImageKit src="/icons/infoMore.svg" alt="back" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <ImageKit src="icons/explore.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <ImageKit src="icons/message.svg" alt="more" w={20} h={20} />
          </div>

          {userId && (
            <FollowButton
              userId={user.id}
              isFollowed={!!user.followings.length}
            />
          )}
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <span className="text-textGray text-sm">@{user.username}</span>
          </div>
          {user.bio && <p>{user.bio}</p>}

          {/* JOB & LOCATION & DATE */}

          <div className="flex gap-4 text-textGray text-[15px]">
            {user.bio && (
              <div className="flex items-center gap-2">
                <ImageKit
                  src="icons/userLocation.svg"
                  alt="location"
                  w={20}
                  h={20}
                />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <ImageKit src="icons/date.svg" alt="date" w={20} h={20} />
              <span>
                Joined{" "}
                {new Date(user.createdAt.toString()).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </span>
            </div>
          </div>

          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followers}</span>
              <span className="text-textGray text-[15px]">Followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{user._count.followings}</span>
              <span className="text-textGray text-[15px]">Followings</span>
            </div>
          </div>
        </div>
      </div>
      <Feed userProfileId={user?.id} />
    </div>
  );
};

export default UserPage;
