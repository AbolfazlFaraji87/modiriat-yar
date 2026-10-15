
import type { AuthUser } from "../types/auth";

const API_URL = "http://127.0.0.1:8000/api/auth";

function getAuthHeaders(token: string): HeadersInit {
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
}

async function readResponse(response: Response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.detail ??
      data?.username?.[0] ??
      data?.email?.[0] ??
      data?.current_password?.[0] ??
      data?.new_password?.[0] ??
      "درخواست ناموفق بود.";

    throw new Error(message);
  }

  return data;
}

export async function updateProfile(
  token: string,
  data: { username: string; email: string },
): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/profile/`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return readResponse(response) as Promise<AuthUser>;
}

export async function changePassword(
  token: string,
  data: { current_password: string; new_password: string },
): Promise<{ detail: string }> {
  const response = await fetch(`${API_URL}/change-password/`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return readResponse(response);
}