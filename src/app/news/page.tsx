import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsList from "@/components/News/NewsList";

export default function NewsPage() {
  return (
    <>
      <Navbar />

      <main>
        <NewsList />
      </main>

      <Footer />
    </>
  );
}
