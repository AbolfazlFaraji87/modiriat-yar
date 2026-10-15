import type {
  AuthResponse,
  AuthUser,
  LoginData,
  RegisterData,
} from "../types/auth";

const API_URL = "http://127.0.0.1:8000/api/auth";

export async function registerUser(
  data: RegisterData,
): Promise<void> {
  const response = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      result?.username?.[0] ??
      result?.email?.[0] ??
      result?.password?.[0] ??
      result?.detail ??
      "Registration failed. Please check your information.";

    throw new Error(message);
  }
}

export async function loginUser(
  data: LoginData,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.detail ?? "Login failed. Check your credentials.",
    );
  }

  return result as AuthResponse;
}

export async function getCurrentUser(
  token: string,
): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/me/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.detail ?? "Could not retrieve your account.",
    );
  }

  return result as AuthUser;
}

export async function logoutUser(token: string): Promise<void> {
  const response = await fetch(`${API_URL}/logout/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Logout request failed.");
  }
}