import axiosInstance from "../api/axios";
import type {
  LoginData,
  SignupData,
  AuthResponse,
} from "../types/auth.types";

export const signup = async (
  data: SignupData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(
    "/auth/signup",
    data
  );

  return response.data;
};

export const login = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(
    "/auth/login",
    data
  );

  return response.data;
};