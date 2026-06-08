import axiosInstance from "../api/axios";

export const generateQuiz =
  async (noteId: string) => {

    const response =
      await axiosInstance.post(
        `/quiz/generate/${noteId}`
      );

    return response.data;
};

export const getQuiz =
  async (noteId: string) => {
    const response =
      await axiosInstance.get(
        `/quiz/${noteId}`
      );

    return response.data;
  };