export type BaseCabin = {
  photo_url?: File;
  name: string;
  description: string;
  capacity: number;
  price: number;
  discount_percent: number;
  discount_amount: number;
};

export type CabinRow = BaseCabin & {
  id: number;
  actions?: undefined;
};
