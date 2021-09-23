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
      payload: string[];
    }
  | {
      type: ActionType.LOAD_PRODUCT_ERROR;
      payload: string;
    };
