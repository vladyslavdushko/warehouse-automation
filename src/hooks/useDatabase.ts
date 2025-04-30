'use client';

import { useEffect, useState } from 'react';
import { getDB, initializeDatabase } from '@/lib/db';

export function useDatabase() {
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function setupDatabase() {
      try {
        const database = await getDB();
        await initializeDatabase();
        setDb(database);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    setupDatabase();
  }, []);

  return { db, isLoading, error };
} 