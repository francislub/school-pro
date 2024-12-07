import type { Metadata } from "next";
import { Rethink_Sans } from 'next/font/google'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
const inter = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
})
import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SchoolPro",
  description: "School Management System for secondary schools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <Toaster position="top-center" reverseOrder={false}/>
         <NextSSRPlugin
          
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
      </body>
    </html>
  );
}
