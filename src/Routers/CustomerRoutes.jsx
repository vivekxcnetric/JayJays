import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetails from "../customer/Components/Product/ProductDetails/ProductDetails";
import Product from "../customer/Components/Product/Product/Product";
import Contact from "../Pages/Contact";
import TearmsCondition from "../Pages/TearmsCondition";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import About from "../Pages/About";
import Homepage from "../Pages/Homepage";
import Navigation from "../customer/Components/Navbar/Navigation";
import Cart from "../customer/Components/Cart/Cart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";
import { customTheme, customerTheme } from "../Admin/them/customeThem";
import Order from "../customer/Components/orders/Order";
import OrderDetails from "../customer/Components/orders/OrderDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Footer from "../customer/Components/footer/Footer";
import PaymentSuccess from "../customer/Components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/Components/ReviewProduct/RateProduct";
import NotFound from "../Pages/Notfound";
import CustomAccordion from "../customer/Components/footer/CustomSccordion";
import FooterRight from "../customer/Components/footer/FooterRight";
import FooterLeft from "../customer/Components/footer/FooterLeft";
import styled from "styled-components";
import FooterBrandList from "../customer/Components/footer/FooterBrandList";
import ProfilePage from "../Pages/ProfilePage";
import Search from "../customer/Components/Search";

// import SignIn from "../customer/Components/Auth/SignIn";

// import SignUp from "../customer/Components/Auth/SignUp";

import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
const CustomerRoutes = () => {
  const location = useLocation();

  // Only show Navigation component when not on the NotFound page
  const showNavigation = location.pathname !== "*";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming mobile below 768px width
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const path=["/","/home","/about","/privacy-policy","/terms-condition","/contact","/men",`/product/${productId}`]
  return (
    <div>
      <ThemeProvider theme={customerTheme}>
        {showNavigation && <Navigation />}
        <Routes>
          <Route path="/login" element={<Homepage />}></Route>
          <Route path="/register" element={<Homepage />}></Route>

          {/* <Route path="sign-in" element={<SignIn />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route> */}

          <Route path="sign-in" element={<SignIn />}></Route>
          <Route path="sign-up" element={<SignUp />}></Route>

          <Route path="/" element={<Homepage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/terms-condition" element={<TearmsCondition />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/:lavelOne/:lavelTwo/:lavelThree"
            element={<Product />}
          ></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetails />}
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/account/order" element={<Order />}></Route>
          <Route
            path="/profile"
            element={
              <Main>
                <ProfilePage />
              </Main>
            }
          ></Route>

          <Route
            path="/account/order/:orderId"
            element={<OrderDetails />}
          ></Route>
          <Route
            path="/account/rate/:productId"
            element={<RateProduct />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route>
          <Route path="/shops" element={<Product />}></Route>
          <Route path="/search" element={<Search />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <FooterWrapper>
          {isMobile ? <CustomAccordion /> : <FooterRight />}
          <FooterLeft />
        </FooterWrapper>
        <FooterBrandList />
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;

const FooterWrapper = styled.div`
  margin-top: 5%;
  background: #222222;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center horizontally */
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const Main = styled.div`
  /* width: 100%; */
  padding: 50px 100px;
  background-color: aliceblue;

  @media (max-width: 1024px) {
    padding: 20px 20px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;
