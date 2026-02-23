import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import ProfilePopup from "@/components/features/profile/ProfilePopup";
import FloatingPlayer from "@/components/layout/FloatingPlayer";
import MobileMenu from "@/components/layout/MobileMenu";
import Notification from "@/components/shared/Notification";

// Mocking Geist font by using Inter or sans-serif for now, as Geist is a specific Vercel font package.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusicGPT - Create Music with AI",
  description:
    "Generate production-grade music, beats, and soundscapes using the world's most advanced AI audio model.",
  keywords: ["AI Music", "Music Generator", "AI Audio", "Music Production"],
  authors: [{ name: "MusicGPT Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} bg-bg-page text-text-primary antialiased`}
      >
        <main className="flex min-h-screen">
          <Sidebar />
          <MobileMenu />
          <section className="flex-1 md:ml-50 relative min-h-screen w-full h-full p-4">
            <TopBar />
            <ProfilePopup />
            <Notification />
            {children}
            <FloatingPlayer />
          </section>
        </main>
      </body>
    </html>
  );
}
