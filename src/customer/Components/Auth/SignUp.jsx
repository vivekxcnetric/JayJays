import { useState } from "react";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

const MainContainer = styled.div`
  width: 100%;
  padding: 10px 100px;
  /* height: 100vh; */
  background-color: #9b90c2; /* purple-200 */
  @media (max-width: 1000px) {
    padding: 0px 0px;
  }
`;

const Container = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
  padding: 50px;
  @media (max-width: 768px) {
    padding: 0px 0px;
  }
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgCard = styled.div`
  width: 40%;
  @media (max-width: 480px) {
    display: none;
  }
  /* height: 40%; */
  border-radius: 10px;
`;

const Card = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 0.5rem;
  text-align: center;
  @media (max-width: 480px) {
    width: 90%;
    height: 100vh;
    margin-top: 50px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  @media (max-width: 480) {
    font-size: 18px;
  }
  color: #383737;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #4b4848;
  margin-bottom: 2rem;
  @media (max-width: 480) {
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  padding: 0.75rem 1rem;
  border: 1px solid #cfcfcf;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 90%;
  background-color: #6f42c1;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #7c56d3;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const StyledPhoneInput = styled(PhoneInput)`
  background-color: #ffffff;
  padding: 0rem 1rem;

  margin-left: 1rem;
  border: 1px solid #cfcfcf;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  box-sizing: border-box;

  .react-tel-input {
    width: 100%;
  }

  .form-control {
    border: none;
    outline: none;
  }
`;

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value, country) => {
    setPhoneNumber(value);
  };

  return (
    <MainContainer>
      <Container>
        <ImgCard>
          <Image
            src="https://justjeans.jgl.com.au/JJ/aurora/images/espot/static/account/JJ24AW_CreateAccount.png"
            alt="Woman holding a tablet"
          />
        </ImgCard>
        <Card>
          <div>
            <Title>SIGN UP</Title>
            <Description>
              Create your account lorem ipsum dolor sit?
            </Description>
          </div>
          <div style={{ display: "flex", padding: "0rem 1rem" }}>
            <Input
              style={{ marginRight: "1rem" }}
              type="text"
              placeholder="First Name"
            />
            <Input type="text" placeholder="Last Name" />
          </div>
          <div>
            <StyledPhoneInput
              style={{ width: " calc(100% - 2rem)" }}
              country={"au"}
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <Input type="email" placeholder="Email" />
          </div>
          <div>
            <Input type="password" placeholder="Password" />
          </div>
          <div>
            <Input type="password" placeholder="Confirm Password" />
          </div>
          <div>
            <Button>Sign Up</Button>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#4b4848",
              marginTop: "10px",
            }}
          >
            {" "}
            <a href="#">Already have account please login.</a>{" "}
          </p>
        </Card>
      </Container>
    </MainContainer>
  );
};

export default SignUp;
