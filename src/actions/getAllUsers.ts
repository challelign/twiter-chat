"user server";
import { prisma } from "@/db/dbConnection";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  console.log("[USERS]", users);
  return users;
};
export const getAllPosts = async () => {
  const post = await prisma.post.findMany({
    include: {
      comments: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              img: true, // Include user profile image
            },
          },
        },
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              img: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          displayName: true,
          img: true,
        },
      },
    },
  });

  // console.log("[POSTS]", post);
  return post;
};

getAllUsers();
getAllPosts();
//  ## TO RUN THE ABOVE CODE AND TO SEE IN THE TERMINAL
// npx tsx src/actions/getAllUsers.ts
