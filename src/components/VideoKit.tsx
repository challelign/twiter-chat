"use client";
import { IKVideo } from "imagekitio-next";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoKitType = {
  src: string;
  className?: string;
};
const VideoKit = ({ src, className }: VideoKitType) => {
  return (
    <IKVideo
      urlEndpoint={urlEndpoint}
      path={src}
      className={className}
      transformation={[
        { width: "1920", height: "1080", q: "90" },
        { raw: "l-text,i-CodeRookie,fs-100,co-white,l-end" }, // for text overlay
        // { raw: "l-image,i-default-image.jpg,w-100,b-10_CDDC39,l-end" }, // fir image overlay
      ]}
      controls
    />
  );
};

export default VideoKit;
