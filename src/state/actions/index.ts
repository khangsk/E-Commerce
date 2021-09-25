import {
  ProductType,
  CategoryType,
  MenuItemType,
  UserType,
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
    };
