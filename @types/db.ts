import type { DBSchema } from 'idb';
import { Basemaps } from './map';
import { ExpenseFeatureCollection } from './expense';

export interface MyDB extends DBSchema {
  expenses: {
    value: ExpenseFeatureCollection;
    key: string;
    indexes: { 'by-id': string };
  };
  basemaps: {
    value: Basemaps;
    key: string;
    indexes: { 'by-id': string };
  };
}
