import { ActionType } from "../action-types";
import { Action } from "../actions";

interface RepositoriesState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  data: string[];
}

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  data: [],
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.LOGIN:
      return { ...state, isLoggedIn: true };
    case ActionType.LOGOUT:
      return { ...state, isLoggedIn: false };
    case ActionType.LOAD_PRODUCT:
      return { ...state, loading: true, error: null, data: [] };
    case ActionType.LOAD_PRODUCT_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case ActionType.LOAD_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
