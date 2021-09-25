import {
  CategoryType,
  ProductType,
} from "../state/reducers/repositoriesReducer";

export const FormatAmount = (amount: number) => {
  let result = "";
  let counter = 0;
  while (amount !== 0) {
    if (counter === 3) {
      result = "." + result;
      counter = 0;
    }
    result = (amount % 10) + result;
    amount = Math.floor(amount / 10);
    counter++;
  }

  return result + "đ";
};

export const getAllProducts = (categories: CategoryType[]) => {
  const result: ProductType[] = [];
  categories
    .filter((el) => el && el.products)
    .map((el) => result.push(...el.products));
  return result;
};
