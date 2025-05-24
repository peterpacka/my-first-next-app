import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My first Next.js App",
  authors: [{ name: "Pitr", url: "https://yourwebsite.com" }],
  keywords: ["Next.js", "React", "Web Development", "Dark Mode", "UI Design"],
  creator: "Pitr",
  description: "A modern Next.js app with a dark theme and beautiful UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-white min-h-screen">
        <div className="flex flex-col min-h-screen">
          <header className="w-full px-8 py-4 bg-card shadow">
            <Link href="/" className="text-2xl font-bold text-primary">My First Next.js App</Link>
          </header>
          <main className="flex-1 flex flex-col items-center justify-center">
            {children}
          </main>
          <footer className="w-full px-8 py-4 bg-card border-t border-border text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} My First Next.js App. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
