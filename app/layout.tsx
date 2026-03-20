import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jithin S | Software Engineer",
  description: "Full-Stack Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
