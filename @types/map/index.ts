/* eslint-disable camelcase */
export type Basemap = {
  type: string;
  enabled: boolean;
  source: string;
  image: string;
  style: string;
};

export type Basemaps = {
  title: 'Basemaps';
  basemaps: Basemap[];
};

export type SearchResult = {
  lat: number;
  lng: number;
  zoom: number;
  label: string;
};

export type GeocodedFeature = {
  place_name: string;
  center: number[];
  place_type: string;
};
