import {
  ProductType,
  CategoryType,
  MenuItemType,
  UserType,
  ItemOrderType,
  OrderHistoryType,
  CommentType,
} from "../reducers/repositoriesReducer";
import { ActionType } from "../action-types";

export type Action =
  | {
      type: ActionType.LOGIN;
      payload: [string, UserType];
    }
  | {
      type: ActionType.LOGOUT;
    }
  | {
      type: ActionType.LOAD_USER;
      payload: UserType;
    }
  | {
      type: ActionType.LOAD_PRODUCT;
      payload: [ProductType[], CategoryType[], MenuItemType[]];
    }
  | {
      type: ActionType.ORDER;
      payload: ItemOrderType;
    }
  | {
      type: ActionType.UPDATE_ORDER;
      payload: ItemOrderType[];
    }
  | {
      type: ActionType.CHECKOUT;
      payload: OrderHistoryType;
    }
  | {
      type: ActionType.ADD_COMMENT;
      payload: CommentType;
    }
  | {
      type: ActionType.ADMIN_DELETE_PRODUCT;
      payload: string;
    };
