import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Code Rookie Dev X Clone",
  description: "Next.js social media application project",
  icons: {
    icon: "/general/logo.jpg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
