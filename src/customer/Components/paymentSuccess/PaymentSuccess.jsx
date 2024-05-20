import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updatePayment } from "../../../Redux/Customers/Payment/Action";
import { Alert, AlertTitle, Box, Button, Grid } from "@mui/material";
// import { deepPurple } from "@mui/material/colors";
// import StarIcon from "@mui/icons-material/Star";
// import { getOrderById } from "../../../Redux/Customers/Order/Action";
import OrderTraker from "../orders/OrderTraker";
import AddressCard from "../adreess/AdreessCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { getOrderById } from "../../../action/cart";
import { receiveProductsById } from "../../../action";
// import { Margin } from "mdi-material-ui";
import { getCartItems } from "../../../action/cart";
import Loader from "../Loader/Loader";

const PaymentSuccess = () => {
  // razorpay_payment_link_reference_id
  // razorpay_payment_id
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const { orderId } = useParams();

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  const [orderData, setOrderData] = useState({});
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  useEffect(() => {
    // console.log("orderId",orderId)
    // const urlParams = new URLSearchParams(window.location.search);
    // setPaymentId(urlParams.get("razorpay_payment_id"));
    // setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
    // setPaymentStatus(urlParams.get("razorpay_payment_link_status"));

    getOrderById(orderId).then((res) => {
      setOrderData(res);
      console.log("res", res);
    });
  }, []);

  useEffect(() => {
    // if (paymentId && paymentStatus === "paid") {
    //   const data = { orderId, paymentId, jwt };
    //   dispatch(updatePayment(data));
    //   dispatch(getOrderById(orderId));
    // }
  }, [orderId, paymentId]);

  useEffect(() => {
    const item = orderData?.orderItem?.[0];
    console.log("item", item);
    if (item?.productId) {
      receiveProductsById(item.productId).then((res) => {
        if (res && res.catalogEntryView && res.catalogEntryView.length > 0) {
          const product = res.catalogEntryView[0];
          setProductDetails(product);
          setLoading(false);
        }
      });
    }
  }, [orderData]);
  console.log(localStorage.getItem("address"));
  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>order Success orderId {orderId}</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>
        {/* <p style={{ fontSize: 25 }}>Your Order Success OrderId: {orderId}</p>
        <p> Congratulation Your Order Get Placed...!</p> */}
      </div>

      <OrderTraker activeStep={1} />
      {loading ? (
        <Loader />
      ) : (
        <Grid container className="space-y-5 py-5 pt-20">
          {orderData?.orderItem?.map((item) => (
            // {productDetails && (
            <Grid
              container
              item
              className="shadow-xl rounded-md p-5 border"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                {" "}
                <div className="flex  items-center ">
                  <img
                    className="w-[7rem] h-[7rem] object-cover object-top"
                    src={productDetails?.thumbnail}
                    alt=""
                  />
                  <div className="ml-5 space-y-2">
                    <p className="">{productDetails?.name}</p>
                    <p className="opacity-60 text-xs font-semibold space-x-5">
                      {/* <span>Color: pink</span>  */}
                      <span>Quantity: {parseInt(item?.quantity)}</span>
                    </p>
                    {/* <p>Seller: {item.product.brand}</p> */}
                    <p>
                      $
                      {productDetails?.price?.[0]?.value *
                        parseInt(item?.quantity)}
                    </p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard
                  address={JSON.parse(localStorage.getItem("address"))}
                />
                {/* <AddressCard address={localStorage.getItem("address")} /> */}
              </Grid>
            </Grid>
            // )}
          ))}
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            type="submit"
            sx={{ padding: ".8rem 2rem", marginTop: "2rem", margin: "auto" }}
          >
            Home
          </Button>
        </Grid>
      )}
    </div>
  );
};

export default PaymentSuccess;
