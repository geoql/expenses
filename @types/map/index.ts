export type Basemap = {
  type: string;
  enabled: boolean;
  image: string;
  style: string;
};

export type Basemaps = {
  title: 'Basemaps';
  basemaps: Basemap[];
};
