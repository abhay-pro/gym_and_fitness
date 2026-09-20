import { useState, useEffect, useCallback } from 'react';
import { gymApi } from '../api/gymApi';

export function useGymData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await gymApi.fetchAllGymData();
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to fetch gym data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
}
