import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [location]);

  const handleLoading = () => {
    setLoading(true);
  };

  return { loading, handleLoading };
};

export default useLoading;
