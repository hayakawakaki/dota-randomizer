import { useState, useEffect, useRef } from 'react';

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setError(null);
      setLoading(true);

      try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
          throw new Error(`Fetch error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        if (!signal.aborted) {
          setError(err instanceof Error ? err.message : 'Fetch aborted');
          console.error('Fetch failed:', err);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;