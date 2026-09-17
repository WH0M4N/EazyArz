import type { Metadata } from "next";
import { cookies } from "next/headers";

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
  const cookieStore = cookies();

  const savedTheme = cookieStore.get("easyarz-theme")?.value;

  const initialMode =
    savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";

  return (
    <html
      lang="fa"
      dir="rtl"
      style={{
        colorScheme: initialMode,
      }}
    >
      <body>
        <ThemeProvider initialMode={initialMode}>
          <Navbar />

          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
