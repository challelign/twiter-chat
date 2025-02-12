import ImageKit from "./ImageKit";
import Post from "./Post";

const Comments = () => {
  return (
    <div className="">
      <form className="flex items-center justify-between gap-4 p-4 ">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <ImageKit
            src="general/avatar.png"
            alt="Code Rookie"
            w={100}
            h={100}
            tr={true}
          />
        </div>
        <input
          type="text"
          className="flex-1 bg-transparent outline-none p-2 text-xl border-1 border-transparent focus:border-blue-400 focus:ring-1 focus:ring-offset-blue-400 rounded-sm"
          // className="flex-1 bg-transparent outline-none p-2 focus-visible:ring-offset-blue-400   text-xl border-l-2 border-blue-400"
          placeholder="Post your reply..."
        />
        <button className="py-2 px-4 font-bold bg-white text-black rounded-full">
          Reply
        </button>
      </form>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Comments;
