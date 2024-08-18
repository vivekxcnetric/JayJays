import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../../action/cart";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { postPayment, putPreCheckout, checkout } from "../../../action/cart";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./payment.css";

export default function PaymentMethod({ data }) {
  const { cartItems } = useSelector((store) => store);
  const [CartData, setCartData] = useState(cartItems);
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    billingSameAsShipping: false,
    firstName: "",
    lastName: "",
    address: [],
    email1: "",
    phone1: "",
    city: "",
    country: "",
    zipCode: "",
    shippingMode: "Standard",
  });

  const [orderIdData, setOrderIdData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [
    dispatch,
    CartData?.cartItems?.orderItem?.length,
    CartData?.cartItems?.orderItem,
  ]);

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
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      })
      .then((res) => {
        console.log("res", res);
        setTimeout(() => {
          navigate(`/payment/${res?.data?.orderId}`);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
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

  const handleShippingModeChange = (e) => {
    setState((prev) => ({ ...prev, shippingMode: e.target.value }));
  };

  return (
    <div className="payment-method-container p-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h5 className="text-xl font-semibold mb-6">Billing Details</h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border p-2 rounded w-full"
                label="First name"
                name="firstName"
                type="text"
                value={state.firstName}
                onChange={handleInputChange}
                disabled={state.billingSameAsShipping}
                placeholder="First name"
              />
              <input
                className="border p-2 rounded w-full"
                label="Last name"
                name="lastName"
                type="text"
                value={state.lastName}
                onChange={handleInputChange}
                disabled={state.billingSameAsShipping}
                placeholder="Last name"
              />
            </div>

            <input
              className="border p-2 rounded w-full mb-4"
              label="Address"
              name="address"
              type="text"
              value={`${state.address[0] || ""} ${state.address[1] || ""} ${
                state.city || ""
              } `}
              onChange={handleInputChange}
              disabled={state.billingSameAsShipping}
              placeholder="Address"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                className="border p-2 rounded w-full"
                label="Country"
                name="country"
                type="text"
                value={state.country}
                onChange={handleInputChange}
                disabled={state.billingSameAsShipping}
                placeholder="Country"
              />
              <input
                className="border p-2 rounded w-full"
                label="Zip Code"
                name="zipCode"
                type="text"
                value={state.zipCode}
                onChange={handleInputChange}
                disabled={state.billingSameAsShipping}
                placeholder="Zip Code"
              />
            </div>

            <input
              className="border p-2 rounded w-full mb-4"
              label="Email"
              name="email1"
              type="email"
              value={state.email1}
              onChange={handleInputChange}
              disabled={state.billingSameAsShipping}
              placeholder="Email"
            />
            <input
              className="border p-2 rounded w-full mb-4"
              label="Phone"
              name="phone1"
              type="number"
              value={state.phone1}
              onChange={handleInputChange}
              disabled={state.billingSameAsShipping}
              placeholder="Phone"
            />

            <div className="mb-4">
              <input
                type="checkbox"
                name="billingSameAsShipping"
                id="billingSameAsShipping"
                onChange={handleCheckboxChange}
                checked={state.billingSameAsShipping}
                className="mr-2"
              />
              <label htmlFor="billingSameAsShipping">
                Shipping address is the same as my billing address
              </label>
            </div>

            <div className="mb-4">
              <input
                type="checkbox"
                name="saveInfo"
                id="saveInfo"
                className="mr-2"
              />
              <label htmlFor="saveInfo">
                Save this information for next time
              </label>
            </div>

            <h5 className="text-xl font-semibold mb-6">Payment</h5>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="paymentMethod"
                id="mastercard"
                value="MasterCard"
                className="mr-2"
              />
              <label htmlFor="mastercard">MasterCard Credit card</label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="paymentMethod"
                id="visa"
                value="Visa"
                className="mr-2"
              />
              <label htmlFor="visa">Visa Credit card</label>
            </div>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                name="paymentMethod"
                id="amex"
                value="AmericanExpress"
                className="mr-2"
              />
              <label htmlFor="amex">American Express Credit card</label>
            </div>

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

                <div className="flex justify-between">
                  <div className="mb-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      name="expiry"
                      placeholder="Valid Thru"
                      value={state.expiry}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="tel"
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
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h5 className="text-xl font-semibold mb-6">Shipping Mode</h5>
            <div className="flex flex-col mb-4">
              <label className="mb-2">Select Shipping Mode:</label>
              <select
                name="shippingMode"
                value={state.shippingMode}
                onChange={handleShippingModeChange}
                className="border rounded p-2"
              >
                <option value="Express">Express</option>
                <option value="">International Priority</option>
                <option value="">International Regular</option>
                <option value="">Pickup in store</option>
                <option value="">US - 2-Day Express Delivery</option>
                <option value="">US - Overnight Delivery</option>
                <option value="">US - Regular Delivery</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="py-3 px-4 bg-gray-100 border-b rounded-t-lg">
              <h5 className="text-lg font-semibold mb-0">Summary</h5>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Price</span>
                  <span>
                    ${parseFloat(cartItems?.cartItems?.grandTotal).toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Discount</span>
                  <span className="text-green-700">$0</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </li>
                <hr className="my-2 border-gray-300" />
                <li className="flex justify-between items-center">
                  <div>
                    <strong>Total amount</strong>
                    {/* <p className="mb-0">(including VAT)</p> */}
                  </div>
                  <span className="text-green-700 font-semibold">
                    <strong>
                      ${parseFloat(cartItems?.cartItems?.grandTotal).toFixed(2)}
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-lg p-4 w-full mt-4 hover:bg-blue-600"
          >
            Place your order
          </button>
        </div>
      </div>

      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
