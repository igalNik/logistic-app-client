import { useCallback, useState } from 'react';

function useAsyncError() {
  const [, setError] = useState<Error | null>(null);
  // Return a function that when called with an error, will set state in a way that throws
  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

export default useAsyncError;
