"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PostModal from "../../@modal/compose/post/page";

// TO PREVENT PAGE NOT FOUND ON PAGE COMPOSE/POST WHILE REFRESH IN PARALLEL ROUTE
const PostPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to `/compose` when modal is closed
    const handlePopstate = () => router.replace("/compose");
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [router]);

  return <PostModal />;
};

export default PostPage;
