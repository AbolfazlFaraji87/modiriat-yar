export type BlogStatus = "draft" | "scheduled" | "published";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  status: BlogStatus;
  scheduled_for: string | null;
  published_at: string | null;
  read_time: number;
  image: string;
  cover_image: string | null;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  status: BlogStatus;
  scheduled_for: string | null;
  published_at: string | null;
  read_time: number;
  image: string;
  cover_image?: File | null;
}
