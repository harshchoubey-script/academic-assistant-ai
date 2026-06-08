import axiosInstance
from "../api/axios";

export const generateFlashcards =
  async (
    noteId: string
  ) => {

    const response =
      await axiosInstance.post(
        `/flashcards/generate/${noteId}`
      );

    return response.data;
};