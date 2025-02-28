"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { ThreeDot } from "react-loading-indicators";

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
  const res = await fetch(
    `http://localhost:4000/api/posts?cursor=${pageParam}&user=${userProfileId}`
  );
  return res.json();
};

const InfiniteFeed = ({ userProfileId }: { userProfileId: string }) => {
  // INFINITY Queries
  const {
    data: posts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
    initialPageParam: 2,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 2 : undefined,
  });
  // console.log("[POSTS_INFINITY_FEED]", posts);

  const allPosts = posts?.pages.flatMap((page) => page.posts) || [];
  // console.log("[ALL_POSTS_INFINITY_FEED]", allPosts);

  if (error) {
    return (
      <div className="flex items-center justify-center  ">
        <ThreeDot
          variant="pulsate"
          color="#1d9bf0"
          size="medium"
          text="Something went wrong Please refresh the page"
          textColor="#1d9bf0"
        />
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="flex items-center justify-center pb-20 pt-5 ">
        <ThreeDot
          variant="pulsate"
          color="#1d9bf0"
          size="large"
          text="please wait"
          textColor="#1d9bf0"
        />
      </div>
    );
  }
  return (
    <InfiniteScroll
      dataLength={allPosts.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="flex items-center justify-center pb-20 pt-5 ">
          <ThreeDot
            variant="pulsate"
            color="#1d9bf0"
            size="large"
            text="please wait"
            textColor="#1d9bf0"
          />
        </div>
      }
      //   endMessage={<b>Yay! You have seen it all</b>}
    >
      {allPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteFeed;
