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
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(article?.id);

  useEffect(() => {
    if (article) {
      setTitle(article.title || "");
      setSummary(article.summary || "");
      setContent(article.content || "");
      setCategoryId(article.categoryId || "");
      setCoverImageUrl(article.coverImageUrl || "");
      setStudyTime(article.studyTime ?? 0);
    } else {
      setTitle("");
      setSummary("");
      setContent("");
      setCategoryId("");
      setCoverImageUrl("");
      setStudyTime(0);
    }
  }, [article, open]);

  const generateSlug = (value: string) => {
    return value.trim().replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) return;

    setLoading(true);

    try {
      const slug = generateSlug(title);

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
          status: 1,
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
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose}>انصراف</Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !categoryId || !title.trim()}
          >
            {loading ? "در حال ذخیره..." : "افزودن خبر"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
