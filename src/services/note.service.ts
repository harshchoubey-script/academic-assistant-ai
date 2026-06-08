import axiosInstance from "../api/axios";

export const uploadNote = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await axiosInstance.post(
      "/notes/upload",
      formData
    );

  return response.data;
};

export const getNotes = async () => {
  const response =
    await axiosInstance.get("/notes");

  return response.data;
};

export const getNoteById = async (
  id: string
) => {
  const response =
    await axiosInstance.get(
      `/notes/${id}`
    );

  return response.data;
};

export const getSingleNote =
  async (id: string) => {
    const response =
      await axiosInstance.get(
        `/notes/${id}`
      );

    return response.data;
  };