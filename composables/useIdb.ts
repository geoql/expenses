import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { MyDB } from '~/types/expense';

/**
 * Composable for using idb
 *
 * @returns {Promise<IDBPDatabase<MyDB>>} - The IndexDB database
 */
async function useIdb(): Promise<IDBPDatabase<MyDB>> {
  const db = await openDB<MyDB>('db', 1, {
    upgrade(db) {
      // Create Language Store
      const expenseStore = db.createObjectStore('expenses', {
        keyPath: 'id',
      });
      expenseStore.createIndex('by-id', 'id');
    },
  });
  return db;
}

export { useIdb };
