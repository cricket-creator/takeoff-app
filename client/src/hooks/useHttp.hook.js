import { useCallback, useState } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, method = 'GET', headers = {}, body = {}) => {
    try {
      setLoading(true);
      const response = await fetch(url, { method, headers, body });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      throw e;
    }
  }, [loading, error]);

  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};