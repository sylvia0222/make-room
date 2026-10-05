import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "造物間 · AI 程式工作室",
  description: "和 AI 聊想法，建立、儲存並重複使用自己的小程式。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="antialiased">{children}</body>
    </html>
  );
}
