import { get, post } from "../../api/config/APIController";
import LocalStorageService from "../../storage/LocalStorageService";

export const getCartItems = () => {
  return new Promise((resolve, reject) => {
    get("login")
      .then((response) => {
        if (response.status === 200) {
          if (response.data.token) {
          }
          LocalStorageService.setUserAuthAccessToken(response.data.token);
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getCustomerNew = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      post("login", data)
        .then((response) => {
          if (response.status === 201) {
            // console.log("this is details", response.data);
            LocalStorageService.setWcToken(response.data.WCToken);

            LocalStorageService.setWcTrustedToken(response.data.WCTrustedToken);
            dispatch({
              type: "GET_CUSTOMER_NEW",
              user: response?.data,
            });

            window.location.replace("/");
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  };
};

export const getCustomerInfo = () => {
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    get("info")
      .then((response) => {
        if (response.status === 200) {
          // if (response.data.token) {
          // }
          // LocalStorageService.setUserAuthAccessToken(response.data.token);
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
  // };
};

export const logoutCustomer = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CUSTOMER_NEW",
      user: {},
    });
    LocalStorageService.clearToken();
    localStorage.clear();
    window.location.replace("/");
  };
};

// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };
