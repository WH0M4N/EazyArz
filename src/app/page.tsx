import Footer from "@/components/layout/Footer";
import Hero from "@/components/Home/Hero";
import QuickAccess from "@/components/Home/QuickAccess";
import LatestNews from "@/components/News/LatestNews";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <LatestNews />
        <QuickAccess />
      </main>

      <Footer />
    </>
  );
}
