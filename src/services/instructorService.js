import api from "../api/axios";

export async function getAllInstructors() {
    const res = await api.get('/instructor/all-instructors');
    return res.data;
    
}
export async function makeInstructor (id){
    const res = await api.post(`/instructor/make-instructor/${id}`);
    return res.data;
}