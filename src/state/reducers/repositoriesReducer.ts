import { User } from "../../firebase";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface UserType {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  order: Array<ItemOrderType>;
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
  Promotion: string[];
}

export interface ProductType {
  ProductID: string;
  CategoryID: string;
  Name: string;
  Price: number;
  Discount: number;
  Description: string;
  image: string;
  Producer: string;
  Source: string;
  Star: number;
}

export interface ItemOrderType {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalAmount: number;
}

interface RepositoriesState {
  isLoggedIn: boolean;
  products: ProductType[];
  categories: CategoryType[];
  menuItems: MenuItemType[];
  token: string;
  user: UserType;
  productsOrder: ItemOrderType[];
}

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
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
    order: [],
  },
  productsOrder: [],
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
        productsOrder: action.payload[1].order,
      };

    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
        isLoggedIn: false,
        products: state.products,
        categories: state.categories,
        menuItems: state.menuItems,
      };

    case ActionType.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        productsOrder: action.payload.order,
      };

    case ActionType.LOAD_PRODUCT:
      return {
        ...state,
        products: action.payload[0],
        categories: action.payload[1],
        menuItems: action.payload[2],
      };

    case ActionType.ORDER:
      const newProduct = state.productsOrder.find(
        (el) => el.productId === action.payload.productId
      );

      (async () => {
        const snapshot = await User.doc(state.user.id).get();
        const data = snapshot.data();
        if (data) {
          const order = data.order;
          const item = order.find(
            (el: ItemOrderType) => el.productId === action.payload.productId
          );

          if (item) {
            item.quantity += action.payload.quantity;
            item.totalAmount = item.quantity * item.price;
            User.doc(state.user.id).update({
              order,
            });
          } else {
            User.doc(state.user.id).update({
              order: [...order, action.payload],
            });
          }
        }
      })();

      if (newProduct) {
        newProduct.quantity += action.payload.quantity;
        newProduct.totalAmount = newProduct.price * newProduct.quantity;
        return state;
      }

      return {
        ...state,
        productsOrder: [...state.productsOrder, action.payload],
      };

    case ActionType.UPDATE_ORDER:
      (async () => {
        const snapshot = await User.doc(state.user.id).get();
        const data = snapshot.data();
        if (data) {
          const order = data.order;
          if (action.payload.quantity === 0) {
            const newOrder = order.filter(
              (el: ItemOrderType) => el.productId !== action.payload.productId
            );
            User.doc(state.user.id).update({
              order: newOrder,
            });
          } else {
            const item = order.find(
              (el: ItemOrderType) => el.productId === action.payload.productId
            );

            if (item) {
              item.quantity = action.payload.quantity;
              item.totalAmount = item.price * item.quantity;
              User.doc(state.user.id).update({
                order,
              });
            }
          }
        }
      })();

      if (action.payload.quantity === 0) {
        const newProductsOrder = state.productsOrder.filter(
          (el: ItemOrderType) => el.productId !== action.payload.productId
        );

        return {
          ...state,
          productsOrder: newProductsOrder,
        };
      }

      const productUpdate = state.productsOrder.find(
        (el: ItemOrderType) => el.productId === action.payload.productId
      );

      if (productUpdate) {
        productUpdate.quantity = action.payload.quantity;
        productUpdate.totalAmount =
          productUpdate.price * productUpdate.quantity;
      }
      return state;

    default:
      return state;
  }
};

export default reducer;
