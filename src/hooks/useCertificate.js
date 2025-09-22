import { useSelector, useDispatch } from "react-redux";
import {
  setCertificates,
  addCertificate,
  setSelectedCertificate,
  removeCertificate,
  setLoading,
  setError,
} from "../reducers/certificateSlice";

export const useCertificate = () => {
  const dispatch = useDispatch();
  const { certificates, selectedCertificate, loading, error } = useSelector(
    (state) => state.certificates
  );

  // Set all certificates
  const setAllCertificates = (data) => {
    dispatch(setCertificates(data));
  };

  // Add new certificate
  const addNewCertificate = (data) => {
    dispatch(addCertificate(data));
  };

  // Select a certificate
  const selectCertificate = (certificate) => {
    dispatch(setSelectedCertificate(certificate));
  };

  // Delete certificate from state
  const deleteCertificate = (certificateId) => {
    dispatch(removeCertificate(certificateId));
  };

  // Loading state
  const setLoadingState = (value) => {
    dispatch(setLoading(value));
  };

  // Error state
  const setErrorState = (value) => {
    dispatch(setError(value));
  };

  return {
    certificates,
    selectedCertificate,
    loading,
    error,
    setAllCertificates,
    addNewCertificate,
    selectCertificate,
    deleteCertificate,
    setLoadingState,
    setErrorState,
  };
};
