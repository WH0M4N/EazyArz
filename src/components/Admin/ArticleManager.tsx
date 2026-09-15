"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArticleForm, { Article, Category } from "./ArticleForm";

export default function ArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

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

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;

    setCategoryLoading(true);

    try {
      const slug = categoryName.trim().replace(/\s+/g, "-");

      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName.trim(),
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create category");
      }

      setCategoryName("");
      setCategoryDialogOpen(false);

      await fetchCategories();
    } catch (error) {
      console.error(error);
    } finally {
      setCategoryLoading(false);
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
        <Stack direction="row" sx={{ gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setCategoryDialogOpen(true)}
          >
            افزودن دسته‌بندی
          </Button>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleAdd}
          >
            افزودن خبر
          </Button>
        </Stack>
      </Stack>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "action.hover",
                "& th": {
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
              }}
            >
              <TableCell align="right">عنوان</TableCell>
              <TableCell>دسته‌بندی</TableCell>
              <TableCell align="left">عملیات</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell align="center" sx={{ py: 6 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    py: 6,
                    color: "text.secondary",
                  }}
                >
                  خبری وجود ندارد
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow
                  key={article.id}
                  hover
                  sx={{
                    transition: "background-color 0.2s",
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      fontWeight={600}
                      sx={{
                        maxWidth: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "right",
                      }}
                    >
                      {article.title}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {categories.find(
                        (category) => category.id === article.categoryId,
                      )?.name || "نامشخص"}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(article.id)}
                        sx={{
                          border: "1px solid",
                          borderColor: "error.light",
                          borderRadius: 1.5,
                        }}
                      >
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
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
      <Dialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>افزودن دسته‌بندی</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="نام دسته‌بندی"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setCategoryDialogOpen(false)}>انصراف</Button>

          <Button
            variant="contained"
            onClick={handleCreateCategory}
            disabled={categoryLoading || !categoryName.trim()}
          >
            {categoryLoading ? "در حال ایجاد..." : "ایجاد دسته‌بندی"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
