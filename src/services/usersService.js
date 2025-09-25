import api from "../api/axios";

export async function getAllUsers() {
    const res = await api.get('/auth/all-users');
    // console.log(res.data);
    return res.data;
    
}