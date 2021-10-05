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

export const FormatDate = (x: number) => {
  const date = new Date(x);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Ngày ${day > 9 ? day : `0${day}`}/${
    month > 9 ? month : `0${month}`
  }/${year}`;
};

export const getProductsOfCategory = (products: ProductType[]) => {
  let result: { [key: string]: ProductType[] } = {};
  products.forEach((product) => {
    if (!result[product.CategoryID]) {
      result[product.CategoryID] = [product];
    } else {
      result[product.CategoryID].push(product);
    }
  });

  return result;
};

export const getCategoriesOfMenuItem = (categories: CategoryType[]) => {
  let result: { [key: string]: CategoryType[] } = {};
  categories.forEach((category) => {
    if (!result[category.menuItemId]) {
      result[category.menuItemId] = [category];
    } else {
      result[category.menuItemId].push(category);
    }
  });

  return result;
};
