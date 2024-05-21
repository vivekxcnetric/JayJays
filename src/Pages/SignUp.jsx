import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import { register } from "../Redux/Auth/Action";
import { TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import MobileNumberInput from "./Mobile";

const Container = styled.div`
  margin-top: 20px;

  width: 100%;
`;

const CenteredText = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px;
  font-size: 26px;
  font-weight: bold;
  div {
    border-bottom: 3px solid yellow;
  }
`;

const FormContainer = styled.div`
  display: flex;
  padding: 0px 100px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 0px 10px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-right: 20px;
`;

const ImageWrapper = styled.div`
  // flex: 1;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  padding: 20px;
  border-radius: 8px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #2d2d2d; /* Change background color on hover */
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
`;

const BrandItem = styled.div`
  flex: 1;
  border-left: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 15px;
  @media (max-width: 350px) {
    padding: 15px 15px 15px 15px;
  }
`;

const BrandIcon = styled.img`
  width: auto;
  height: 40%;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
    };

    try {
      await dispatch(register(userData));
      setFormError(null);
      //   alert("Account created successfully");
      // navigate("/"); // Redirect upon successful registration
    } catch (error) {
      console.log("error", error.errorMessage);
      setFormError(error.message);
    }
  };

  const brands = [
    { url: "https://justjeans.jgl.com.au/", image: "/svg2.svg" },
    { url: "https://jayjays.jgl.com.au/", image: "/svg5.svg" },
    { url: "https://portmans.jgl.com.au/", image: "/svg3.svg" },
    { url: "https://jacquie.jgl.com.au/", image: "/svg6.svg" },
    { url: "https://dotti.jgl.com.au/", image: "/svg4.svg" },
  ];
  const handleBrandClick = (url) => {
    window.open(url, "_blank");
  };

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleFirstNameBlur = () => {
    if (!firstName.trim()) {
      setFirstNameError("Please enter your first name");
    } else {
      setFirstNameError("");
    }
  };

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleLastNameBlur = () => {
    if (!lastName.trim()) {
      setLastNameError("Please enter your last name");
    } else {
      setLastNameError("");
    }
  };

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (input) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleBlur = () => {
    if (!email) {
      setErrorMessage("Please enter an email address");
    } else if (!validateEmail(email)) {
      setErrorMessage("The email address entered is not in a valid format.");
    } else {
      setErrorMessage("");
    }
  };

  const [password, setPassword] = useState("");
  const [errorPasswordMessage, setPasswordErrorMessage] = useState("");

  const validatePassword = (input) => {
    // Regular expression for password validation (at least one digit)
    const passwordRegex = /^(?=.*\d).{6,}$/;
    return passwordRegex.test(input);
  };

  const handleBlurPassword = () => {
    if (!password) {
      setPasswordErrorMessage("Please enter a password");
    } else if (!validatePassword(password)) {
      setPasswordErrorMessage(
        "The password must contain at least one digit and be at least 6 characters long."
      );
    } else {
      setPasswordErrorMessage("");
    }
  };

  return (
    <Container>
      <CenteredText>
        <h4>MORE BRANDS TO SHOP ONE ACCOUNT.</h4>
      </CenteredText>
      <CenteredText>
        <div
          style={{
            marginTop: "-30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {brands.map((brand, index) => (
            <BrandItem key={index} onClick={() => handleBrandClick(brand.url)}>
              <BrandIcon src={brand.image} alt="" />
            </BrandItem>
          ))}
        </div>
      </CenteredText>
      <Title>
        <div>
          <h1>CREATE ACCOUNT</h1>
        </div>
      </Title>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <p>Create an account for quick sign in and fast checkout.</p>
        <p>
          Plus, sign up to our emails to be the first to know about our new
          collections & latest offers.
        </p>
      </div>
      <FormContainer>
        <FormWrapper>
          <p>* Indicates a required field</p>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <TextField
                required
                id="firstname"
                name="firstName"
                label="First Name"
                fullWidth
                autoComplete="given-name"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={handleFirstNameBlur}
                error={!!firstNameError}
                helperText={firstNameError}
              />
              {/* {firstNameError && <span>{firstNameError}</span>} */}
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="lastname"
                name="lastName"
                label="Last Name"
                fullWidth
                autoComplete="family-name"
                value={lastName}
                onChange={handleLastNameChange}
                onBlur={handleLastNameBlur}
                error={!!lastNameError}
                helperText={lastNameError}
              />
              {/* {lastNameError && <span>{lastNameError}</span>} */}
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                error={errorMessage}
                helperText={errorMessage}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlurPassword}
                error={errorPasswordMessage}
                helperText={errorPasswordMessage}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                required
                id="phonenumber"
                name="phoneNumber"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+61</InputAdornment>
                  ),
                }}
              />
            </InputWrapper>
            {/* <MobileNumberInput/> */}
            <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
              <div>
                <input
                  style={{ height: "20px", width: "20px", marginTop: "5px" }}
                  type="checkbox"
                  id="terms"
                />
              </div>
              <div>
                {/* <label htmlFor="terms">
                  Sign up to Portmans emails and receive 15% off your next full
                  price purchase at Portmans.
                </label> */}
              </div>
            </div>
            {error && <ErrorText>{error}</ErrorText>}
            {formError && <ErrorText>{formError}</ErrorText>}
            <Button>CREATE ACCOUNT</Button>
          </Form>
        </FormWrapper>
        <ImageWrapper>
          <img src="https://jayjays.jgl.com.au/MJ/aurora/images/espot/static/create-account/MJ23AW_CreateAccount@2x_AU.jpg?impolicy=scale" />
        </ImageWrapper>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
