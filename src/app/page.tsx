import Footer from "@/components/layout/Footer";
import Hero from "@/components/Home/Hero";
import QuickAccess from "@/components/Home/QuickAccess";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <QuickAccess />
        {/* <MarketPreview /> */}
      </main>

      <Footer />
    </>
  );
}
