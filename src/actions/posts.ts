"use server";

import { prisma } from "@/db/dbConnection";
import { auth } from "@clerk/nextjs/server";

export const likePost = async (postId: string) => {
  const { userId } = await auth();

  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (existingLike) {
    const deleteLike = await prisma.like.delete({
      where: { id: existingLike.id },
    });
    console.log("deleteLike", deleteLike);
  } else {
    const createLike = await prisma.like.create({
      data: { userId, postId },
    });
    console.log("createLike", createLike);
  }

  const updatedCount = await prisma.like.count({
    where: { postId },
  });
  return { isLiked: !existingLike, likes: updatedCount, message: "Post Liked" };
};

// "use server";
// import { prisma } from "@/db/dbConnection";
// import { auth } from "@clerk/nextjs/server";

// export const likePost = async (postId: string) => {
//   const { userId } = await auth();

//   if (!userId) return null;

//   const existingLike = await prisma.like.findFirst({
//     where: { userId, postId },
//   });

//   if (existingLike) {
//     await prisma.like.delete({ where: { id: existingLike.id } });
//   } else {
//     await prisma.like.create({ data: { userId, postId } });
//   }

//   // Fetch updated count
//   const updatedCount = await prisma.like.count({
//     where: { postId },
//   });

//   return { isLiked: !existingLike, likes: updatedCount };
// };
