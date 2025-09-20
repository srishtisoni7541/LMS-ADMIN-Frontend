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
  const response = await api.delete(`lesson/delete/${lessonId}`);
  return response.data;
};

// Update lesson (basic info, not file)
export const updateLessonApi = async (lessonId, data) => {
  const response = await api.put(`lesson/update/${lessonId}`, data);
  return response.data;
};
