import api from "@/lib/api";

export const getAllArticles = async () => {
  const response = await api.get("/API/Articles/GetAllArticles");

  return response.data;
};

export const getArticleBySlug = async (slug: string) => {
  const response = await api.get(`/API/Articles/GetArticleBySlug/${slug}`);

  return response.data;
};
