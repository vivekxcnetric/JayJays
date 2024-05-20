import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBRadio,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../action/cart";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Payment } from "@mui/icons-material";
// import PaymentForm from "./PaymentForm";
import { postPayment, putPreCheckout, checkout } from "../../../action/cart";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
export default function PaymentMethod({ data }) {
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems);
  console.log("data", data);
  // const [cardData, setCardData] = useState({
  //   cardNumber: "",
  //   cardHolderName: "",
  //   expiryDate: "",
  //   cvv: "",
  // });

  const navigate = useNavigate();

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",

    billingSameAsShipping: false, // State variable to track checkbox
    firstName: "", // State variable for billing details
    lastName: "",
    address: [],
    email1: "",
    phone1: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [orderIdData, setOrderIdData] = useState();
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   postPayment(state, cartItems?.cartItems?.grandTotal, data.addressId).then(
  //     (res) => {
  //       // console.log("payment response", res);
  //       putPreCheckout(res.orderId).then((res) => {
  //         // Further handling or processing

  //         checkout(res.orderId).then((res) => {
  //           console.log("checkout response", res.status);
  //           res.status === 201
  //             ? navigate(`/payment/${res?.data?.orderId}`)
  //             : alert("error");
  //         });
  //       });
  //     }
  //   );
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    postPayment(state, cartItems?.cartItems?.grandTotal, data.addressId)
      .then((res) => {
        return toast.promise(
          putPreCheckout(res.orderId).then((res) => {
            setOrderIdData(res.orderId);
            return checkout(res.orderId);
          }),
          {
            loading: "Payment is processing...",
            success: <b>Payment Done!</b>,
            error: <b>Could not save.</b>,
          },
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      })
      .then((res) => {
        console.log("res", res); // This should now log the correct value
        setTimeout(() => {
          navigate(`/payment/${res?.data?.orderId}`);
        }, 3000);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, [
    dispatch,
    CartData?.cartItems?.orderItem?.length,
    CartData?.cartItems?.orderItem,
  ]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
    console.log("state", state);
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleCheckboxChange = (evt) => {
    const { checked } = evt.target;

    if (checked) {
      const {
        firstName,
        lastName,
        addressLine,
        city,
        email1,
        phone1,
        country,
        zipCode,
      } = data;
      const address =
        addressLine && addressLine?.length >= 2
          ? [addressLine?.[0], addressLine?.[1]]
          : [];
      setState((prev) => ({
        ...prev,
        billingSameAsShipping: checked,
        firstName,
        lastName,
        address,
        city,
        email1,
        phone1,
        country,
        zipCode,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        billingSameAsShipping: checked,
        firstName: "",
        lastName: "",
        address: "",
        email1: "",
        phone1: "",
        city: "",

        country: "",
        zipCode: "",
      }));
    }
  };
  return (
    <div className=" payment-method-container">
      <link
        href="https://cdn.jsdelivr.net/npm/mdb-react-ui-kit/dist/css/mdb.min.css"
        rel="stylesheet"
      />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Biling details</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="First name"
                      id="form1"
                      type="text"
                      value={state.firstName}
                      onChange={handleInputChange}
                      disabled={state.billingSameAsShipping}
                    />
                  </MDBCol>

                  <MDBCol>
                    <MDBInput
                      label="Last name"
                      id="form2"
                      type="text"
                      value={state.lastName}
                      onChange={handleInputChange}
                      disabled={state.billingSameAsShipping}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Address"
                  id="form3"
                  type="text"
                  value={`${state.address[0] || ""} ${state.address[1] || ""} ${
                    state.city || ""
                  } `}
                  onChange={handleInputChange}
                  disabled={state.billingSameAsShipping}
                />
                <MDBRow className="mb-4">
                  <MDBCol>
                    <MDBInput
                      label="Country"
                      id="form6"
                      type="text"
                      value={state.country}
                      onChange={handleInputChange}
                      disabled={state.billingSameAsShipping}
                    />
                  </MDBCol>

                  <MDBCol>
                    <MDBInput
                      label="Zip Code"
                      id="form7"
                      type="text"
                      value={state.zipCode}
                      onChange={handleInputChange}
                      disabled={state.billingSameAsShipping}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form4"
                  type="email"
                  value={state.email1}
                  onChange={handleInputChange}
                  disabled={state.billingSameAsShipping}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Phone"
                  id="form5"
                  type="number"
                  value={state.phone1}
                  onChange={handleInputChange}
                  disabled={state.billingSameAsShipping}
                />

                <hr className="my-4" />

                <MDBCheckbox
                  name="billingSameAsShipping"
                  id="billingSameAsShipping"
                  label="Shipping address is the same as my billing address"
                  onChange={handleCheckboxChange}
                  checked={state.billingSameAsShipping}
                />
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="checkoutForm2"
                  label=" Save this information for next time"
                  defaultChecked
                />

                <hr className="my-4" />

                <h5 className="mb-4">Payment</h5>

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="MasterCard Credit card"
                />

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="Visa Credit card"
                />

                <MDBRadio
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="American Express Credit card"
                  wrapperClass="mb-4"
                />

                {/* <PaymentForm  /> */}

                <div className="flex flex-col items-center">
                  <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                  />
                  <form className="w-full max-w-sm mt-8">
                    <div className="mb-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                      />
                    </div>
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          name="expiry"
                          placeholder="MM/YY Expiry"
                          value={state.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          name="cvc"
                          placeholder="CVC"
                          value={state.cvc}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <MDBBtn onClick={handleSubmit} size="lg" block>
                  Continue to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <h5 className="mb-0">Summary</h5>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Price
                    <span>
                      {" "}
                      ${parseFloat(cartItems?.cartItems?.grandTotal).toFixed(2)}
                    </span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Discount
                    <span className="text-green-700">$0</span>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Delivery Charges
                    <span className="text-green-700">Free</span>
                  </MDBListGroupItem>
                  <hr className="my-2"></hr>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        {/* <p className="mb-0">(including VAT)</p> */}
                      </strong>
                    </div>
                    <span className="text-green-700">
                      <strong>
                        {" "}
                        $
                        {parseFloat(cartItems?.cartItems?.grandTotal).toFixed(
                          2
                        )}
                      </strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
