import React from "react";
import styled from "styled-components";
import { MdMyLocation } from "react-icons/md";

const AddressPage = () => {
  return (
    <Container>
      <ContentContainer>
        <Title>ADD A NEW ADDRESS</Title>
        <LocationButton>
          <MdMyLocation /> Use my current location
        </LocationButton>
        <InputGroup>
          <InputField type="text" placeholder="Name" />
          <InputField type="tel" placeholder="Mobile Number" />
        </InputGroup>
        <InputGroup>
          <InputField type="text" placeholder="Pincode" />
          <InputField type="text" placeholder="Locality" />
        </InputGroup>
        <InputArea>
          <TextAreaField placeholder="Address (Area and Street)" />
        </InputArea>
        <InputGroup>
          <InputField type="text" placeholder="City" />
          <InputField type="text" placeholder="State" />
        </InputGroup>
        <InputGroup>
          <InputField type="text" placeholder="Landmark (Optional)" />
          <InputField type="text" placeholder="Alternate (Optional)" />
        </InputGroup>
        <RadioGroup>
          <RadioButton type="radio" id="home" name="addressType" />
          <Label htmlFor="home">Home</Label>
          <RadioButton type="radio" id="work" name="addressType" />
          <Label htmlFor="work">Work</Label>
        </RadioGroup>
        <ButtonGroup>
          <Button>SAVE</Button>
          <Button>CANCEL</Button>
        </ButtonGroup>
      </ContentContainer>
    </Container>
  );
};

export default AddressPage;

const Container = styled.div`
  width: 80%;
  border-radius: 10px;
  padding: 2% 0;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 80%;
  /* max-width: 500px; */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 10px;
  gap: 20px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InputArea = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 10px;
  gap: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;

const Label = styled.label``;

const ButtonGroup = styled.div`
  /* display: flex; */
  /* flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  /* } */
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  width: 150px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:not(:last-child) {
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;
