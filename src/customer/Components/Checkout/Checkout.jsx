import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";

const steps = ["Login", "Delivery Adress", "Order Summary", "Payment"];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(1);
  const [skipped, setSkipped] = React.useState(new Set());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const step = queryParams.get("step");
  const navigate = useNavigate();
  const [data, setData] = React.useState({});

  console.log("step", step);

  const handleNext = () => {
    let newSkipped = skipped;
    const nextStep = Math.min(parseInt(step) + 1, 4); // Clamp step to maximum value of 4
    setActiveStep(nextStep);
    navigate(`/checkout?step=${nextStep}`);

    setSkipped(newSkipped);
  };

  const handleBack = (datas) => {
    setData(datas);
    const prevStep = Math.max(parseInt(step) - 1, 2); // Clamp step to minimum value of 1
    setActiveStep(prevStep);
    navigate(`/checkout?step=${prevStep}`);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handlePayment = () => {
    console.log("handle payment");
  };

  return (
    <Box className="px-5 lg:px-32 " sx={{ width: "100%" }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length + 1 ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={step === 2}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
          {/* <Typography sx={{ my: 6 }}>Title</Typography> */}

          <div className="my-5">
            {step == 2 && (
              <AddDeliveryAddressForm
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {step == 3 && <OrderSummary data={data} handleNext={handleNext} />}
            {step == 4 && <PaymentMethod data={data} />}
          </div>

          {/* <AddDeliveryAddressForm handleNext={handleNext} /> */}
        </React.Fragment>
      )}
    </Box>
  );
}
