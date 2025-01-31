import type { Metadata } from "next";
import {
  Cedarville_Cursive,
  Permanent_Marker,
  Poppins,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const poppins = Poppins({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-poppins",
});
const cursive = Permanent_Marker({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Beyonder - More than just a Chatbot",
  description: "A cutting edge customer service to grow your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${cursive.variable}  antialiased max-h-screen overflow-hidden font-primary`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
