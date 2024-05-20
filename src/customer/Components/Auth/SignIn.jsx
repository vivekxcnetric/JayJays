import styled from "styled-components";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { getCustomerNew } from "../../../action/Customer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(getCustomerNew(formData));
  };
  return (
    <MainContainer>
      <Container>
        <ImgCard>
          <Image
            src="https://justgroup.com.au/images/about.jpg"
            alt="Woman holding a tablet"
          />
        </ImgCard>
        <Card>
          <Title>LOGIN</Title>
          <Description>Welcome back! Please login to your account.</Description>
          {/* <form onSubmit={handleSubmit}> */}
          <InputContainer>
            <Input
              type="text"
              placeholder="Username or Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Icon>
              <AiOutlineUser />
            </Icon>{" "}
            {/* Icon inside the Username input */}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Icon>
              <AiOutlineLock />
            </Icon>{" "}
            {/* Icon inside the Password input */}
          </InputContainer>
          <Button onClick={handleSubmit}>Login</Button>
          {/* </form> */}
          <p
            style={{ fontSize: "1.3rem", color: "#4b4848", marginTop: "2rem" }}
          >
            Or continue with <a href="/sign-up">create new account</a>
          </p>
        </Card>
      </Container>
    </MainContainer>
  );
};

export default SignIn;

const MainContainer = styled.div`
  width: 100%;
  padding: 10px 100px;
  height: 100vh;
  background-color: #9b90c2; /* purple-200 */
  @media (max-width: 1000px) {
    padding: 10px;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Container = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
  padding: 50px;
  margin: 0 auto;

  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse; /* Flipping the direction */
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ImgCard = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 10px;
  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: 780px) {
    display: none;
  }
`;

const Card = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  @media (max-width: 780px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
    padding-top: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #383737;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #4b4848;
  margin-bottom: 2rem;
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  width: calc(58% - 0.5rem);
  background-color: #6f42c1;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
  font-size: 1.3rem;

  &:hover {
    background-color: #7c56d3;
  }
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  width: 60%;
  border: 1px solid #cfcfcf;
  position: relative;
  margin-bottom: 1rem;
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 3rem;
  padding: 1rem 1.3rem;
  border: 1px solid #cfcfcf;
  border-radius: 0.25rem;
  box-sizing: border-box;
  padding-left: 2rem;
  &::placeholder {
    margin-left: 1rem; /* Add margin-left for the placeholder text */
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    height: 2.5rem;
    // padding: 0.75rem;
  }
`;

const Icon = styled.span`
  position: absolute;
  height: 100%;
  top: 0;
  left: 10px;
  display: flex;
  align-items: center;
`;
