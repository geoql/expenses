import type { DSVRowArray } from 'd3-dsv';
import type {
  ExpenseFeature,
  ExpenseFeatureCollection,
} from '~/@types/expense';
import * as Comlink from 'comlink';
import { csvParse } from 'd3-dsv';
import { v4 as uuid } from 'uuid';

/**
 * Transforms a CSV to GeoJSON
 * @param {DSVRowArray<string>} payload - CSV data parsed by csvParse()
 * @returns {Promise<ExpenseFeature>} - GeoJSON data
 */
async function transformGeoJSON(
  payload: DSVRowArray<string>,
): Promise<ExpenseFeatureCollection> {
  const geojson = {
    id: uuid().split('-').join(''),
    type: 'FeatureCollection',
    features: [],
  } as ExpenseFeatureCollection;
  for await (const t of payload) {
    geojson.features.push({
      type: 'Feature',
      properties: {
        expense: {
          amount: t.amount,
          description: t.description,
          type: t.type,
        },
        date: parseInt(t.date as string, 10),
      },
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(t?.lng as string) || 0,
          parseFloat(t?.lat as string) || 0,
        ],
      },
    } as unknown as ExpenseFeature);
  }
  return geojson;
}

Comlink.expose({
  async parseDataFile(payload: string): Promise<ExpenseFeatureCollection> {
    const data = csvParse(payload);
    const geojson = await transformGeoJSON(data);
    return geojson;
  },
});
