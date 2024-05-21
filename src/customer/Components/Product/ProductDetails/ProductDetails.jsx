import React from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
// import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { findProductById } from "../../../../Redux/Customers/Product/Action";
// import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
// import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
// import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
// import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import toast, { Toaster } from "react-hot-toast";
import "./productDetails.css";
import {
  receiveProducts,
  receiveProductsById,
  getTopProducts,
} from "../../../../action";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";

import { grey } from "@mui/material/colors";

import ProductCard from "../ProductCard/ProductCard";
import Loader from "../../Loader/Loader";

const product = {
  name: "Basic Tee 6-Pack",
  price: "₹996",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    "This item might be useful if you're preparing for one of these exams",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, cartItems, newUser } = useSelector(
    (store) => store
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)
  const [productDetails, setProductDetails] = useState({});
  const [checkCart, setCheckCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [topProducts, setTopProducts] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };
  const handleColorClick = (color, image) => {
    setSelectedColor(color);
    setSelectedImage(image);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = { id:productDetails.product?.variants[0]?.id, size: selectedSize.name };
    // dispatch(addItemToCart({ data, jwt }));
    // navigate("/cart");
    // dispatch(AddItemToCartNew(productDetails.product?.variants[0]?.id))

    let parts;

    // Check if productDetails.variants exist
    if (productDetails?.variants) {
      // Map through variants
      productDetails.variants.map((variant) => {
        // Check if variant.partNumber exists and matches selectedColor
        if (variant.partNumber && variant.colour === selectedColor) {
          parts = variant.partNumber;
        }
      });
    }

    // If parts is still undefined, set it to productDetails.partNumber
    if (!parts) {
      parts = productDetails?.partNumber;
    }
    if (newUser?.newUser?.userId) {
      AddItemToCartNew(parts, quantity).then((res) => {
        if (res.status === 201) {
          toast.success("Item added to cart", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }

        dispatch(getCartItems());
      });
    } else {
      // navigate("/login")
      toast.error("Please login to add item in cart", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    // const data = { productId: productId, jwt };
    // dispatch(findProductById(data));
    // dispatch(getAllReviews(productId));
    if (cartItems?.cartItems?.cart?.lines.length > 0) {
      dispatch(getCartItems());
    }
  }, [cartItems?.cartItems?.cart?.lines.length]);

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      // console.log("this is new details product page", res);
      setProductDetails(res.catalogEntryView[0]);
      setLoading(false);
    });
  }, [productId]);

  useEffect(() => {
    receiveProducts().then((data) => {
      setTopProducts(data.hits);
    });
  }, []);

  // console.log("reviews ", cartItems);

  useEffect(() => {
    const checkItem = CheckCardItem(productDetails?.sKUs?.[0]?.partNumber);
    // console.log("productDetails", productDetails, checkItem);
    setCheckCart(checkItem);
  }, [cartItems, productDetails]);

  const CheckCardItem = (ID) => {
    let Cart = cartItems?.cartItems?.orderItem;
    let foundInCart = false;
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        console.log("cartItem---", cartItem.partNumber, "ID---", ID);

        if (cartItem.partNumber === ID) {
          foundInCart = true;
          break;
        }
      }
    }
    setCheckCart(foundInCart);
    return foundInCart;
  };

  // useEffect(() => {

  // }, [cartItems?.cartItems?.cart?.lines.length]);

  return (
    <div className="bg-white lg:px-20">
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {/* {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={"/"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))} */}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  <div className="flex items-center">
                    <a
                      href={"/shops"}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      Products
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </a>
              </li>
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productDetails?.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* product details */}
          <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
            {/* Image gallery */}
            <div className="flex flex-col items-center ">
              <div className=" overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={selectedImage || productDetails?.fullImage}
                  alt={productDetails?.product?.images[0]?.url}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-wrap space-x-5 justify-center">
                {productDetails?.product?.images.map((image) => (
                  <div
                    onClick={() => handleSetActiveImage(image)}
                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4"
                  >
                    <img
                      src={image.url}
                      alt={productDetails?.product?.images[0].url}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-2xl font-semibold tracking-tight text-gray-900  ">
                  {productDetails?.name}
                </h1>
                <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                  {/* {productDetails?.name} */}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                  <p className="font-semibold">
                    ${productDetails?.price?.[0]?.value}
                  </p>
                  {/* <p className="opacity-50 line-through">
                  ₹{productDetails.product?.variants[0]?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p> */}
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>

                  <div className="flex items-center space-x-3">
                    <Rating
                      name="read-only"
                      value={4.6}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60 text-sm">42807 Ratings</p>
                    <p
                      // className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      sx={{ color: grey[900] }}
                    >
                      {reviews.totalCount} reviews
                    </p>
                  </div>
                </div>

                {/* Colors */}
                {(productDetails.uniqueID === "3074457345616683717" ||
                  productDetails.uniqueID === "3074457345616683719") && (
                  <div className="mt-10">
                    {/* Selected Color */}
                    <div className="mb-4">
                      <span className="text-gray-700">Color:</span>
                      <span className="ml-2 font-semibold">
                        {selectedColor || productDetails?.variants?.[0]?.colour}
                      </span>
                    </div>

                    {/* Color Options */}
                    <div className="flex space-x-2 md:space-x-4">
                      {productDetails?.variants?.map((variant, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full relative overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 ${
                              variant.colour === selectedColor
                                ? "border-2 border-black"
                                : ""
                            }`}
                            onClick={() =>
                              handleColorClick(
                                variant.colour,
                                variant.mainImage
                              )
                            }
                          >
                            <img
                              src={variant.smallImage}
                              alt={variant.colour}
                              className={`w-full h-full object-cover ${
                                variant.colour === selectedColor
                                  ? "filter brightness-110"
                                  : ""
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <form className="mt-10" onSubmit={handleSubmit}>
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size: {selectedSize}
                      </h3>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                        {productDetails?.sizes?.map((size, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={size}
                            // disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                "group relative flex items-center justify-center rounded-md border py-2 px-4 text-sm font-medium uppercase hover:bg-gray-100 focus:outline-none",
                                size || size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : ""
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size}
                                </RadioGroup.Label>
                                {size || size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>

                    <div className="flex items-center mt-4">
                      <div className="mr-5">
                        <h3 className="text-sm font-medium text-gray-900 ">
                          Qty:
                        </h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(Math.max(1, quantity - 1));
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="w-16 px-3 py-2 text-center border-t border-b border-gray-300 bg-gray-50 text-gray-900 font-semibold"
                        value={quantity}
                        readOnly
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuantity(quantity + 1);
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* <div className="quantity text-sm font-medium text-gray-900">
                    Qty:
                    <button id="decrease-quantity">-</button>
                    <span id="quantity">1</span>
                    <button id="increase-quantity">+</button>
                  </div> */}
                  {!checkCart ? (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      View Cart
                    </Button>
                  )}
                  {/* <Button
                  variant="contained"
                  type="submit"
                  sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                >
                  Add To Cart
                </Button> */}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {productDetails?.product?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    {productDetails.uniqueID === "3074457345616683717" ||
                    productDetails.uniqueID === "3074457345616683719"
                      ? "Description"
                      : "Highlights"}
                  </h3>

                  <div className="mt-4">
                    {productDetails.uniqueID === "3074457345616683717" ||
                    productDetails.uniqueID === "3074457345616683719" ? (
                      <h1 className="text-lg lg:text-lg tracking-tight text-gray-900 opacity-80 pt-1">
                        {productDetails?.longDescription}
                      </h1>
                    ) : (
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div> */}
              </div>
            </div>
          </section>

          {/* rating and review section */}
          {/* <section className="">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {review.reviews?.map((item, i) => (
                    <ProductReviewCard item={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-10">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60">42807 Ratings</p>
                </div>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Excellent</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Very Good</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={30}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Good</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className="bg-[#885c0a]"
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={25}
                        color="orange"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Avarage</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#885c0a",
                          },
                        }}
                        variant="determinate"
                        value={21}
                        color="success"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                  >
                    <Grid xs={2}>
                      <p className="p-0">Poor</p>
                    </Grid>
                    <Grid xs={7}>
                      <LinearProgress
                        className=""
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                    <Grid xs={2}>
                      <p className="opacity-50 p-2">19259</p>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section> */}
          {/* data={topProducts?.slice(10, 21)} */}
          {/* similer product */}
          <section className=" pt-2">
            <h1 className="py-5 text-2xl font-bold">Similar Products</h1>
            <div className="flex flex-wrap justify-center bg-white  py-5 rounded-md ">
              {/* {customersProduct?.products?.content?.map((item) => (
                      <ProductCard product={item} />
                    ))} */}
              {topProducts?.slice(0, 4).map((item) => (
                <ProductCard product={item} />
              ))}

              {/* <ProductCard product={products} /> */}
            </div>
          </section>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
