import { memo } from "react";
import styled from "styled-components";

const Stores = styled.a`
  flex: 1;
  position: relative;
  letter-spacing: 0.4px;
  line-height: 17.5px;
  text-transform: uppercase;
  font-weight: 700;
  color: inherit;
  text-decoration: none;
`;
const Link = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 0px 0.8px;
`;
const FindAStore = styled.a`
  flex: 1;
  position: relative;
  letter-spacing: 0.4px;
  line-height: 17.5px;
  color: inherit;
  text-decoration: none;
`;
const Item = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 11.3px 0px 0px;
`;
const List = styled.div`
  align-self: stretch;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Item1 = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4px;
`;
const Itemmargin = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 34.8px 0px 0px;
`;
const List1 = styled.div`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const List2 = styled.div`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 57px;
`;
const List3 = styled.div`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 0px 145.5px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px 16px;
  box-sizing: border-box;
  gap: 32px;
  @media (max-width: 1000px) {
    gap: 20px;
  }
`;
const ContainerRoot = styled.div`
  width: 60%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 31.3px 0px 61.5px;
  text-align: left;
  font-size: 14px;
  color: #ffffff;
  fontfamily: "Heebo, sans-serif";
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const FooterRight = memo(() => {
  return (
    <ContainerRoot>
      <Container>
        <List1>
          <Item1>
            <Link>
              <Stores
                href="https://justjeans.jgl.com.au/shop/stores"
                target="_blank"
              >
                Stores
              </Stores>
            </Link>
            <List>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/stores"
                    target="_blank"
                  >
                    Find A Store
                  </FindAStore>
                </Link>
              </Item>
            </List>
          </Item1>
          <Itemmargin>
            <Item1>
              <Link>
                <Stores
                  href="https://justjeans.jgl.com.au/shop/about"
                  target="_blank"
                >
                  About Us
                </Stores>
              </Link>
              <List>
                <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/about"
                      target="_blank"
                    >
                      About Jay Jays
                    </FindAStore>
                  </Link>
                </Item>
                <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/careers"
                      target="_blank"
                    >
                      Careers
                    </FindAStore>
                  </Link>
                </Item>
                <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/terms-and-conditions"
                      target="_blank"
                    >{`Terms & Conditions`}</FindAStore>
                  </Link>
                </Item>
                <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/better-practices"
                      target="_blank"
                    >
                      Better Practices
                    </FindAStore>
                  </Link>
                </Item>
              </List>
            </Item1>
          </Itemmargin>
        </List1>
        <List2>
          <Item1>
            <Link>
              <Stores
                href="https://help.justjeans.com.au/"
                target="_blank"
              >{`Help & Information`}</Stores>
            </Link>
            <List>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/delivery-information"
                    target="_blank"
                  >
                    Delivery Information
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/track-order"
                    target="_blank"
                  >
                    Track My Order
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/returns-and-exchanges"
                    target="_blank"
                  >{`Returns & Exchanges`}</FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/size-guide"
                    target="_blank"
                  >
                    Size Guide
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://help.justjeans.com.au/"
                    target="_blank"
                  >{`Help & Contact Us`}</FindAStore>
                </Link>
              </Item>
            </List>
          </Item1>
        </List2>
        <List1>
          <Item1>
            <Link>
              <Stores
                href="https://justjeans.jgl.com.au/shop/jj-giftcards"
                target="_blank"
              >
                Gift Cards
              </Stores>
            </Link>
            <List>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/jj-giftcards"
                    target="_blank"
                  >
                    Shop Gift Cards
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://giftcards.justjeans.com.au/CheckBalance"
                    target="_blank"
                  >
                    Balance Enquiry
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://help.justjeans.com.au/hc/en-au/categories/360006519572-Gift-Cards"
                    target="_blank"
                  >
                    Gift Card Help
                  </FindAStore>
                </Link>
              </Item>
            </List>
          </Item1>
          <Itemmargin>
            <Item1>
              {/* <Link>
                <Stores
                  href="https://justjeans.jgl.com.au/shop/jj-just-shop"
                  target="_blank"
                >
                  JUST SHOP
                </Stores>
              </Link> */}
              <List>
                {/* <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/jj-just-shop"
                      target="_blank"
                    >
                      About Just Shop
                    </FindAStore>
                  </Link>
                </Item> */}
                {/* <Item>
                  <Link>
                    <FindAStore
                      href="https://justjeans.jgl.com.au/shop/jj-just-shop-terms-and-conditions"
                      target="_blank"
                    >{`Terms & Conditions`}</FindAStore>
                  </Link>
                </Item> */}
              </List>
            </Item1>
          </Itemmargin>
        </List1>
        <List3>
          {/* <Item1>
            <Link>
              <Stores
                href="https://justjeans.jgl.com.au/shop/jj-womens-denim-fit-guide"
                target="_blank"
              >
                Denim Fit Guide
              </Stores>
            </Link>
            <List>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/jj-womens-denim-fit-guide"
                    target="_blank"
                  >
                    Women
                  </FindAStore>
                </Link>
              </Item>
              <Item>
                <Link>
                  <FindAStore
                    href="https://justjeans.jgl.com.au/shop/jj-mens-denim-fit-guide"
                    target="_blank"
                  >
                    Men
                  </FindAStore>
                </Link>
              </Item>
            </List>
          </Item1> */}
        </List3>
      </Container>
    </ContainerRoot>
  );
});

export default FooterRight;
