import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Wanderlast — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar></NavBar>
        {children}
        <Footer></Footer>
        <ToastContainer position="top-center"/>
        </body>
    </html>
  );
}
