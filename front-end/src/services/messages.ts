
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const API_URL = "http://127.0.0.1:8000/api/messages/";

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail || "عملیات ناموفق بود. لطفاً دوباره تلاش کنید.",
    );
  }

  return data as T;
}

export async function getMessages(
  token: string,
): Promise<ContactMessage[]> {
  const response = await fetch(API_URL, {
    headers: authHeaders(token),
  });

  return handleResponse<ContactMessage[]>(response);
}

export async function updateMessageReadStatus(
  token: string,
  id: number,
  is_read: boolean,
): Promise<ContactMessage> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ is_read }),
  });

  return handleResponse<ContactMessage>(response);
}

export async function deleteMessage(
  token: string,
  id: number,
): Promise<void> {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!response.ok) {
    await handleResponse<unknown>(response);
  }
}
