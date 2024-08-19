import React from "react";
import styled from "styled-components";

const BrandContainer = styled.div`
  width: 100%;

  background-color: #e5e5e5;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 768px) {
    width: 100%;
    /* Stretch items vertically */
  }
  @media (max-width: 480px) {
    width: 100%;

    flex-direction: column;
    align-items: stretch;
  }
`;

const BrandsWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-left: 4rem;

  :hover {
    background-color: white;
  }
`;

const BrandItem = styled.div`
  flex: 1;
  border-left: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 18px 15px 19px;
  min-height: 24px;
  cursor: pointer;
  box-sizing: border-box;

  @media (max-width: 350px) {
    padding: 15px 15px 15px 15px;
  }
`;

const BrandIcon = styled.img`
  width: auto;
  height: 90%;
`;

const ShopSwitcher = () => {
  const brands = [
    { url: "http://106.51.242.196:2245", icon: "/svg2.svg" }, // justJeans
    { url: "http://106.51.242.196:2275", icon: "/icon--mbportmans.svg" }, // portmans
    { url: "http://106.51.242.196:2273", icon: "/svg9.svg" }, // dotti
    // { url: "http://106.51.242.196:2245", icon: "/svg10.svg" }, // jayJays
    { url: "http://106.51.242.196:2269", icon: "/svg11.svg" }, // jacqui-e
  ];

  const handleBrandClick = (url) => {
    window.location.href = url;
  };

  return (
    <BrandContainer>
      <BrandsWrapper>
        {brands.map((brand, index) => (
          <BrandItem key={index} onClick={() => handleBrandClick(brand.url)}>
            <BrandIcon src={brand.icon} alt="" />
          </BrandItem>
        ))}
      </BrandsWrapper>
    </BrandContainer>
  );
};

export default ShopSwitcher;
