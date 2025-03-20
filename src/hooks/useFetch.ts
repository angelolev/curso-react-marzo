import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Fallo la API");
        }

        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Ocurrio un error"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
