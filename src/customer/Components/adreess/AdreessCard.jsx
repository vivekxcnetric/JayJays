import React from "react";
// import { useLocation } from "react-router-dom";
import { FaEnvelope, FaPhone, FaAddressBook } from "react-icons/fa6";

const AddressCard = ({ address, title }) => {
  // const location = useLocation();
  // const isAccountOrderOrPaymentPath =
  //   location.pathname.includes("/account/order/") ||
  //   location.pathname.includes("/payment/");

  // const title = isAccountOrderOrPaymentPath
  //   ? "Shipping Address"
  //   : "Delivery Address";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold pb-4 text-gray-700">{title}</h1>
      <div className="space-y-4">
        <p className="font-semibold text-gray-800">{`${address?.firstName} ${address?.lastName}`}</p>

        <div className="flex items-start space-x-2">
          <FaAddressBook className="text-gray-500 mt-1 text-2xl" />
          <p className="text-gray-600">{`${
            address?.addressLine ? address?.addressLine?.[0] : ""
          } ${address?.addressLine?.[1] ? address?.addressLine?.[1] : ""} ${
            address?.city
          } ${address?.state} ${address?.zipCode}`}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FaPhone className="text-gray-500" />
            <p className="font-semibold text-gray-700">Phone Number</p>
          </div>
          <p className="text-gray-600">{address?.phone1}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-500" />
            <p className="font-semibold text-gray-700">Email Address</p>
          </div>
          <p className="text-gray-600">{address?.email1}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
