import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 财富领航员 | AI Wealth Navigator",
  description: "AI 驱动的智能投顾，24/7 不间断服务，为每一位客户量身定制最优投资策略。",
  keywords: "AI投顾, 智能理财, 财富管理, 投资策略, 人工智能",
  authors: [{ name: "AI Wealth Navigator Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "AI 财富领航员 | 重新定义财富管理",
    description: "AI 驱动的智能投顾，24/7 不间断服务，为每一位客户量身定制最优投资策略。",
    type: "website",
    locale: "zh_CN",
    alternateLocale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
