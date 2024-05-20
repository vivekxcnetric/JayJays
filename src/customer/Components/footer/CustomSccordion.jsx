import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";
// import { BrandContext } from '../contextApi/BrandContextProvider';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AccordionWrapper = styled.div`
  width: 100%;
  z-index: 120;
`;

const AccordionItem = styled.div`
  //   margin-bottom: 1px;
  border: 1px solid #ffff;
`;

const AccordionButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  text-align: left;
  cursor: pointer;
  outline: none;
  div {
    font-size: 15px;
    color: #30497a;
  }
  div a {
    text-decoration: none;
    color: black;
  }
`;

const AccordionContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  animation: ${fadeIn} 0.5s ease;
`;

const NestedLink = styled.a`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: black;
  background-color: #ffff;
  border: 1px solid #f0f0f0;
`;

const NestedAccordionContent = styled.div`
  //   margin-left: 20px;
`;

const CustomAccordion = () => {
  // const { brands } = useContext(BrandContext)
  const brands = ["a", "b", "c", "d"];
  const [openIndex, setOpenIndex] = useState(null);
  const [openNestedIndex, setOpenNestedIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const toggleNestedAccordion = (nestedIndex) => {
    setOpenNestedIndex(openNestedIndex === nestedIndex ? null : nestedIndex);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AccordionWrapper>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(0)}>
            <div>
              <a href=""> STORES </a>
            </div>{" "}
            <div>{openIndex === 0 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 0}>
            <NestedAccordionContent>
              <NestedLink href="#">Find A Store</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(1)}>
            <div>
              <a href="">ABOUT US</a>
            </div>{" "}
            <div>{openIndex === 1 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 1}>
            <NestedAccordionContent>
              <NestedLink a target="_blank" rel="noopener noreferrer" href="">
                About Just Jeans
              </NestedLink>
              <NestedLink a target="_blank" rel="noopener noreferrer" href="">
                Careers
              </NestedLink>
              <NestedLink a target="_blank" rel="noopener noreferrer" href="">
                Terms & Conditions
              </NestedLink>
              <NestedLink a target="_blank" rel="noopener noreferrer" href="">
                Better Practices
              </NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(2)}>
            <div>
              <a href=""> HELP & INFORMATION</a>
            </div>{" "}
            <div>{openIndex === 2 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 2}>
            <NestedAccordionContent>
              <NestedLink href="#">Delivery Information</NestedLink>
              <NestedLink href="#">Track My Order</NestedLink>
              <NestedLink href="#">Returns & Exchanges</NestedLink>
              <NestedLink href="#">Size Guide</NestedLink>
              <NestedLink href="#">Help & Contact Us</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(3)}>
            <div>
              <a href="">GIFT CARDS</a>
            </div>{" "}
            <div>{openIndex === 3 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 3}>
            <NestedAccordionContent>
              <NestedLink href="#">Shop Gift Cards</NestedLink>
              <NestedLink href="#">Balance Enquiry</NestedLink>
              <NestedLink href="#">Gift Card Help</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(4)}>
            <div>
              <a href="">JUST SHOP</a>
            </div>{" "}
            <div>{openIndex === 4 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 4}>
            <NestedAccordionContent>
              <NestedLink href="#">About Just Shop</NestedLink>
              <NestedLink href="#">Terms & Conditions</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={() => toggleAccordion(5)}>
            <div>
              <a href="">DENIM FIT GUIDE</a>
            </div>{" "}
            <div>{openIndex === 5 ? "-" : "+"}</div>
          </AccordionButton>
          <AccordionContent isOpen={openIndex === 5}>
            <NestedAccordionContent>
              <NestedLink href="#">Women</NestedLink>
              <NestedLink href="#">Men</NestedLink>
            </NestedAccordionContent>
          </AccordionContent>
        </AccordionItem>
      </AccordionWrapper>
    </div>
  );
};

export default CustomAccordion;
