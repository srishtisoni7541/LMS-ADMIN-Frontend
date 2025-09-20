import api from "../api/axios";

export const createModuleApi = (payload) => {
  return api.post("/module/create-module", payload); 
};

export const getModulesApi = () => {
  return api.get("/module/all-modules");
};
