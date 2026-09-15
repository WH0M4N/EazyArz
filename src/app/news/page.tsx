import Footer from "@/components/layout/Footer";
import NewsList from "@/components/News/NewsList";
import { getAllArticles } from "@/services/articles.service";

export default async function NewsPage() {
  const articles = await getAllArticles();

  return (
    <>
      <main>
        <NewsList articles={articles} />
      </main>

      <Footer />
    </>
  );
}
