import Image from "next/image";
import Feed from "./components/Feed";
import Share from "./components/Share";
import Link from "next/link";
import ImageKit from "./components/ImageKit";
import { ImageKitProvider, IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
const Homepage = () => {
  return (
    <div className="">
      {/* <ImageKit
        path={"/general/post.jpeg"}
        alt="logo"
        h={600}
        w={600}
        className="relative"
      /> */}

      <div className="px-4 pt-4  flex justify-between text-textGray font-bold border-b-[1px] border-borderGray">
        <Link className="pb-3 items-center border-b-4 border-iconBlue" href="/">
          For you
        </Link>
        <Link className="pb-3 items-center  " href="/">
          For you
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
};

export default Homepage;
