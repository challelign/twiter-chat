"use client";
import React, { useState } from "react";
import ImageKit from "./ImageKit";
import { shareAction } from "../actions/shareAction";
import Image from "next/image";
import ImageEditor from "./ImageEditor";

const Share = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({ type: "original", sensitive: false });

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const previewURL = media ? URL.createObjectURL(media) : null;
  return (
    // <form action={shareAction} className="p-4 flex gap-4">
    <form
      action={(formData) => shareAction(formData, settings)}
      className="p-4 flex gap-4"
    >
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <ImageKit src={"/general/avatar.png"} alt="" w={100} h={100} />
      </div>
      {/* Others */}
      <div className="flex-1 flex flex-col gap-4  ">
        <input
          type="text"
          name="desc"
          placeholder="What is happening?!"
          className="border-b-red-200/15 border-b-2  bg-transparent outline-none placeholder:text-textGray text-xl "
        />
        {/* PREVIEW IMAGE */}
        {media?.type.includes("image") && previewURL && (
          <div className="relative rounded-xl overflow-hidden">
            {/* <ImageKit src={previewURL} w={600} h={600} alt="Preview URL" /> */}
            <Image
              src={previewURL}
              width={600}
              height={600}
              alt="Preview URL"
              className={`w-full ${
                settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              }`}
            />
            <div
              className="absolute top-2 left-2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
              onClick={() => setIsEditorOpen(true)}
            >
              Edit
            </div>
            <div
              onClick={() => setMedia(null)}
              className="absolute font-bold cursor-pointer text-sm top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full"
            >
              X
            </div>
          </div>
        )}

        {media?.type.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              onClick={() => setMedia(null)}
              className="absolute font-bold cursor-pointer text-sm top-2 right-2 bg-black bg-opacity-50 text-white h-8 w-8 flex items-center justify-center rounded-full"
            >
              X
            </div>
          </div>
        )}
        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewUrl={previewURL}
            settings={settings}
            setSettings={setSettings}
          />
        )}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              name="file"
              className="hidden"
              id="file"
              onChange={handleMediaChange}
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <ImageKit
                src="icons/image.svg"
                alt=""
                w={20}
                h={20}
                className="cursor-pointer"
              />
            </label>
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
          <button className="bg-white text-black font-bold rounded-full py-2 px-4">
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default Share;
