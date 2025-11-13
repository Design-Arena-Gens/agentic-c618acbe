import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UGC Script Generator for CAD Training",
  description: "Generate high-converting UGC video scripts with hook, CTA, and value/entertainment/emotion pillars.",
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
