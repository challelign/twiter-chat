import Comments from "@/components/Comments";
import ImageKit from "@/components/ImageKit";
import Post from "@/components/Post";
import Link from "next/link";
import { prisma } from "@/db/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const StatusPage = async ({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) => {
  const { userId } = await auth();

  if (!userId) {
    return;
  }
  const postId = (await params).postId;

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { displayName: true, username: true, img: true } },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
      comments: {
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
      },
    },
  });

  if (!post) return notFound();
  return (
    <div className="">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <ImageKit src="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" post={post as any} />
      <Comments
        comments={post.comments as any}
        postId={post.id}
        username={post.user.username}
      />
    </div>
  );
};

export default StatusPage;
