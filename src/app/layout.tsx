import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Code Rookie Dev X Clone",
  description: "Next.js social media application project",
};
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <div className="flex justify-between bg-red-500 sm:bg-blue-500 md:bg-green-500 lg:bg-pink-500 xl:bg-yellow-500 2xl:bg-slate-500"> */}
        <div className="max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between">
          <div className="px-2 xxl:px-8  ">
            <LeftBar />
          </div>
          <div className="flex-1 lg:min-w-[600px] border-x-[1px] border-borderGray">
            {children}
            {modal}
          </div>
          <div className="hidden lg:flex ml-4 md:ml-8 flex-1  ">
            <RightBar />
          </div>
        </div>
      </body>
    </html>
  );
}
