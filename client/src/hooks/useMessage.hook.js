import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((data) => {
    if (data) alert(data);
  }, []);
};