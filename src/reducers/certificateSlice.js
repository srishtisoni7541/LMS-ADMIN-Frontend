import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certificates: [],
  selectedCertificate: null,
  loading: false,
  error: null,
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    setCertificates: (state, action) => {
      state.certificates = action.payload;
    },
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
    },
    setSelectedCertificate: (state, action) => {
      state.selectedCertificate = action.payload;
    },
    removeCertificate: (state, action) => {
      state.certificates = state.certificates.filter(
        (cert) => cert._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCertificates,
  addCertificate,
  setSelectedCertificate,
  removeCertificate,
  setLoading,
  setError,
} = certificateSlice.actions;

export default certificateSlice.reducer;
