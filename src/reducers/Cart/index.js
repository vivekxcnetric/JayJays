/***
 *  CART Reducers
 ***/

const initialState = {};
const CartReducerNew = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.cartItems,
      };
    // case "DELETE_CART_ITEMS":
    //   return {
    //     ...state,
    //     cartItems: action.cartItems,
    //   };
    default:
      return state;
  }
};
export default CartReducerNew;
