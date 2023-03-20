import type { StyleSpecification } from 'maplibre-gl';

export type Basemap = {
  id: string;
  type: string;
  enabled: boolean;
  source: string;
  image: string;
  style: StyleSpecification | string;
};

export type Basemaps = {
  id: string;
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
