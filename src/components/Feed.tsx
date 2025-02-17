import React from "react";
import Post from "./Post";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db/dbConnection";

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();
  if (!userId) return;

  const followingsSelect = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });
  console.log("[followings]", followingsSelect);

  // TO SELECT IDS ONLY

  const idsSelect = followingsSelect.map((f) => f.followingId);
  console.log("[idsSelect]", idsSelect);
  // alternative one

  const whereCondition = userProfileId
    ? {
        userId: userProfileId,
      }
    : {
        userId: {
          in: [
            userId,
            ...(
              await prisma.follow.findMany({
                where: { followerId: userId },
                select: { followingId: true },
              })
            ).map((follow) => follow.followingId),
          ],
        },
      };

  // console.log("[whereCondition]", whereCondition);

  // alternative two
  const whereCondition2 = userProfileId
    ? {
        parentPostId: null,
        userId: userProfileId,
      }
    : {
        // userId: {
        //   in: [userId, ...followingsSelect.map((follow) => follow.followingId)],
        // },
        parentPostId: null,
        userId: {
          in: [userId, ...idsSelect],
        },
      };

  // console.log("[whereCondition2]", whereCondition2);

  const posts = await prisma.post.findMany({ where: whereCondition2 }); //OR
  // const posts = await prisma.post.findMany({ where: whereCondition });
  console.log("[postsLength]", posts?.length);

  console.log("[posts]", posts);

  return (
    <div className="">
      {posts.map((post) => (
        <div className="" key={post.id}>
          <Post />
        </div>
      ))}
    </div>
  );
};

export default Feed;
