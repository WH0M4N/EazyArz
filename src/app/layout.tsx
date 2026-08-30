import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EasyArz",
  description: "آموزش و اخبار دنیای ارز دیجیتال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
