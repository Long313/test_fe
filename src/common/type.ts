export interface ItemType {
  id: number;
  brand: string;
  description: string;
  discountPercentage: string;
  price: number;
  rating: number;
  thumbnail: string;
  title: string;
}

export const capitalizeFirstLetter = (value: any) => {
  if (!value) return;
  return value.charAt(0).toUpperCase() + value.slice(1);
};
