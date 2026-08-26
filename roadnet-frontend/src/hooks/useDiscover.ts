import { useState, useEffect, useCallback } from 'react';
import { discoverApi } from '../api/discover';
import type { DiscoverUser, CompatibilityResult, SearchFiltersState } from '../types';

export function useDiscover() {
  const [users, setUsers] = useState<DiscoverUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityResult | null>(null);

  const fetchUsers = useCallback(async (filters?: SearchFiltersState) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = filters
        ? await discoverApi.search({ ...filters, page: 1, ageMin: 0, ageMax: 100 } as SearchFiltersState & Record<string, unknown>)
        : await discoverApi.getDiscover(page);
      setUsers(res.data.users);
      setTotal(res.data.total);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load users';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const getCompatibility = async (userId: string) => {
    try {
      const res = await discoverApi.getCompatibility(userId);
      setCompatibility(res.data);
      return res.data;
    } catch {
      return null;
    }
  };

  const saveUser = async (userId: string) => {
    await discoverApi.saveUser(userId);
  };

  const unsaveUser = async (userId: string) => {
    await discoverApi.unsaveUser(userId);
  };

  return { users, total, page, setPage, isLoading, error, compatibility, getCompatibility, saveUser, unsaveUser, refetch: fetchUsers };
}
