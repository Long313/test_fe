import { ItemType } from "./type";

export const capitalizeFirstLetter = (value: any) => {
  if (!value) return;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const sortListProduct = (name: string, list: ItemType[]) => {
  const result = [...list];
  switch (name) {
    case "":
      return result;
    case "name":
      const listA = result.sort((a: any, b: any) => {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        return nameA < nameB ? -1 : 0;
      });
      return listA;
    case "increase":
      const listB = result.sort((a: any, b: any) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceA - priceB;
      });
      return listB;
    case "decrease":
      const listC = result.sort((a: any, b: any) => {
        const priceA = a.price;
        const priceB = b.price;
        return priceB - priceA;
      });
      return listC;
    default:
      return result;
  }
};
