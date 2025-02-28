"use client";
import { Post as PostType } from "@prisma/client";
import ImageKit from "./ImageKit";
import Post from "./Post";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { addComment } from "@/actions/posts";
import { socket } from "@/socket";

type CommentsWithDetails = PostType & {
  user: { displayName: string | null; username: string; img: string | null };
  _count: { likes: number; rePosts: number; comments: number };
  likes: { id: string }[];
  rePosts: { id: string }[];
  saves: { id: string }[];
};
const Comments = ({
  comments,
  postId,
  username,
}: {
  comments: CommentsWithDetails[];
  postId: string;
  username: string;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      console.log("SEND_NOTIFICATION_POST_INTERACTION_COMMENT");
      socket.emit("SEND_NOTIFICATION", {
        receiverUsername: username,
        data: {
          senderUsername: user?.username,
          type: "comment",
          link: `/${username}/status/${postId}`,
        },
      });
    }
  }, [user, state.success, username]);

  return (
    <div className="">
      {user && (
        <form
          action={formAction}
          className="flex items-center justify-between gap-4 p-4  "
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden -z-10">
            {/* <ImageKit
            src="general/avatar.png"
            alt="Code Rookie"
            w={100}
            h={100}
            tr={true}
          /> */}
            <Image
              src="/general/avatar.png"
              alt="Code Rookie"
              width={100}
              height={100}
            />{" "}
          </div>
          <input type="string" name="postId" hidden readOnly value={postId} />
          <input
            type="string"
            name="username"
            hidden
            readOnly
            value={username}
          />
          <input
            type="text"
            name="desc"
            className="flex-1 bg-transparent outline-none p-2 text-xl"
            placeholder="Post your reply"
          />
          <button
            disabled={isPending}
            className="py-2 px-4 font-bold bg-white text-black rounded-full disabled:cursor-not-allowed disabled:bg-slate-200"
          >
            {isPending ? "Replying" : "Reply"}
          </button>
        </form>
      )}
      {state.error && (
        <span className="text-red-300 p-4">
          {state.message ? state.message : " Something went wrong! "}
        </span>
      )}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Post post={comment} type="comment" key={comment.id} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
