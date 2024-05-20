// import { get } from "../api/APIController";

import { get } from "../api/config/APIController";
// import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./cart";

export const receiveProducts = () => {
  return new Promise((resolve, reject) => {
    get("products/jayJays")
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getTopProducts = () => {
  return new Promise((resolve, reject) => {
    get("topProducts")
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
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

export const receiveProductsById = (id) => {
  let url = `product?productId=${id}`;
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product details response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const receiveProductsByIdByPartNumber = (partNumber) => {
  let newPart = encodeURIComponent(partNumber);
  let url = `product?partNumber=${newPart}`;

  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product details response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const ordersById = (id) => {
  let url = `order?orderId=${id}`;
  return new Promise((resolve, reject) => {
    get(url)
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

export const receiveProductsSearch = (search) => {
  return new Promise((resolve, reject) => {
    get(`search/jayJays?query=${search}`)
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

export const getSearchPrice = (price) => {
  const { min, max } = price;
  return new Promise((resolve, reject) => {
    get(`filters/jayJays/price?minPrice=${min}&maxPrice=${max}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Failed to fetch data"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const receiveGetContent = () => {
  return new Promise((resolve, reject) => {
    get("getContent")
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

export const recieveBannersHome = () => {
  return new Promise((resolve, reject) => {
    let store = "jayJays";
    get(`content/${store}`)
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
