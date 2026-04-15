import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AhmedLabs | AI-Powered Network Engineering Platform",
  description: "Bridge the gap between theoretical learning and hands-on practice with AI-driven lab generation, multi-agent chat, and certification tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}

