"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArticleForm, { Article, Category } from "./ArticleForm";

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/articles");
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const result = await response.json();
      setArticles(result?.data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const result = await response.json();

      setCategories(result?.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setSelectedArticle(null);
    setFormOpen(true);
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setFormOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const confirmed = window.confirm("آیا از حذف این خبر مطمئن هستید؟");
    if (!confirmed) return;
    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      await fetchArticles();
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return (
      categories.find((category) => category.id === categoryId)?.name ||
      "نامشخص"
    );
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography variant="h5" fontWeight={700}>
          اخبار
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={handleAdd}
        >
          افزودن خبر
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>عنوان</TableCell> <TableCell>دسته‌بندی</TableCell>
              <TableCell>وضعیت</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  خبری وجود ندارد
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {categories.find(
                      (category) => category.id === article.categoryId,
                    )?.name || "نامشخص"}
                  </TableCell>{" "}
                  <TableCell>
                    <Chip
                      label={article.status === 1 ? "فعال" : "غیرفعال"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(article)} disabled>
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(article.id)}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ArticleForm
        open={formOpen}
        article={selectedArticle}
        categories={categories}
        onClose={() => setFormOpen(false)}
        onSuccess={fetchArticles}
      />
    </Box>
  );
}
