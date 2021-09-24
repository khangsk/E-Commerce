import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface ProductType {
  ProductID: number;
  CategoryID: number;
  Name: string;
  Price: number;
  Discount: number;
  Description: string;
  image: string;
  isDeleted: boolean;
}

interface RepositoriesState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  data: ProductType[];
}

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  data: [
    {
      ProductID: 1,
      CategoryID: 2,
      Name: "Giày Mizuno Basara Pro TF",
      Price: 1194000,
      Discount: 0.2,
      Description:
        "Giày đá bóng Mizuno Basara Pro TF là mẫu giày sân cỏ nhân tạo cao cấp,  mang những đặc điểm thiết kế chuyên biệt phù hợp với những người có lối chơi bóng tốc độ và kỹ thuật.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/e-commerce-59b80.appspot.com/o/images%2Fmizuno-basara-sala-pro-tf-0_large.jpg?alt=media&token=6acb67cd-f960-4ed7-b82a-103badd732cf",
      isDeleted: false,
    },
  ],
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
