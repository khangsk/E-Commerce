import { ProductType } from "../reducers/repositoriesReducer";
import { ActionType } from "../action-types";

export type Action =
  | {
      type: ActionType.LOGIN;
    }
  | {
      type: ActionType.LOGOUT;
    }
  | {
      type: ActionType.LOAD_PRODUCT;
    }
  | {
      type: ActionType.LOAD_PRODUCT_SUCCESS;
      payload: ProductType[];
    }
  | {
      type: ActionType.LOAD_PRODUCT_ERROR;
      payload: string;
    };
