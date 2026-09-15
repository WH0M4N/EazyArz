"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export interface Category {
  id: string;
  name: string;
  slug: string;
  articles: string[];
}

export interface Article {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  studyTime: number;
  categoryId: string;
  status: number;
}

interface ArticleFormProps {
  open: boolean;
  article?: Article | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function ArticleForm({
  open,
  article,
  categories,
  onClose,
  onSuccess,
}: ArticleFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [status, setStatus] = useState(1);
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(article?.id);

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setSlug(article.slug || "");
      setSummary(article.summary || "");
      setContent(article.content || "");
      setCategoryId(article.categoryId || "");
      setCoverImageUrl(article.coverImageUrl || "");
      setStudyTime(article.studyTime ?? 0);
      setStatus(article.status ?? 1);
    } else {
      setTitle("");
      setSlug("");
      setSummary("");
      setContent("");
      setCategoryId("");
      setCoverImageUrl("");
      setStudyTime(0);
      setStatus(1);
    }
  }, [article, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) return;

    setLoading(true);

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          summary,
          content,
          coverImageUrl,
          studyTime,
          categoryId,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to create article");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? "ویرایش خبر" : "افزودن خبر"}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="عنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="خلاصه"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            <TextField
              label="متن خبر"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={8}
              required
            />

            <TextField
              select
              label="دسته‌بندی"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              fullWidth
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="آدرس تصویر"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              fullWidth
            />

            <TextField
              label="زمان مطالعه (دقیقه)"
              type="number"
              value={studyTime}
              onChange={(e) => setStudyTime(Number(e.target.value))}
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              select
              label="وضعیت"
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              fullWidth
            >
              <MenuItem value={1}>فعال</MenuItem>
              <MenuItem value={0}>غیرفعال</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>انصراف</Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !categoryId}
          >
            {loading ? "در حال ذخیره..." : "افزودن خبر"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
