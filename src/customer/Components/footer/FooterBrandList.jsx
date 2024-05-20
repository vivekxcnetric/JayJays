import React, { memo, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #222222;
  align-self: stretch;
  border-top: 1px solid #e5e5e5;
  border-box: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding: 23px 24px 22px;
  padding: 20px;
  text-align: center;
  font-size: 16px;
  color: #000;
  fontfamily: "Heebo, sans-serif";

  @media (max-width: 1280px) {
    // padding: 33px 32px 32px;
  }
`;

const BrandsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 20px; /* Added margin for spacing */

  @media (max-width: 768px) {
    padding: 0px 16px; /* Adjusted padding for smaller screens */
  }
`;

const MoreBrandsText = styled.b`
  margin-top: 20px;
  align-self: stretch;
  position: relative;
  letter-spacing: 0.4px;
  line-height: 20px;
  text-transform: uppercase;
  filter: brightness(0) invert(1);
`;

const BrandImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  // flex: 0 0 auto;
  max-width: 100%;
`;

const BrandImage = styled.img`
  width: 150px; /* Adjust the width as needed */
  height: 25px; /* Adjust the height as needed */
  object-fit: contain;
  margin: 0;
  opacity: 1;
  filter: brightness(0) invert(1);
  @media (max-width: 768px) {
    width: 80px; /* Adjust the width as needed */
    height: 80px; /* Adjust the height as needed */
  }

  @media (max-width: 480px) {
    width: 60px; /* Adjust the width as needed */
    height: 60px; /* Adjust the height as needed */
  }
`;

// Array of brand objects containing URLs and image paths
const brands = [
  { url: "https://justjeans.jgl.com.au/", image: "/svg2.svg" },
  { url: "https://portmans.jgl.com.au/", image: "/svg3.svg" },
  { url: "https://dotti.jgl.com.au/", image: "/svg4.svg" },
  { url: "https://jayjays.jgl.com.au/", image: "/svg5.svg" },
  { url: "https://jacquie.jgl.com.au/", image: "/svg6.svg" },

  {
    url: "https://peteralexander.jgl.com.au/shop/pa-new-womens-plus-size",
    image: "/paplussvg.svg",
  },
  {
    url: "https://jacquie.jgl.com.au/shop/je-womens-curve-all",
    image: "/curvebyjacquiesvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-levis",
    image: "/levissvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-riders-by-lee",
    image: "/ridersbyleesvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-calvin-klein",
    image: "/calvinkleinsvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-guess",
    image: "/guesssvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-wrangler",
    image: "/wranglersvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-gap",
    image: "/gapsvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-mens-jack-jones",
    image: "/jackandjonessvg.svg",
  },
  {
    url: "https://justjeans.jgl.com.au/shop/jj-womens-nydj",
    image: "/nydjsvg.svg",
  },
  {
    url: "https://peteralexander.jgl.com.au/shop/pa-all-candles-and-diffusers",
    image: "/glasshousefragrancessvg.svg",
  },
];

const FooterBrandList = memo(() => {
  const handleClick = useCallback((url) => {
    window.open(url);
  }, []);

  return (
    <Container>
      <MoreBrandsText>MORE BRANDS. ONE CHECKOUT. ONE DELIVERY.</MoreBrandsText>
      <BrandsContainer>
        {brands.map((brand, index) => (
          <BrandImageContainer
            key={index}
            onClick={() => handleClick(brand.url)}
          >
            <BrandImage src={brand.image} alt="" />
          </BrandImageContainer>
        ))}
      </BrandsContainer>
    </Container>
  );
});

export default FooterBrandList;

const BrandDiv = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  padding: 50px 0;
  background-color: #f9f9f9;

  p {
    font-size: 14px;
    text-align: center;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
  }

  img {
    width: 100px; /* Adjust the width as needed */
    height: 100px; /* Adjust the height as needed */
    object-fit: contain;
    margin: 0;
  }

  @media (max-width: 768px) {
    img {
      width: 80px; /* Adjust the width as needed */
      height: 80px; /* Adjust the height as needed */
    }
  }

  @media (max-width: 480px) {
    img {
      width: 60px; /* Adjust the width as needed */
      height: 60px; /* Adjust the height as needed */
    }
  }
`;
