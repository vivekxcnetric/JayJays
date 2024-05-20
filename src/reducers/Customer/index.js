/***
 *  CART Reducers
 ***/

const initialState = {};
const CUSTOMERReducerNew = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_NEW":
      return {
        ...state,
        newUser: action.user,
      };

    default:
      return state;
  }
};
export default CUSTOMERReducerNew;
