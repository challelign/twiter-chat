import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db/dbConnection";
import Image from "next/image";

const Recommendations = async () => {
  const { userId } = await auth();

  if (!userId) return;

  const followingIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followingUserId = followingIds.map((f) => f.followingId);

  const friendRecommendation = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followingUserId },
      followings: { some: { followerId: { in: followingUserId } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  });

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {/* user card */}
      {friendRecommendation.map((friend) => (
        <div className="flex items-center justify-between" key={friend.id}>
          {/* image and user info */}
          <div className="flex gap-2 items-center ">
            <div className="relative  rounded-full overflow-hidden h-7 w-7 text-sm  ">
              {/* <ImageKit
                src="/general/avatar.png"
                alt="Cha T"
                w={100}
                h={100}
                tr={true}
                className="cursor-pointer "
              /> */}

              <Image
                src={(friend.img as string) || "/general/avatar.png"}
                alt={friend.username}
                width={40}
                height={40}
              />
            </div>
            <div className="">
              <h1>{friend.displayName}</h1>
              <span className="text-textGray shadow-sm text-sm">
                @{friend.username}
              </span>
            </div>
          </div>
          {/* button */}
          <button className=" text-sm py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}

      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
