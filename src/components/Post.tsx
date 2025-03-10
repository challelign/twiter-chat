import Image from "next/image";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import ImageKit from "./ImageKit";
import moment from "moment";

import VideoKit from "./VideoKit";
import Link from "next/link";
import { Post as PostType } from "@prisma/client";
import { format } from "timeago.js";
type UserSummary = {
  displayName: string | null;
  username: string;
  img: string | null;
};

// type PostType = {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   desc: string | null;
//   img: string | null;
//   imgHeight: number | null;
//   video: string | null;
//   isSensitive: boolean;
//   userId: string;
//   rePostId: string | null;
//   parentPostId: string | null;
// };

type Engagement = {
  _count: { likes: number; rePosts: number; comments: number };
  likes: { id: string }[]; // Changed from 'number' to 'string'
  rePosts: { id: string }[]; // Changed from 'number' to 'string'
  saves: { id: string }[]; // Changed from 'number' to 'string'
};

type PostWithDetails = PostType &
  Engagement & {
    user: UserSummary;
    rePost?: PostWithDetails | null; // Ensure it can be null
  };
const Post = ({
  type,
  post,
}: {
  type?: "status" | "comment";
  post: PostWithDetails;
}) => {
  // FETCH POST MEDIA

  const originalPost = post.rePost || post;
  return (
    <div className="p-4 border-y-[1px] border-borderGray ">
      {/* Post Type */}
      {post.rePostId && (
        <div className="flex items-center gap-2 text-sm text-textGray mb-2 from-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="#71767b"
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
            />
          </svg>
          <span>{post?.user.displayName} re-posted</span>
        </div>
      )}
      {/* POST CONTENT */}
      {/* <div className="flex gap-4"> */}
      <div className={`flex gap-4 ${type === "status" && "flex-col"}`}>
        {/* AVATAR */}
        {/* <div className="relative w-10 h-10 rounded-full overflow-hidden"> */}
        <div
          className={`${
            type === "status" && "hidden"
          } relative w-10 h-10 rounded-full overflow-hidden -z-10`}
        >
          {/* <ImageKit src={"/general/avatar.png"} alt="" w={100} h={100} /> */}
          <Image
            src={(originalPost?.user.img as string) || "/general/avatar.png"}
            alt={originalPost?.user.username}
            width={100}
            height={100}
          />
        </div>
        {/* CONTENT  */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="w-full flex justify-between">
            <Link
              href={`/${originalPost?.user.username}`}
              className="flex gap-4"
            >
              {originalPost?.user.img && (
                <div
                  className={`${
                    type !== "status" && "hidden"
                  } relative w-10 h-10 rounded-full overflow-hidden`}
                >
                  {/* <ImageKit
                    src={originalPost.user.img}
                    alt={originalPost.user.username}
                    w={100}
                    h={100}
                    tr={true}
                  /> */}

                  <Image
                    src={originalPost?.user.img}
                    alt={originalPost?.user.username}
                    width={100}
                    height={100}
                  />
                </div>
              )}

              <div
                className={`flex items-center gap-2 flex-wrap ${
                  type === "status" && "flex-col gap-0 !items-start"
                }`}
              >
                <h1 className="text-md font-bold">
                  {originalPost?.user.displayName}
                </h1>
                <span
                  className={`text-textGray ${type === "status" && "text-sm"}`}
                >
                  @{originalPost?.user.username}
                </span>
                {type !== "status" && (
                  <span className="text-textGray">
                    {format(originalPost?.createdAt)}
                  </span>
                )}
              </div>
            </Link>
            <PostInfo />
          </div>

          {/* Media and text */}
          <div className="">
            <Link
              href={`${originalPost?.user.username}/status/${originalPost?.id}`}
            >
              <p
                className={`${
                  type === "status" && "text-lg"
                }  line-clamp-5 text-justify text-wrap flex `}
              >
                {originalPost?.desc}
              </p>
            </Link>
          </div>

          <div className="relative items-center justify-center rounded-xl overflow-hidden -z-10">
            <Link
              href={`${originalPost?.user.username}/status/${originalPost?.id}`}
            >
              {originalPost?.img?.startsWith("http") && (
                <Image
                  src={originalPost?.img}
                  alt={originalPost?.user.displayName as string}
                  width={600}
                  height={originalPost.imgHeight || 600}
                  className="h-96 aspect-square"
                />
              )}

              {originalPost?.img?.startsWith("/posts") && (
                <>
                  <ImageKit
                    src={originalPost.img}
                    alt={originalPost.user.displayName as string}
                    w={600}
                    h={originalPost.imgHeight || 600}
                    className={originalPost.isSensitive ? "blur-3xl" : ""}
                  />
                </>
              )}

              {/*  
            {originalPost?.img && (
              <ImageKit
                src={originalPost.img}
                alt={originalPost.user.displayName as string}
                w={600}
                h={600}
                className={originalPost.isSensitive ? "blur-3xl" : ""}
              />
              // <Image
              //   src={originalPost?.img}
              //   alt={originalPost?.user.displayName as string}
              //   width={600}
              //   height={600}
              //   className="h-96 aspect-square"
              // />
            )}*/}
              {originalPost?.video && (
                <div className="rounded-lg overflow-hidden">
                  <VideoKit
                    src={originalPost?.video}
                    className={originalPost?.isSensitive ? "blur-3xl" : ""}
                  />
                </div>
              )}
            </Link>
          </div>
          {type === "status" && (
            <span className="text-textGray">
              {moment(originalPost?.createdAt).format("h:mm A · MMM D, YYYY")}
            </span>
          )}
          <PostInteractions
            key={originalPost.id}
            username={originalPost.user.username}
            postId={originalPost.id}
            count={originalPost._count}
            isLiked={!!originalPost?.likes?.length}
            isRePosted={!!originalPost?.rePosts?.length}
            isSaved={!!originalPost?.saves?.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
