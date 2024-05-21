import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  RemoveCartItemNew,
  getCartItems,
  handleRemoveItemFromCart,
} from "../../../action/cart";
import { grey } from "@mui/material/colors";
import {
  receiveProductsById,
  receiveProductsByIdByPartNumber,
} from "../../../action/index";
import { SetMealOutlined } from "@mui/icons-material";
import Loader from "../Loader/Loader";
const CartItem = ({
  item,
  showButton,
  handleRemoveItemFromCart,
  handleUpdateCartMinus,
  handleUpdateCartPlus,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [productDetails, setProductDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  // const { cartItems } = useSelector((store) => store);

  // const handleRemoveItemFromCart = () => {

  //   RemoveCartItemNew(item.id).then((res)=>{
  //     dispatch(getCartItems());

  //   })
  // };
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
      jwt,
    };
    // console.log("update data ", data);
    dispatch(updateCartItem(data));
  };

  useEffect(() => {
    if (item.productId) {
      receiveProductsByIdByPartNumber(item.partNumber).then((res) => {
        if (res && res.catalogEntryView && res.catalogEntryView.length > 0) {
          const product = res.catalogEntryView[0];
          setProductDetails(product);
          setLoading(false);
        }
      });
    }
  }, [item.productId]);

  console.log("productDetails", productDetails);
  return (
    <div className="p-5 shadow-lg border rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          {productDetails && (
            <div className="flex items-center">
              <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
                <img
                  className="w-full h-full object-cover object-top"
                  src={productDetails?.thumbnail}
                  alt=""
                />
              </div>
              <div className="ml-5 space-y-1">
                <p className="font-semibold">{productDetails?.name}</p>
                {/* <p className="opacity-70">Size: {item?.size},White</p>
         <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p> */}
                <p className="opacity-60 text-sm font-semibold space-x-5">
                  {/* <span>Color: pink</span>  */}
                  Quantity: {parseInt(item?.quantity)}
                </p>
                <div className="flex space-x-2 items-center pt-3">
                  <p className="opacity-50 line-through">
                    {/* ${productDetails?.price?.[0]?.value} */}
                  </p>
                  <p className="font-semibold text-lg">
                    $
                    {parseInt(item.quantity) *
                      productDetails?.price?.[0]?.value}
                  </p>
                  {/* <p className="text-green-600 font-semibold">10% off</p> */}
                </div>
              </div>
            </div>
          )}

          {showButton && (
            <div className="lg:flex items-center lg:space-x-10 pt-4">
              <div className="flex items-center space-x-2 ">
                <IconButton
                  onClick={(e) =>
                    handleUpdateCartMinus(
                      e,
                      item.orderItemId,
                      item.productId,
                      item.quantity
                    )
                  }
                  disabled={item?.quantity <= 1}
                  color="primary"
                  aria-label="add an alarm"
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>

                <span className="py-1 px-7 border rounded-sm">
                  {parseInt(item?.quantity)}
                </span>
                <IconButton
                  onClick={(e) =>
                    handleUpdateCartPlus(
                      e,
                      item.orderItemId,
                      item.productId,
                      item.quantity
                    )
                  }
                  color="primary"
                  aria-label="add an alarm"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
                <Button
                  onClick={(e) => handleRemoveItemFromCart(e, item.orderItemId)}
                  variant="contained"
                  sx={{ bgcolor: grey[900] }}
                >
                  Remove{" "}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartItem;
