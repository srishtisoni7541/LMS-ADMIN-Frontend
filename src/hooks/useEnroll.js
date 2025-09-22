import { useState, useEffect } from "react";
import { getCancelEnrollReqApi } from "../services/enrollmentService";

export const useCancelEnrollRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await getCancelEnrollReqApi();
      setRequests(res.data.message || []);
    } catch (err) {
      setError(err.message || "Failed to fetch cancel requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return { requests, loading, error, reload: loadRequests };
};
