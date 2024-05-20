import React from "react";

const AddressCard = ({ address }) => {
  console.log("address", address);
  return (
    <div>
      <h1 className="text-lg font-semibold py-4">Delivery Adress</h1>
      <div className="space-y-3">
        <p className="font-semibold">{`${address?.firstName} ${address?.lastName}`}</p>

        <p>
          {`${address?.addressLine ? address?.addressLine?.[0] : ""} ${
            address?.addressLine?.[1]
          } ${address?.city} ${address?.state} ${address?.zipCode}`}
        </p>
        {/* <p>banglore</p> */}

        <div className="space-y-1">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.phone1}</p>
          {/* <p>984748558474</p> */}
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Email Address</p>
          <p>{address?.email1}</p>
          {/* <p>984748558474</p> */}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
