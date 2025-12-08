import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic AI: From Automation to Autonomy",
  description: "An interactive presentation explaining Agentic AI for technical professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
