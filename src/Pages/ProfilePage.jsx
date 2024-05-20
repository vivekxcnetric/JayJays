import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PersonalInformation from "../customer/Components/PersonalInformation";
import Sidebar from "../customer/Components/Sidebar";
import AddressPage from "../customer/Components/AddressPage";
// import Sidebar from "../components/Sidebar";
// import PersonalInformation from "../components/PersonalInformation";
// import AddressPage from "../components/AddressPage";
import { getCustomerInfo } from "../action/Customer";
import Loader from "../customer/Components/Loader/Loader";

const ProfilePage = () => {
  const [customerInfo, setCustomerInfo] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getCustomerInfo().then((res) => {
      setCustomerInfo(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <MainContainer>
          <Sidebar info={customerInfo} />
          <PersonalInformation info={customerInfo} />

          {/* <AddressPage /> */}
        </MainContainer>
      )}
    </>
  );
};

export default ProfilePage;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
`;
