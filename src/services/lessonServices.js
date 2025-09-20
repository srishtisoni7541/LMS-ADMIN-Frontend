import api from "../api/axios";

export const createLessonApi = async (formData) => {
  const response = await api.post(`/lesson/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllLessonsApi = async () => {
  const response = await api.get("/lesson/all"); // backend route
  return response.data;
};
// Fetch lessons by module
export const getLessonsByModuleApi = async (moduleId) => {
  const response = await api.get(`/module/${moduleId}`);
  return response.data;
};

// Soft delete lesson
export const softDeleteLessonApi = async (lessonId) => {
  const response = await api.delete(`/lesson/delete/${lessonId}`);
  return response.data;
};





export const updateLessonApi = async (lessonId, data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("type", data.type);
  formData.append("order", data.order);
  formData.append("duration", data.duration);

  if (data.file) formData.append("file", data.file);
  if (data.contentUrl) formData.append("contentUrl", data.contentUrl);

  const response = await api.put(`/lesson/update-lesson/${lessonId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteLessonApi = (lessonId) => {
  return api.delete(`/lesson/delete/${lessonId}`);
};