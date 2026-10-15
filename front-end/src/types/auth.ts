export interface AuthUser {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}