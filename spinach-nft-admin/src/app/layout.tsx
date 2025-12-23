import type {Metadata} from "next";
import {Noto_Sans_TC} from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "TG Market Admin",
  description: "TG Market 娛樂城管理介面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={notoSansTC.className}>{children}</body>
    </html>
  );
}
