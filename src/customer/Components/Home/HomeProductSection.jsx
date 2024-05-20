import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { recieveBannersHome } from "../../../action";

const HomeProductSection = ({
  section,
  data,
  styleWidth,
  x,
  content1,
  content2,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // const [banners, setBanners] = useState([]);

  const slidePrev = () => setActiveIndex(activeIndex - 1);
  const slideNext = () => setActiveIndex(activeIndex + 1);
  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  // useEffect(() => {
  //   recieveBannersHome().then((data) => {
  //     setBanners(data);
  //   });
  //   console.log("this is banners", banners);
  // }, []);

  const responsive = {
    0: {
      items: 2,
      itemsFit: "contain",
    },
    568: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5.5,
      itemsFit: "contain",
    },
  };
  const items = x?.slice(0, 5).map((item) => (
    <div className="flex justify-center">
      {" "}
      <HomeProductCard product={item} />
    </div>
  ));

  const slideInFromRight = (t) => {
    return `translateX(${100 - t * 100}%)`;
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-2xl font-extrabold text-gray-900 pt-5 text-center">
        {content1 && content1}
      </h2>
      <p className="text-xl font-bold text-gray-900 pb-5 text-center">
        {content2 && content2}
      </p>
      {/* <div className="relative border p-5"> */}
      {data ? (
        <img
          src={data && data}
          alt="banner"
          style={{
            objectFit: "cover",
            height: "auto",
            width: styleWidth || "120%",
            margin: "auto",
          }}
        />
      ) : x ? (
        <React.Fragment>
          <AliceCarousel
            disableButtonsControls
            disableDotsControls
            mouseTracking
            items={items}
            activeIndex={activeIndex}
            responsive={responsive}
            onSlideChanged={syncActiveIndex}
            animationType="fadeout"
            animationDuration={2000}
          />
          {activeIndex !== items?.length - 5 && (
            <Button
              onClick={slideNext}
              variant="contained"
              sx={{
                position: "absolute",
                top: "8rem",
                right: "0rem",
                transform: "translateX(50%) rotate(90deg)",
              }}
              color="white"
              aria-label="next"
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
            </Button>
          )}

          {activeIndex !== 0 && (
            <Button
              onClick={slidePrev}
              variant="contained"
              color="white"
              sx={{
                position: "absolute",
                top: "8rem",
                left: "0rem",
                transform: "translateX(-50%) rotate(90deg)",
              }}
              aria-label="prev"
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
            </Button>
          )}
        </React.Fragment>
      ) : null}
      {/* </div> */}
    </div>
  );
};

export default HomeProductSection;
