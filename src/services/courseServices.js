import api from "../api/axios";

export const createCourseApi = (payload) => {
  return api.post("/courses/create-course", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getCoursesApi = () => {
  return api.get("/courses/get-all-courses");
};

export const getCourseByIdApi = (id) => {
  return api.get(`/courses/get-course/${id}`);
};

export const updateCourseApi = (id, payload) => {
  return api.put(`/courses/update-course/${id}`, payload);
};

export const deleteCourseApi = (id) => {
  return api.delete(`/courses/delete-course/${id}`);
};
