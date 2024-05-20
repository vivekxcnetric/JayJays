import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../action/cart";
import OrderDetails from "./OrderDetails";
import Loader from "../Loader/Loader";

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order, newOrder } = useSelector((store) => store);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((res) => {
        setInfo(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer info:", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box className="px-10">
            <Grid
              container
              spacing={0}
              sx={{ justifyContent: "space-between", flexDirection: "column" }}
            >
              <Grid item xs={12}>
                <Box className="space-y-5 ">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Order History
                  </h1>
                  <Grid
                    spacing={2}
                    container
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Grid item xs={2}>
                      <strong>Order ID</strong>
                    </Grid>
                    <Grid item xs={2}>
                      <strong>Total Amount</strong>
                    </Grid>
                    <Grid item xs={3}>
                      <strong>Placed At</strong>
                    </Grid>
                  </Grid>
                  {info?.Order?.length > 0 &&
                    info?.Order.map((order) => (
                      <OrderCard order={order} key={order.orderId} />
                    ))}
                </Box>
              </Grid>
            </Grid>
            <OrderDetails />
          </Box>
        </>
      )}
    </>
  );
};

export default Order;
