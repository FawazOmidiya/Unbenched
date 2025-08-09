import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unbenched Athletics",
  description: "The Official Website of the Unbenched Lords",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
