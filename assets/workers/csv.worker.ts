import type {
  ExpenseFeature,
  ExpenseFeatureCollection,
  CSVParse,
} from '~/@types/expense';
import * as Comlink from 'comlink';
import { parse } from 'papaparse';
import { v4 as uuid } from 'uuid';

/**
 * Transforms a CSV to GeoJSON
 * @param {CSVParse[]} payload - CSV data parsed by csvParse()
 * @returns {Promise<ExpenseFeature>} - GeoJSON data
 */
async function transformGeoJSON(
  payload: CSVParse[],
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
    const { data } = parse(payload, {
      header: true,
    });
    const geojson = await transformGeoJSON(data as CSVParse[]);
    return geojson;
  },
});
