import { prisma } from "@/db/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  //   const { userId } = await auth();
  //   if (!userId) {
  //     return NextResponse.json(
  //       { message: "You are not authorized" },
  //       { status: 403 }
  //     );
  //   }

  const userId = "user_2t2BK5d9RJDT2nkqTimahEW7zJj";
  if (!userId) {
    return NextResponse.json(
      { message: "You are not authorized" },
      { status: 403 }
    );
  }
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("cursor");
  const LIMIT = 3;
  const userProfileId = searchParams.get("user");
  const followingsSelect = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  // TO SELECT IDS ONLY

  const idsSelect = followingsSelect.map((f) => f.followingId);
  // alternative one

  const whereCondition = userProfileId
    ? {
        parentPostId: null,
        userId: userProfileId,
      }
    : {
        parentPostId: null,
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
  const whereCondition2 =
    userProfileId !== "undefined"
      ? {
          parentPostId: null,
          userId: userProfileId as string,
        }
      : {
          parentPostId: null,
          userId: {
            in: [userId, ...idsSelect],
          },
        };

  // console.log("[whereCondition2]", whereCondition2);

  //   const posts = await prisma.post.findMany({ where: whereCondition2 }); //OR
  const posts = await prisma.post.findMany({
    where: whereCondition2,
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
      rePost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
        },
      },
    },
    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
  });

  const totalPosts = await prisma.post.count({ where: whereCondition2 });
  const hasMore = Number(page) * LIMIT < totalPosts;

  // await new Promise((resolve) => setTimeout(resolve, 6000)); // To load after 6 seconds
  console.log("[posts]", { totalCount: totalPosts, hasMore, posts });
  return Response.json({ totalCount: totalPosts, hasMore, posts });
}
