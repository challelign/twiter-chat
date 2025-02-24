"use server";
import { z } from "zod";
import { prisma } from "@/db/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { error } from "console";

const getUserId = async () => {
  const { userId } = await auth();
  return userId;
};

//  # MORE RE-USABLE AND CLEAN
/* 
export const likePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
    const updatedCount = await prisma.like.count({
      where: { postId },
    });
    return {
      isLiked: false,
      likes: updatedCount,
      message: "Post Liked",
    };
  } else {
    await prisma.like.create({
      data: { userId, postId },
    });
    const updatedCount = await prisma.like.count({
      where: { postId },
    });
    return {
      isLiked: true,
      likes: updatedCount,
      message: "Post Liked",
    };
  }
};

export const rePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  const existingRePost = await prisma.post.findFirst({
    where: {
      userId: userId,
      rePostId: postId,
    },
  });

  if (existingRePost) {
    await prisma.post.delete({
      where: { id: existingRePost.id },
    });
    const updatedCount = await prisma.post.count({
      where: { rePostId: postId },
    });

    return {
      reRost: updatedCount,
      isRePosted: false,
      message: "Post Re-posted",
    };
  } else {
    await prisma.post.create({
      data: { userId, rePostId: postId },
    });
    const updatedCount = await prisma.post.count({
      where: { rePostId: postId },
    });

    return {
      reRost: updatedCount,
      isRePosted: true,
      message: "Post Re-posted",
    };
  }
};

export const savePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  const existingSavedPost = await prisma.savedPosts.findFirst({
    where: {
      userId: userId,
      postId,
    },
  });

  if (existingSavedPost) {
    await prisma.savedPosts.delete({
      where: { id: existingSavedPost.id },
    });
    const updatedCount = await prisma.savedPosts.count({
      where: { postId },
    });
    return {
      reRost: updatedCount,
      isRePosted: false,
      message: "You delete the post",
    };
  } else {
    await prisma.savedPosts.create({
      data: { userId, postId },
    });
    const updatedCount = await prisma.savedPosts.count({
      where: { postId },
    });
    return {
      reRost: updatedCount,
      isRePosted: true,
      message: "You saved the post",
    };
  }
};

*/

//  # MORE RE-USABLE AND CLEAN FOR THE ABOVE CODE IS
const getUpdatedCount = async (
  id: string,
  model: any,
  isRePost: boolean = false
) => {
  return await model.count({
    where: isRePost ? { rePostId: id } : { postId: id },
  });
};

const toggleLike = async (userId: string, postId: string) => {
  const existingLike = await prisma.like.findFirst({
    where: { userId, postId },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
    return {
      isLiked: false,
      likes: await getUpdatedCount(postId, prisma.like),
      message: "Post Unliked",
    };
  } else {
    await prisma.like.create({ data: { userId, postId } });
    return {
      isLiked: true,
      likes: await getUpdatedCount(postId, prisma.like),
      message: "Post Liked",
    };
  }
};

const toggleRePost = async (userId: string, postId: string) => {
  const existingRePost = await prisma.post.findFirst({
    where: { userId, rePostId: postId },
  });

  console.log(postId);
  if (existingRePost) {
    await prisma.post.delete({ where: { id: existingRePost.id } });
    return {
      isRePosted: false,
      rePosts: await getUpdatedCount(postId, prisma.post, true),
      message: "Post Unreposted",
    };
  } else {
    await prisma.post.create({ data: { userId, rePostId: postId } });
    return {
      isRePosted: true,
      rePosts: await getUpdatedCount(postId, prisma.post, true),
      message: "Post Reposted",
    };
  }
};

const toggleSavePost = async (userId: string, postId: string) => {
  const existingSavedPost = await prisma.savedPosts.findFirst({
    where: { userId, postId },
  });

  if (existingSavedPost) {
    await prisma.savedPosts.delete({ where: { id: existingSavedPost.id } });
    return {
      isSaved: false,
      savedPostCount: await getUpdatedCount(postId, prisma.savedPosts),
      message: "Post Unsaved",
    };
  } else {
    await prisma.savedPosts.create({ data: { userId, postId } });
    return {
      isSaved: true,
      savedPostCount: await getUpdatedCount(postId, prisma.savedPosts),
      message: "Post Saved",
    };
  }
};

export const likePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  return await toggleLike(userId, postId);
};

export const rePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  return await toggleRePost(userId, postId);
};

export const savePost = async (postId: string) => {
  const userId = await getUserId();
  if (!userId) return;

  return await toggleSavePost(userId, postId);
};

// Define the return type for the addComment function
type CommentActionResult = {
  success: boolean;
  error: boolean;
  message: string;
};

export const addComment = async (
  prevState: { success: boolean; error: boolean; message: string },
  formData: FormData
): Promise<CommentActionResult> => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: true, message: "User not authenticated." };
  }
  const postId = formData.get("postId");
  const username = formData.get("username");
  const desc = formData.get("desc");

  const Comment = z.object({
    postId: z.string({
      message: "Post Id is required",
    }),
    desc: z
      .string()
      .min(1, "Description is required.")
      .max(200, "Description must be 200 characters or less."),
  });

  const validatedFields = Comment.safeParse({
    parentPostId: postId,
    desc,
  });

  console.log(postId);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    //  return { success: false, error: true, message: validatedFields.error.errors[0].message };
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        error: true,
        message: validatedFields.error.errors[0].message,
      };
    }
  }

  try {
    await prisma.post.create({
      data: {
        ...validatedFields.data,
        userId,
      },
    });
    revalidatePath(`/${username}/status/${postId}`);
    return {
      success: true,
      error: false,
      message: "Comment added successfully.",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      error: true,
      message: "Something went wrong, while adding the comment.",
    };
  }
};
