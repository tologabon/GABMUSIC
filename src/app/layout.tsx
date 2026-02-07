import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "../components/layout/BottomNav";
import { FullPlayer } from "../components/layout/FullPlayer";
import { StickyPlayer } from "../components/layout/StickyPlayer";

export const metadata: Metadata = {
  title: "Gabmusic",
  description: "Spotify for Gabonese artists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 pb-32">
        <div className="mx-auto min-h-screen max-w-md px-6 py-6">
          {children}
        </div>
        <FullPlayer />
        <StickyPlayer />
        <BottomNav />
      </body>
    </html>
  );
}
