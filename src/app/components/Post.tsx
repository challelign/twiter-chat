import Image from "next/image";
import React from "react";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import ImageKit from "./ImageKit";

import { imagekit } from "../utils/utils";
import { SingleFileResponse } from "../types";
import SensitiveContent from "./SensitiveContent";

const Post = async () => {
  // FETCH POST MEDIA

  const getFileDetails = async (
    fileId: string
  ): Promise<SingleFileResponse> => {
    return new Promise((resolve, reject) => {
      imagekit.getFileDetails(fileId, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result as SingleFileResponse);
        }
      });
    });
  };

  const fileDetails = await getFileDetails("67a9f0a0432c4764167af7ba");

  console.log(fileDetails);

  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* Post Type */}

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
        <span>Code rookie reposted</span>
      </div>
      {/* POST CONTENT */}
      <div className="flex gap-4">
        {/* AVATAR */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <ImageKit src={"/general/avatar.png"} alt="" w={100} h={100} />
        </div>
        {/* CONTENT  */}
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-md font-bold">Code Rookie</h1>
              <span className="text-textGray">@code_rooki</span>
              <span className="text-textGray">1 day ago</span>
              {/* TOP */}
            </div>
            <PostInfo />
          </div>
          {/* Media and text */}
          <div className="">
            <p className="text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
              quo error dignissimos accusamus vero non alias sed facere sapiente
              inventore esse molestiae, reprehenderit, beatae aliquid minus, et
              exercitationem at aliquam! Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Velit quo error dignissimos accusamus vero non
              alias sed facere sapiente inventore esse molestiae, reprehenderit,
              beatae aliquid minus, et exercitationem at aliquam!
            </p>
          </div>

          <div className="relative items-center justify-center rounded-xl overflow-hidden">
            {fileDetails && (
              <ImageKit
                src={fileDetails.filePath}
                alt=""
                w={fileDetails.width}
                h={fileDetails.height}
                className={
                  fileDetails.customMetadata?.sensitive ? "blur-lg" : ""
                }
              />
            )}
            {/* <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white py-1 px-4 rounded-full font-bold text-sm cursor-pointer"
              onClick={() => handleClickVisible(fileDetails?.fileId)}
            >
              The content is sensitive
            </div> */}
            {fileDetails.customMetadata?.sensitive && (
              <SensitiveContent fileId={fileDetails.fileId} />
            )}
          </div>
          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
