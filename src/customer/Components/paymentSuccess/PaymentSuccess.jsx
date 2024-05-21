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
  const [productDetails, setProductDetails] = useState([]);
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAddress({
      firstName: orderData?.orderItem?.[0]?.firstName,
      lastName: orderData?.orderItem?.[0]?.lastName,
      addressLine: [
        orderData?.orderItem?.[0]?.addressLine[0],
        orderData?.orderItem?.[0]?.addressLine[1],
      ],
      city: orderData?.orderItem?.[0]?.city,
      state: orderData?.orderItem?.[0]?.state,
      zipCode: orderData?.orderItem?.[0]?.zipCode,
      phone1: orderData?.orderItem?.[0]?.phone1,
      email1: orderData?.orderItem?.[0]?.email1,
    });
  }, [orderData]);

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

  // useEffect(() => {
  //   const item = orderData?.orderItem?.map((item) => item) || [];
  //   console.log("item", item);
  //   if (item?.productId) {
  //     receiveProductsById(item.productId).then((res) => {
  //       if (res && res.catalogEntryView && res.catalogEntryView.length > 0) {
  //         const product = res.catalogEntryView[0];
  //         setProductDetails(product);
  //         setLoading(false);
  //       }
  //     });
  //   }
  // }, [orderData]);

  useEffect(() => {
    const items = orderData?.orderItem || [];
    console.log("items", items);

    const status = orderData?.orderStatus;
    // setStatus(status);

    // Check if items array has any product IDs to fetch
    if (items.length > 0) {
      const fetchProductDetails = async () => {
        const products = await Promise.all(
          items.map(async (item) => {
            if (item.productId) {
              // console.log("Fetching details for item", item);
              const res = await receiveProductsById(item.productId);
              if (
                res &&
                res.catalogEntryView &&
                res.catalogEntryView.length > 0
              ) {
                return { ...res.catalogEntryView[0], quantity: item.quantity };
              }
            }
            return null;
          })
        );

        // Filter out any null values and update productDetails
        setProductDetails(products.filter((product) => product !== null));
        setLoading(false);
      };

      fetchProductDetails();
    }
  }, [orderData, productDetails]);
  console.log(localStorage.getItem("address"));
  return (
    <div className="px-2 lg:px-36 py-10">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Order Success! Order ID: {orderId}</AlertTitle>
          Congratulations, Your Order Has Been Placed.
        </Alert>
      </div>

      <OrderTraker activeStep={1} />
      {loading ? (
        <Loader />
      ) : (
        <Grid container className="space-y-5 py-5 pt-20">
          {/* {orderData?.orderItem?.map((item) => ( */}
          {productDetails?.map((item) => (
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
                    src={item?.thumbnail}
                    alt=""
                  />
                  <div className="ml-5 space-y-2">
                    <p className="">{item?.name}</p>
                    <p className="opacity-60 text-xs font-semibold space-x-5">
                      {/* <span>Color: pink</span>  */}
                      <span>Quantity: {parseInt(item?.quantity)}</span>
                    </p>
                    {/* <p>Seller: {item.product.brand}</p> */}
                    <p>${item?.price?.[0]?.value * parseInt(item?.quantity)}</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard
                  // address={JSON.parse(localStorage.getItem("address"))}
                  address={address}
                  title={"Shipping Address"}
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
