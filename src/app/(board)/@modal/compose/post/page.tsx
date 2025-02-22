"use client";

import ImageKit from "@/components/ImageKit";
import { useRouter } from "next/navigation";

const PostModal = () => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    // <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6] flex justify-center">
    // this will remove scroll effect
    <div className="fixed inset-0 z-50 bg-[#293139a6]  flex justify-center items-start overflow-hidden">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <div
            className=" font-bold cursor-pointer text-sm top-2 right-2 bg-red-800/20 bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full"
            onClick={closeModal}
          >
            X
          </div>
          <div className="text-iconBlue font-bold">Drafts</div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <ImageKit
              src="general/avatar.png"
              alt="Lama Dev"
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <input
            className="flex-1 bg-transparent outline-none text-lg"
            type="text"
            placeholder="What is happening?!"
          />
        </div>
        {/* BOTTOM */}
        <div className=" flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4">
          <div className="flex gap-4 flex-wrap">
            <ImageKit
              src="icons/image.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/gif.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/poll.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/emoji.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/schedule.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <ImageKit
              src="icons/location.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
          </div>
          <button className="py-2 px-5 text-black bg-white rounded-full font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
