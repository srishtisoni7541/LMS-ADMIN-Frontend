import api from "../api/axios";

  export async function refreshTokens() {
    const res = await api.post("/auth/refresh", {});
    return res.data; 
  }

  export async function loginApi({ email, password }) {
    const res = await api.post("/auth/login", { email, password });
    return res.data; 
  }

  export async function registerApi(payload) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  }

  export async function editProfileApi(payload) {
    const res = await api.put("/auth/edit-profile", payload);
    return res.data;
  }

  export async function deleteAccountApi() {
    const res = await api.delete("/auth/delete-account");
    return res.data;
  }

  export async function logoutApi() {
    const res = await api.post("/auth/logout");
    return res.data;
  }

export async function forgotPasswordApi(email){
  const res = await api.post('/auth/forgot-password',email);
  return res.data;
}
export async function resetPasswordApi({ token, newPassword }) {
  const res = await api.post(`/auth/reset-password/${token}`, { newPassword });
  return res.data;
}
