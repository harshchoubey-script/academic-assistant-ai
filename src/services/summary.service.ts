import axiosInstance from "../api/axios";

export const generateSummary =
  async (noteId: string) => {
    const response =
      await axiosInstance.post(
        `/summary/generate/${noteId}`
      );

    return response.data;
  };

  export const getSummary =
  async (noteId: string) => {
    const response =
      await axiosInstance.get(
        `/summary/${noteId}`
      );

    return response.data;
  };