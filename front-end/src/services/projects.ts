import type { Project } from "../types/project";

const API_URL = "http://127.0.0.1:8000/api/projects/";

export type ProjectInput = Omit<
  Project,
  "id" | "created_at" | "updated_at" | "image"
> & {
  image?: File | null;
};

function getAuthHeaders(token: string): HeadersInit {
  return {
    Authorization: `Token ${token}`,
  };
}

function createFormData(data: ProjectInput): FormData {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("technologies", data.technologies);
  formData.append("client", data.client);

  if (data.image) {
    formData.append("image", data.image);
  }

  return formData;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => null);

    const message =
      data?.detail ??
      data?.title?.[0] ??
      data?.description?.[0] ??
      data?.image?.[0] ??
      "عملیات ناموفق بود. لطفاً دوباره تلاش کنید.";

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(API_URL);
  return handleResponse<Project[]>(response);
}

export async function createProject(
  token: string,
  data: ProjectInput,
): Promise<Project> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: createFormData(data),
  });

  return handleResponse<Project>(response);
}

export async function updateProject(
  token: string,
  id: number,
  data: ProjectInput,
): Promise<Project> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: createFormData(data),
  });

  return handleResponse<Project>(response);
}

export async function deleteProject(token: string, id: number): Promise<void> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  await handleResponse<void>(response);
}
