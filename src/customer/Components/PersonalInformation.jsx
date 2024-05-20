import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TbGenderMale, TbGenderFemale } from "react-icons/tb";
import { GiCoffeeBeans } from "react-icons/gi";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

import { getCustomerInfo } from "../../action/Customer";

const PersonalInformation = ({ info }) => {
  // const [customerInfo, setCustomerInfo] = useState({});

  // useEffect(()=>{
  //   getCustomerInfo().then((res)=>{
  //     setCustomerInfo(res);
  //   })
  // },[])
  return (
    <Container>
      <ContentContainer>
        <div className="header">
          {/* <div>
            <GiCoffeeBeans size={50} />
          </div> */}
          <div className="info">
            <h1>Personal Information</h1>
            <p>
              {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              delectus dolore culpa nesciunt vitae corrupti eligendi sequi. */}
            </p>
          </div>
        </div>
        <div className="inputs_name">
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={info.firstName}
              readonly
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={info.lastName}
              readonly
            />
          </div>
        </div>
        <div className="inputs_email">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={info.logonId}
              readonly
            />
          </div>
        </div>
        <div className="inputs_name">
          <div>
            <PhoneInput
              className="phone_input"
              value={`61 ${info.phone1}`}
              country={"aus"}
              enableAreaCodes={true}
              readonly
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          {/* <div>
            <input type="date" placeholder="Date of Birth" />
          </div> */}
        </div>
        <div className="gender">
          <div>
            <TbGenderMale size={30} />
            <h3>Male</h3>
          </div>
          {/* <div> */}
          {/* <TbGenderFemale size={30} /> */}
          {/* <h3>Female</h3> */}
          {/* </div> */}
        </div>
        <div className="header">
          <p>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            neque cum amet nulla voluptates illum minima fugit quae quidem,
            voluptatibus rem odit commodi, ut itaque id? Itaque in repudiandae
            magni. */}
          </p>
        </div>
        <div className="buttons">
          <button>Edit</button>
          {/* <button>Cancel</button> */}
        </div>
      </ContentContainer>
    </Container>
  );
};

export default PersonalInformation;

const Container = styled.div`
  width: 80%;
  border-radius: 10px;
  padding: 2% 50px;
  background-color: white;

  @media (max-width: 768px) {
    padding: 2% 10px;
  }
`;

const ContentContainer = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #ebeaea;
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 100px;
    border-radius: 10px;

    @media (max-width: 768px) {
      margin-right: 20px;
    }
  }

  .info h1 {
    font-family: "Arial", sans-serif;
    color: #333;
    font-size: 24px;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .inputs_name {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .inputs_email {
    grid-template-columns: repeat(1, 1fr);
  }

  .inputs_email input,
  .inputs_name input {
    width: 100%;
    padding: 9px;
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
    }
  }

  .gender {
    display: flex;
    gap: 20px;
  }

  .gender div {
    width: 100px;
    align-items: center;
    background-color: #007bff;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
    color: white;
  }

  .buttons {
    display: flex;
    gap: 20px;
  }

  .buttons button {
    width: 20%;
    height: 40px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    width: 96%;
  }
`;
