import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  // Function to format the date
  const formatProcessedAt = (processedAt) => {
    const date = new Date(processedAt); // Parse ISO 8601 date string
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // for AM/PM format
    };
    return date.toLocaleString("en-GB", options); // 'en-GB' for dd/mm/yyyy format
  };

  return (
    <Box
      className="p-2 shadow-lg hover:shadow-2xl border cursor-pointer "
      onClick={() => navigate(`/account/order/${order?.orderId}`)}
    >
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2}>
          <div>
            <p className="mb-2">#{order?.orderId}</p>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>${parseFloat(order?.grandTotal).toFixed(2)}</p>
        </Grid>
        <Grid item xs={3}>
          <p>{formatProcessedAt(order?.placedDate)}</p>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderCard;
