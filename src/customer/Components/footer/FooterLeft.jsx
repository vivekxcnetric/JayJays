import { memo, useCallback } from "react";
import styled from "styled-components";

const FooterLeft = memo(() => {
  const onLinkContainerClick = useCallback(() => {
    window.open("https://www.facebook.com/justjeans");
  }, []);

  const onLinkContainer2Click = useCallback(() => {
    window.open("https://instagram.com/justjeans");
  }, []);

  const onLinkContainer3Click = useCallback(() => {
    window.open("https://www.tiktok.com/@_justjeans");
  }, []);

  return (
    <MarginRoot>
      <Container8>
        <Container7>
          <Form>
            <h3
              style={{ fontWeight: "bold", textAlign: "left", color: "white" }}
            >
              JOIN THE CREW
            </h3>

            <p style={{ margin: "6px 0", textAlign: "left", color: "white" }}>
              Join the crew and we'll give you 20% off full price items for a
              month at Jay Jays. Plus, you'll be the first to hear about new
              arrivals, sales and more.
            </p>
            <Link>
              <Join
                href="http://justjeans.jgl.com.au/shop/SubscriptionSignUpView"
                target="_blank"
              >
                JOIN
              </Join>
            </Link>
          </Form>
          <Container3>
            <Container2>
              <GetToKnow>HANG WITH US</GetToKnow>
            </Container2>
            <List>
              <Itemmargin>
                <Item>
                  <Link1 onClick={onLinkContainerClick}>
                    <IconFacebook alt="" src="/icon--facebook.svg" />
                  </Link1>
                </Item>
              </Itemmargin>
              <Itemmargin1>
                <Item>
                  <Link1 onClick={onLinkContainer2Click}>
                    <IconFacebook alt="" src="/icon--instagram.svg" />
                  </Link1>
                </Item>
              </Itemmargin1>
              <Itemmargin2>
                <Item>
                  <Link1 onClick={onLinkContainer3Click}>
                    <IconFacebook alt="" src="/icon--tiktok.svg" />
                  </Link1>
                </Item>
              </Itemmargin2>
            </List>
          </Container3>
          <Container6>
            <Container5>
              <Link2>
                <Svgmargin>
                  <Svg>
                    <FrameIcon alt="" src="/frame.svg" />
                  </Svg>
                </Svgmargin>
                <Container4>
                  <DeliveryCountryAustraliaContainer>
                    {`Delivery Country `}
                    <Australia>Australia</Australia>
                  </DeliveryCountryAustraliaContainer>
                </Container4>
              </Link2>
            </Container5>
          </Container6>
        </Container7>
      </Container8>
    </MarginRoot>
  );
});

export default FooterLeft;

const Join = styled.a`
  text-transform: uppercase;
  font-weight: 500;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;
const Link = styled.div`
  width: 100%;
  margin: 15px auto;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 16px;
  color: #fff;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const Form = styled.div`
  text-align: center;
`;
const GetToKnow = styled.b`
  text-transform: uppercase;
  color: white;
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  align-text: center;
`;
const IconFacebook = styled.img`
  width: 20px;
  position: relative;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
  color: white;
`;
const Link1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;
  align-text: center;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Itemmargin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
`;
const Itemmargin1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
`;
const Itemmargin2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Container3 = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FrameIcon = styled.img`
  width: 20px;
  flex: 1;
  position: relative;
  max-height: 100%;
`;
const Svg = styled.div`
  width: 20px;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Svgmargin = styled.div`
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 8px 0px 0px;
  box-sizing: border-box;
`;
const Australia = styled.span`
  text-decoration: underline;
  color: white;
`;
const DeliveryCountryAustraliaContainer = styled.b`
  position: relative;
  letter-spacing: 0.4px;
  line-height: 17.5px;
  color: white;
`;
const Container4 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 0.8px;
`;
const Link2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Container5 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 3px;
`;
const Container6 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 2px;
  box-sizing: border-box;
`;
const Container7 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 16px;
  box-sizing: border-box;
  text-align: center;

  gap: 32px;
`;
const Container8 = styled.div`
  display: flex;
  align-text: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MarginRoot = styled.div`
  width: 35%;
  // background: #222222;

  display: flex;
  flex-direction: column;
  align-text: center;
  align-items: center;
  justify-content: flex-start;
  padding: 32px 0px;
  text-align: left;
  font-size: 14px;
  color: #000;
  // font-family: Roboto;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;
