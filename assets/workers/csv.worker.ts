import type { DSVRowArray } from 'd3-dsv';
import type {
  ExpenseFeature,
  ExpenseFeatureCollection,
} from '~/@types/expense';
import { csvParse } from 'd3-dsv';

/**
 * Waits for some seconds.
 *
 * @param {number} ms - milliseconds to wait
 * @returns {Promise<void>}
 */
function snooze(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

addEventListener('message', async (event: MessageEvent) => {
  const { payload, sleep } = event.data.message;
  await snooze(sleep);
  const data = csvParse(payload);
  const geojson = await transformGeoJSON(data);
  postMessage(geojson);
});

/**
 * Transforms a CSV to GeoJSON
 *
 * @param {DSVRowArray<string>} payload - CSV data parsed by csvParse()
 * @returns {Promise<ExpenseFeature>} - GeoJSON data
 */
async function transformGeoJSON(
  payload: DSVRowArray<string>,
): Promise<ExpenseFeatureCollection> {
  const geojson = {
    id: useUuid(),
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
  console.log('built geojson: ', geojson);
  return geojson;
}
