import { useState, useEffect } from 'react';

// Simple hash para generar una clave única a partir del código de la función
const fnHash = (str) => {
  let hash = 5381;
  let i = str.length;
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return (hash >>> 0).toString(36);
};

export const useFetch = (fetchFunction, options = {}) => {
  const { cache = true, cacheTTL = 1000 * 60 * 60 * 24, cacheKey } = options;
  const [data, setData] = useState(null);
  // No activar loading por defecto para evitar spinners en el primer render
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const makeKey = () => {
      if (cacheKey) return `useFetch:${cacheKey}`;
      try {
        const code = fetchFunction.toString();
        return `useFetch:${fnHash(code)}`;
      } catch {
        return `useFetch:default`;
      }
    };

    const key = makeKey();

    // Leer cache inmediatamente para mostrar datos al primer render
    if (cache) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          // respetar TTL si está presente
          if (!parsed.timestamp || Date.now() - parsed.timestamp < cacheTTL) {
            setData(parsed.value);
          } else {
            // stale: eliminar para forzar refresco
            localStorage.removeItem(key);
          }
        }
      } catch (err) {
        console.warn('useFetch: error reading cache', err);
      }
    }

    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        if (!isMounted) return;
        setData(result);
        setError(null);
        if (cache) {
          try {
            localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), value: result }));
          } catch (err) {
            console.warn('useFetch: error writing cache', err);
          }
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || 'Error al cargar datos');
        console.error('Error fetching data:', err);
      } finally {
        // mantener loading false para no bloquear la UI (solo si está montado)
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetchFunction es estable desde apiService

  return { data, loading, error, setData };
};
