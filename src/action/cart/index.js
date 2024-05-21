// import { get } from "../api/APIController";

import { getOrdersSuccess } from "../../Redux/Admin/Orders/ActionCreator";
import store from "../../Redux/Store";
import { deleteCall, get, post, putCall } from "../../api/config/APIController";

export const getCartItems = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("cart")
        .then((response) => {
          if (response.status === 200) {
            // console.log("this is new cart response", response.data);
            dispatch({
              type: "GET_CART_ITEMS",
              cartItems: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          dispatch({
            type: "GET_CART_ITEMS",
            cartItems: {},
          });
          reject(error);
        })
        .finally();
    });
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

export const getCutomerOrdersNew = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("orders")
        .then((response) => {
          if (response.status === 200) {
            // console.log("this getCutomerOrdersNew", response.data);
            dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
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

export const AddItemToCartNew = (id, quantity) => {
  let data = {
    partNumber: id,
    quantity: `${quantity}`,
  };
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    post("cart", data)
      .then((response) => {
        if (response.status === 201) {
          // console.log("this getCutomerOrdersNew", response.data);
          store.dispatch({
            type: "GET_ORDER_HISTORY_NEW",
            order: response?.data,
          });
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
  // };
};

export const RemoveCartItemNew = (orderId, orderItemId) => {
  // let url = `cart?lineId=${id}`;
  let data = {
    orderId: orderId,
    orderItemId: orderItemId,
  };
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteCall("cart", data)
      .then((response) => {
        if (response.status === 200) {
          // console.log("this getCutomerOrdersNew", response.data);
          // dispatch({
          //   type: "GET_ORDER_HISTORY_NEW",
          //   order: response?.data,
          // });
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};
// };

export const updateCartQtyNEW = (orderId, orderItemId, productId, qty) => {
  let params = {
    orderId: orderId,
    orderItemId: orderItemId,
    productId: productId,
    quantity: qty,
  };

  return new Promise((resolve, reject) => {
    putCall(`cart`, params)
      .then((response) => {
        if (response.status === 200) {
          // store.dispatch({
          //   type: "GET_CART_ITEMS",
          //   items: response?.data,
          // });
          resolve(response?.data);
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      })
      .finally();
  });
};

export const placeOrder = async (data) => {
  return new Promise((resolve, reject) => {
    return post("checkout", data)
      .then((res) => {
        getCartItems();
        resolve(res);
        // getCustomerLoginCart();
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const getChildCategories = (id) => {
  return new Promise((resolve, reject) => {
    get(`childCategories?categoryId=${id}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getAddresses = () => {
  return new Promise((resolve, reject) => {
    get("addresses")
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const addNewAddress = (datas) => {
  let timestamp = new Date().getTime(); // Get current timestamp
  let randomString = Math.random().toString(36).substring(7); // Generate random string
  let data = {
    firstName: datas.firstName,
    lastName: datas.lastName,
    city: datas.city,
    country: datas.country,
    state: datas.state,
    zipCode: datas.zipCode,
    phone1: datas.mobile,
    nickName: `${datas.firstName} ${timestamp}${randomString}`,
    email1: datas.firstName + randomString + "@gmail.com",
    addressLine: [datas.streetLine1, datas.streetLine2],
  };
  return new Promise((resolve, reject) => {
    post("address", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

// export const setShipInfo = (shipModeId, orderItemId, addressId) => {
//   let data = {
//     shipModeId,
//     orderItemId,
//     addressId,
//   };
//   return new Promise((resolve, reject) => {
//     putCall("setShipping", data)
//       .then((response) => {
//         if (response.status === 201) {
//           resolve(response.data);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       })
//       .finally();
//   });
// };

export const setShipInfo = (datas) => {
  return new Promise((resolve, reject) => {
    putCall("setShipping2", datas)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const postPayment = (datas, amount, id) => {
  let data = {
    piAmount: amount,
    billing_address_id: id,
    payMethodId: "MasterCard",
    account: datas.number,
    expire_month: "04",
    expire_year: "2026",
    cc_cvc: datas.cvc,
    cc_brand: "MasterCard",
  };
  return new Promise((resolve, reject) => {
    post("payment", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const putPreCheckout = (id) => {
  let data = {
    orderId: id,
  };
  return new Promise((resolve, reject) => {
    putCall("preCheckout", data)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const checkout = (id) => {
  let data = {
    orderId: id,
  };
  return new Promise((resolve, reject) => {
    post("checkout", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getOrderById = (id) => {
  return new Promise((resolve, reject) => {
    get(`order?orderId=${id}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getOrders = () => {
  return new Promise((resolve, reject) => {
    get("orders")
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(getOrdersSuccess(response.data));
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getProductsByFilter = () => {
  return new Promise((resolve, reject) => {
    get(`filters/jayJays`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};
