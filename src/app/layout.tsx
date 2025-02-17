import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";
export const metadata: Metadata = {
  title: "Code Rookie Dev X Clone",
  description: "Next.js social media application project",
  icons: {
    icon: "/general/logo.jpg",
  },
};
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
