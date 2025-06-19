export type BaseCabin = {
  photo_url?: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  discount_percent: number;
};

export type CabinRow = BaseCabin & {
  id: number;
  actions?: undefined;
};
