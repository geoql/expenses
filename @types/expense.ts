export type ExpenseForm = {
  amount: number | undefined;
  description: string;
  type: 'debit' | 'credit';
};

export type ExpenseFeature = {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    expense: ExpenseForm;
    date: number;
  };
};

export type ExpenseFeatureCollection = {
  id: string;
  type: 'FeatureCollection';
  features: ExpenseFeature[];
};
