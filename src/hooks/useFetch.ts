import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

type UseFetchReturn<T> = {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
};

type UseSuspendedFetchReturn<T> = {
  data: T;
};

export function useFetch<T>(url: string): UseFetchReturn<T> {
  const { data, isLoading, error }: UseQueryResult<T, Error> = useQuery({
    queryKey: ["fetch", url],
    queryFn: async ({ signal }): Promise<T> => {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`Fetch error! status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    },
    staleTime: Infinity,
    retry: 3,
  });

  return { data, isLoading, error };
}

export function useSuspensedFetch<T>(url: string): UseSuspendedFetchReturn<T> {
  const { data } = useSuspenseQuery({
    queryKey: ["fetch", url],
    queryFn: async ({ signal }): Promise<T> => {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`Fetch error! status: ${res.status}`);
      }
      const result = await res.json();
      return result;
    },
    staleTime: Infinity,
    retry: 3,
  });

  return { data };
}

export default useFetch;
