export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  status: number;
  message: string;
}
