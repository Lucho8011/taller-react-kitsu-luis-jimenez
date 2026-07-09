import { useState, useEffect } from 'react';

/**
 * Hook para consultar la API de Kitsu.
 * Soporta reemplazo de resultados en búsquedas nuevas y anexado para paginación.
 */
export const useFetch = (url, options = {}) => {
  const { append = false, resetKey = '' } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error('Error de conexión con la API');
        }

        const result = await response.json();
        const incomingData = Array.isArray(result.data) ? result.data : [];

        setData((prevData) => {
          if (!append || !Array.isArray(prevData)) {
            return incomingData;
          }

          // Evita duplicados al anexar páginas consecutivas de resultados.
          const existingIds = new Set(prevData.map((anime) => anime.id));
          const newItems = incomingData.filter((anime) => !existingIds.has(anime.id));
          return [...prevData, ...newItems];
        });
        setNextPage(result.links?.next || null);
      } catch (err) {
        if (err.name === 'AbortError') return;

        setError(err.message);
        setData([]);
        setNextPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [append, resetKey, url]);

  return { data, loading, error, nextPage };
};
