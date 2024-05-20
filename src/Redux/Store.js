import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./Auth/Reducer";
import customerProductReducer from "./Customers/Product/Reducer";
import productReducer from "./Admin/Product/Reducer";
import cartReducer from "./Customers/Cart/Reducer";
import { orderReducer } from "./Customers/Order/Reducer";
import adminOrderReducer from "./Admin/Orders/Reducer";
import ReviewReducer from "./Customers/Review/Reducer";
import CartReducerNew from "../../src/reducers/Cart/index";

import CUSTOMERReducerNew from "../../src/reducers/Customer/index";
import OrderHistoryReducerNew from "../../src/reducers/OrderHistory/index";

const rootReducers = combineReducers({
  auth: authReducer,
  customersProduct: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  review: ReviewReducer,
  cartItems: CartReducerNew,
  newUser: CUSTOMERReducerNew,
  newOrder: OrderHistoryReducerNew,

  // admin
  adminsProduct: productReducer,
  adminsOrder: adminOrderReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const stateFilter = Object.assign({}, state);
    const blackList = ["filters"];

    blackList.forEach((item) => {
      delete stateFilter[item];
    });
    const serializedState = JSON.stringify(stateFilter);

    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};
const peristedState = loadState();

export const store = legacy_createStore(
  rootReducers,
  peristedState,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  saveState(store.getState());
});
export default store;
