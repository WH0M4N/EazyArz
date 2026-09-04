import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "EasyArz",
  description: "پلتفرم آموزش و اطلاعات ارزهای دیجیتال",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>
          <Navbar />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
