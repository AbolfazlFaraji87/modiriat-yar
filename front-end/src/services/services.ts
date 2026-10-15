import type { Service } from "../types/service";

const API_URL = "http://127.0.0.1:8000/api/services/";

export type ServiceInput = Omit<Service, "id">;

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message =
      data?.detail ??
      data?.title?.[0] ??
      data?.description?.[0] ??
      data?.features?.[0] ??
      "عملیات ناموفق بود.";
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getServices(): Promise<Service[]> {
  const response = await fetch(API_URL);
  return handleResponse<Service[]>(response);
}

export async function createService(
  token: string,
  data: ServiceInput,
): Promise<Service> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse<Service>(response);
}

export async function updateService(
  token: string,
  id: number,
  data: ServiceInput,
): Promise<Service> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse<Service>(response);
}

export async function deleteService(
  token: string,
  id: number,
): Promise<void> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  await handleResponse<void>(response);
}
