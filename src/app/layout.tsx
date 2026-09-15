import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "EasyArz",
  description: "پلتفرم آموزش و اطلاعات ارزهای دیجیتال",
};

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem("easyarz-theme");

    if (theme === "dark") {
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.style.colorScheme = "light";
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />

        <ThemeProvider>
          <Navbar />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
