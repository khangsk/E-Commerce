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
  orderHistory: Array<OrderHistoryType>;
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

export interface OrderHistoryType {
  userId: string;
  name: string;
  phone: string;
  address: string;
  order: ItemOrderType[];
  date: string;
}

interface RepositoriesState {
  isLoggedIn: boolean;
  products: ProductType[];
  categories: CategoryType[];
  menuItems: MenuItemType[];
  token: string;
  user: UserType;
  productsOrder: ItemOrderType[];
  orderHistory: OrderHistoryType[];
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
    orderHistory: [],
  },
  productsOrder: [],
  orderHistory: [],
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
      User.doc(state.user.id).update({
        order: action.payload,
      });
      return {
        ...state,
        productsOrder: action.payload,
      };

    case ActionType.CHECKOUT:
      User.doc(state.user.id).update({
        order: [],
        orderHistory: [...state.orderHistory, action.payload],
      });
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.payload],
        productsOrder: [],
      };
    default:
      return state;
  }
};

export default reducer;
