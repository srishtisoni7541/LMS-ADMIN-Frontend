import api from "../api/axios";

// Issue a new certificate
export const issueCertificateApi = (payload) => {
    console.log(payload);
  // payload should contain: { student: studentId, course: courseId }
  return api.post("/certificate/issue", payload);
};

// Get all certificates (for admin/instructor)
export const getCertificatesApi = () => {
  return api.get("/certificate/get-all-certificates");
};

// Get certificates by student (studentId)
export const getCertificatesByStudentApi = (studentId) => {
  return api.get(`/certificates/student/${studentId}`);
};

// Get certificate by its ID
export const getCertificateByIdApi = (certificateId) => {
  return api.get(`/certificates/${certificateId}`);
};

// Delete certificate by ID
export const deleteCertificateApi = (certificateId) => {
  return api.get(`/certificates/delete/${certificateId}`);
};
