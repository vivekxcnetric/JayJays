/***
 *  CART Reducers
 ***/

const initialState = {};
const OrderHistoryReducerNew = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_HISTORY_NEW":
      return {
        ...state,
        orderNew: action.order,
      };

    default:
      return state;
  }
};
export default OrderHistoryReducerNew;
