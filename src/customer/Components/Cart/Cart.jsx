import React from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import {
  RemoveCartItemNew,
  getCartItems,
  updateCartQtyNEW,
} from "../../../action/cart";
import { useState } from "react";
import { useCallback } from "react";
import { grey } from "@mui/material/colors";
import EmptyCart from "./EmptyCart";
import Loader from "../Loader/Loader";

//

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems);
  const [loading, setLoading] = useState(true);
  // console.log("cart ", cartItems.cartItems);

  // useEffect(() => {
  //   dispatch(getCart(jwt));
  // }, [jwt]);
  // getCartItems().then((res) => {
  //   console.log("this is cart response in cart page", res.cart);
  //   setCartData(res.cart);
  // })

  const handleRemoveItemFromCart = (e, id) => {
    e.preventDefault();
    // const data = { cartItemId: item?._id, jwt };
    // dispatch(removeCartItem(data));
    RemoveCartItemNew(cartItems?.cartItems?.orderId, id).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartPlus = (e, id, productId, qty) => {
    e.preventDefault();

    updateCartQtyNEW(
      cartItems?.cartItems?.orderId,
      id,
      productId.toString(),
      parseFloat((parseInt(qty) + 1).toFixed(1)).toString()
    ).then((res) => {
      dispatch(getCartItems());
    });
  };

  const handleUpdateCartMinus = (e, id, productId, qty) => {
    e.preventDefault();

    if (qty != 1) {
      updateCartQtyNEW(
        cartItems?.cartItems?.orderId,
        id,
        productId.toString(),
        parseFloat((parseInt(qty) - 1).toFixed(1)).toString()
      ).then((res) => {
        dispatch(getCartItems());
      });
    } else {
      handleRemoveItemFromCart(e, id);
    }
  };

  useEffect(() => {
    dispatch(getCartItems());

    setLoading(false);
  }, [
    dispatch,
    CartData?.cartItems?.orderItem?.length,
    CartData?.cartItems?.orderItem,
  ]);

  return (
    <div className="">
      {CartData?.cartItems?.orderItem?.length > 0 ? (
        loading ? (
          <Loader />
        ) : (
          <>
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
              <div className="lg:col-span-2 lg:px-5 bg-white">
                <div className=" space-y-3">
                  {cartItems?.cartItems?.orderItem?.map((item) => (
                    <>
                      <CartItem
                        item={item}
                        orderId={cartItems?.cartItems?.orderId}
                        showButton={true}
                        handleRemoveItemFromCart={handleRemoveItemFromCart}
                        handleUpdateCartPlus={handleUpdateCartPlus}
                        handleUpdateCartMinus={handleUpdateCartMinus}
                      />
                    </>
                  ))}
                </div>
              </div>
              <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
                <div className="border p-5 bg-white shadow-lg rounded-md">
                  <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
                  <hr />

                  <div className="space-y-3 font-semibold">
                    <div className="flex justify-between pt-3 text-black ">
                      {/* <span>Price ({cart.cart?.totalItem} item)</span>
              <span>₹{cart.cart.totalPrice}</span> */}
                      <span>
                        Price ({cartItems?.cartItems?.cart?.totalQuantity}/
                        item)
                      </span>
                      <span>
                        $
                        {parseFloat(cartItems?.cartItems?.grandTotal).toFixed(
                          2
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      {/* <span className="text-green-700">-₹{cart.cart?.discounte}</span> */}
                      <span className="text-green-700">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-green-700">Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      {/* <span className="text-green-700">₹{cart.cart?.totalDiscountedPrice}</span> */}
                      <span className="text-green-700">
                        $
                        {parseFloat(cartItems?.cartItems?.grandTotal).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/checkout?step=2")}
                    variant="contained"
                    type="submit"
                    sx={{
                      padding: ".8rem 2rem",
                      marginTop: "2rem",
                      width: "100%",
                      bgcolor: grey[900],
                    }}
                  >
                    Check Out
                  </Button>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
