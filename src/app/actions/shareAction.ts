"use server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});
export const shareAction = async (
  formData: FormData,
  settings: { type: "original" | "wide" | "square"; sensitive: boolean }
) => {
  const file = formData.get("file") as File;
  const desc = formData.get("desc") as string;

  const currentDate = new Date();
  console.log("currentDate is ", currentDate);
  console.log("sensitive is ", settings.sensitive);
  console.log("FILe is ", file);
  console.log("desc is ", desc);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const transformation = `w-600 ${
    settings.type === "square"
      ? "ar-1-1"
      : settings.type === "wide"
      ? "ar-16-9"
      : ""
  }`;

  imagekit.upload(
    {
      file: buffer,
      fileName: currentDate + "-" + file.name,
      folder: "/posts",
      transformation: {
        pre: transformation,
      },
      customMetadata: {
        sensitive: settings.sensitive,
      },
    },
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    }
  );
};
