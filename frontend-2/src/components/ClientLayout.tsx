"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // daftar halaman tanpa navbar/footer
  const noLayoutRoutes = [
    "/login",
    "/register",
    "/display-antrian",
    "/display-antrian-dokter",
    "/video/rssctv",
  ];

  const hideLayout =
    noLayoutRoutes.includes(pathname) ||
    pathname.startsWith("/display-antrian") ||
    pathname.startsWith("/display-antrian-dokter") ||
    pathname.startsWith("/video/rssctv") ||
    pathname.startsWith("/carlo");

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
    >
      {!hideLayout && <Navbar />}
      <main className={`flex-1 flex flex-col ${!hideLayout && "mt-8"}`}>
        {children}
      </main>
    </div>
  );
}
