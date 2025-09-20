import api from "../api/axios";

export const createModuleApi = (payload) => {
  return api.post("/module/create-module", payload); 
};

export const getModulesApi = () => {
  return api.get("/module/all-modules");
};

export const updateModuleApi = (id, payload) => {
  return api.put(`/module/update-module/${id}`, payload);
};
export const getModuleByIdApi= (id)=>{
  return api.get(`/module/get-module-by-id/${id}`);
}

