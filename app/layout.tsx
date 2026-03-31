import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: 'swap',
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['400', '700', '900'],
  subsets: ["latin"],
  variable: "--font-zen-kaku-gothic-new",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "鬼澤工業株式会社 | 管工事・機械据付・配管工事",
  description: "管工事・機械据付・配管工事のプロフェッショナル集団として、確かな技術力と豊富な実績でお客様のニーズにお応えします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${zenKakuGothicNew.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
