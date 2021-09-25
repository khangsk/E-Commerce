import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface UserType {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
}

export interface MenuItemType {
  menuItemId: string;
  name: string;
  isDeleted: boolean;
  categories: CategoryType[];
}

export interface CategoryType {
  categoryId: string;
  menuItemId: string;
  name: string;
  isDeleted: boolean;
  products: ProductType[];
}

export interface ProductType {
  ProductID: string;
  CategoryID: string;
  Name: string;
  Price: number;
  Discount: number;
  Description: string;
  image: string;
}

interface RepositoriesState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  products: ProductType[];
  categories: CategoryType[];
  menuItems: MenuItemType[];
  token: string;
  user: UserType;
}

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  products: [],
  categories: [],
  menuItems: [],
  token: localStorage.getItem("token") ?? "",
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload[0],
        user: action.payload[1],
      };
    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return { ...state, isLoggedIn: false, token: "" };
    case ActionType.LOAD_USER:
      return { ...state, user: action.payload };
    case ActionType.LOAD_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null,
        products: action.payload[0],
        categories: action.payload[1],
        menuItems: action.payload[2],
      };
    default:
      return state;
  }
};

export default reducer;
