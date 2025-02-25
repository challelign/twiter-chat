"use client";

import { followUser } from "@/actions/posts";
import { useActionState, useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  const [state, setState] = useState(isFollowed);

  const followAction = async () => {
    const data = await followUser(userId);
    console.log(data);
    setState((prev) => !prev);
  };

  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );
  return (
    <form action={followAction}>
      <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
};

export default FollowButton;
