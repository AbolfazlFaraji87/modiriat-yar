import type { BlogPost, BlogPostInput } from "../types/blog";

const API_URL = "http://127.0.0.1:8000/api/blog/";

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Token ${token}`,
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.title?.[0] ||
      data?.non_field_errors?.[0] ||
      "عملیات ناموفق بود.";

    throw new Error(message);
  }

  return data as T;
}

function toFormData(data: BlogPostInput): FormData {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("excerpt", data.excerpt);
  formData.append("body", data.body || "");
  formData.append("category", data.category);
  formData.append("status", data.status);
  formData.append("read_time", String(data.read_time));
  formData.append("image", data.image || "");

  if (data.scheduled_for) {
    formData.append("scheduled_for", data.scheduled_for);
  }

  if (data.published_at) {
    formData.append("published_at", data.published_at);
  }

  if (data.cover_image instanceof File) {
    formData.append("cover_image", data.cover_image);
  }

  return formData;
}

export async function getBlogPosts(token: string): Promise<BlogPost[]> {
  const response = await fetch(API_URL, {
    headers: authHeaders(token),
  });

  return handleResponse<BlogPost[]>(response);
}

export async function createBlogPost(
  token: string,
  data: BlogPostInput,
): Promise<BlogPost> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: toFormData(data),
  });

  return handleResponse<BlogPost>(response);
}

export async function updateBlogPost(
  token: string,
  id: number,
  data: BlogPostInput,
): Promise<BlogPost> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: toFormData(data),
  });

  return handleResponse<BlogPost>(response);
}

export async function deleteBlogPost(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!response.ok) {
    await handleResponse<unknown>(response);
  }
}

export async function getPublicBlogPost(id: number): Promise<BlogPost> {
  const response = await fetch(`${API_URL}${id}/`);
  return handleResponse<BlogPost>(response);
}

export async function getPublicBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch(API_URL);
  return handleResponse<BlogPost[]>(response);
}