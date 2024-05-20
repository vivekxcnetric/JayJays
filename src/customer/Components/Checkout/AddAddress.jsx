import * as React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import userEvent from "@testing-library/user-event";
import AddressCard from "../adreess/AdreessCard";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { getAddresses } from "../../../action/cart";
import { SetAll } from "mdi-material-ui";
import { useEffect } from "react";
import { addNewAddress } from "../../../action/cart";

let Test = [
  { name: "srikanth", id: "r4r4r", phone: "45545" },
  { name: "srikanth", id: "r4r4r", phone: "45545" },
  { name: "srikanth", id: "r4r4r", phone: "45545" },
];

export default function AddDeliveryAddressForm({ handleNext, handleBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [selectedAddress, setSelectedAdress] = useState(null);
  const [addresses, SetAddresses] = useState([]);
  const [adrsId, setadrsId] = useState(null);
  const [savedAddress, setSavedAddress] = useState(null);

  // console.log("auth", auth);
  console.log("savedAddress updated:", savedAddress);

  React.useEffect(() => {
    getAddresses().then((res) => {
      SetAddresses(res);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    let newData = {
      cartId: cartItems?.cartItems?.cart?.id,
      shippingAddress: {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        // landmark: "Landmark Building",
        streetLine1: data.get("streetLine1"),
        streetLine2: data.get("streetLine2"),
        city: data.get("city"),
        country: data.get("country"),

        postalCode: data.get("zip"),
        // countryCode: "US",
        phoneNumber: data.get("phoneNumber"),
        state: data.get("state"),
      },
    };

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetLine1: data.get("streetLine1"),
      streetLine2: data.get("streetLine2"),

      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    dispatch(createOrder({ address, jwt, navigate }));
    addNewAddress(address).then((res) => {
      console.log("res", res);
      setadrsId(res.addressId);
    });
    // after perfoming all the opration
    handleNext();
    handleBack(newData);
  };

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, jwt, navigate }));
    handleNext();
  };

  const handleAddress = (item) => {
    console.log("item", item);
    const addressObject = {
      firstName: item.firstName,
      lastName: item.lastName,
      streetLine: [item.addressLine?.[0], item.addressLine?.[1]],
      // streetLine2: item.streetLine[1],
      city: item.city,
      state: item.state,
      country: item.country,
      zipCode: item.zipCode,
      phone1: item.phone1,
      email1: item.email1,
    };
    localStorage.setItem("address", JSON.stringify(addressObject));
    // localStorage.setItem("address", JSON.stringify(item));
    handleBack(item);
    setSavedAddress(item);
    handleNext();
  };

  useEffect(() => {
    console.log("savedAddress updated:", savedAddress);
  }, [savedAddress]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {addresses?.contact?.map((item) => (
            <div
              onClick={() => setSelectedAdress(item)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              {" "}
              <AddressCard address={item} />
              {selectedAddress?.addressId === item.addressId && (
                <Button
                  sx={{ mt: 2 }}
                  size="large"
                  variant="contained"
                  color="primary"
                  // onClick={() => handleCreateOrder(item)}
                  onClick={() => handleAddress(item)}
                >
                  Deliverd Here
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="streetLine1"
                  name="streetLine1"
                  label="streetLine1"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="streetLine2"
                  name="streetLine2"
                  label="streetLine1"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem", bgcolor: grey[900] }}
                  size="large"
                  type="submit"
                  variant="contained"
                  // color="primary"
                >
                  Deliverd Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
