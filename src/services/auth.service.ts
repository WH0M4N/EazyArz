import api from "@/lib/api";

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data?: {
    accessToken?: string;
  };
}

export const registerUser = async (
  data: RegisterPayload,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/API/Users/Register", data);

  return response.data;
};

export const verifyEmail = async (
  data: VerifyEmailPayload,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/API/Users/VerifyEmail", data);

  return response.data;
};
