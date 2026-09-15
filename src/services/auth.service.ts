import api from "@/lib/api";
import {
  AuthResponse,
  RegisterRequest,
  VerifyEmailRequest,
} from "@/types/auth";

export const registerUser = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  console.log("🟡 registerUser CALLED");
  console.log("📦 REGISTER DATA:", data);

  try {
    console.log("🚀 SENDING POST /API/Users/Register");

    const response = await api.post<AuthResponse>("/API/Users/Register", data);

    console.log("🟢 REGISTER HTTP RESPONSE:", response);
    console.log("🟢 REGISTER RESPONSE DATA:", response.data);

    return response.data;
  } catch (error) {
    console.error("🔴 REGISTER REQUEST FAILED:", error);
    throw error;
  }
};

export const verifyEmail = async (
  data: VerifyEmailRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/API/Users/VerifyEmail", data);

  return response.data;
};
