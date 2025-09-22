import api from "../api/axios";

export const getCancelEnrollReqApi = () => {
  return api.get("/enrollment/get-cancel-requests");
};
export const approveCancelReqApi = ()=>{
    return "hello";
}

export const rejectCancelReqApi = ()=>{
    return "hello";
}