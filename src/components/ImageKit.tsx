"use client";
import { IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type ImageKitType = {
  src: string;
  w?: number;
  h?: number;
  alt: string;
  className?: string;
  tr?: boolean;
};
const ImageKit = ({ src, w, h, alt, className, tr }: ImageKitType) => {
  return (
    <div>
      <IKImage
        urlEndpoint={urlEndpoint}
        // transformation={[{ width: `${w}`, height: `${h}` }]}
        {...(tr
          ? { transformation: [{ width: `${w}`, height: `${h}` }] }
          : { width: w, height: h })}
        path={src}
        width={w}
        height={h}
        alt={alt}
        className={className}
        lqip={{ active: true, quality: 20 }}
      />
    </div>
  );
};

export default ImageKit;
