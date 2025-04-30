import { useMutation, useQuery } from '@tanstack/react-query';

interface DbOptions {
  store?: string;
  id?: string;
  data?: any;
}

export function useDb() {
  const query = useQuery({
    queryKey: ['db'],
    queryFn: async () => {
      const response = await fetch('/api/db?action=getAll');
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({ store, data }: DbOptions) => {
      const response = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store, data }),
      });
      if (!response.ok) throw new Error('Failed to add data');
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ store, id, data }: DbOptions) => {
      const response = await fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ store, id, data }),
      });
      if (!response.ok) throw new Error('Failed to update data');
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ store, id }: DbOptions) => {
      const response = await fetch(`/api/db?store=${store}&id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete data');
      return response.json();
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    add: addMutation.mutate,
    update: updateMutation.mutate,
    remove: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
} 