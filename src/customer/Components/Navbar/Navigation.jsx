import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { IoCartOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation } from "../../../config/navigationMenu";
import AuthModal from "../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
// import { deepPurple, grey } from "@mui/material/colors";
// import { getUser, logout } from "../../../Redux/Auth/Action";
import { getCart } from "../../../Redux/Customers/Cart/Action";
// import menuItemsData from "./data.json";
// import Menuitems from "../dropdown/Menuitems";
import "../dropdown/dropdown.css";
import { logoutCustomer, getCustomerInfo } from "../../../action/Customer";
import { getChildCategories } from "../../../action/cart";
// import { FaRegUser } from "react-icons/fa6";
import logo from "../../../logos/111.jpg";
// import { get } from "../../../api/config/APIController";
import ShopSwitcher from "./ShopSwitcher";
import { AiOutlineUser } from "react-icons/ai";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// const logos = [
//   { name: "Peter Alexander", path: "/path/to/peter-alexander-logo.png" },
//   { name: "Just Jeans", path: "/path/to/just-jeans-logo.png" },
//   {
//     name: "Dotti",
//     path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmfIf4cq8He7iAIp1alnqXaiYQkjguWVg5bFA2UpVTpw&s",
//   },
//   { name: "Jay Jays", path: "/path/to/jay-jays-logo.png" },
//   { name: "Jacqui E", path: "/path/to/jacqui-e-logo.png" },
//   {
//     name: "Portmans",
//     path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDUp0GoRDvmwlNjHiTZHurgiFAGJ--LEXRjiK_hJ0SvA&s",
//   },
// ];
// const Logo = ({ name, path }) => (
//   <Link
//     to="/"
//     className="block p-2 hover:bg-gray-200"
//     style={{ borderRight: "1px solid white" }}
//   >
//     <img src={path} alt={name} className="h-8 w-auto" />
//     {/* <h2 className="h-8 w-auto text-black">{name}</h2> */}
//   </Link>
// );
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, cart, newUser, cartItems } = useSelector((store) => store);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();
  const [childCategories, setChildCategories] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isSticky, setIsSticky] = useState(false);

  console.log("this is auth", auth.user);

  useEffect(() => {
    if (jwt) {
      // dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt]);

  useEffect(() => {
    getChildCategories("3074457345616679206").then((response) => {
      console.log("this is response", response);
      setChildCategories(response.extraData);
    });
  }, []);
  console.log("this is child categories", childCategories);
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  useEffect(() => {
    if (newUser?.newUser?.user) {
      handleClose();
    }
    if (
      auth.user?.role !== "ADMIN" &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(-1);
    }
  }, [auth.user]);

  const handleLogout = () => {
    handleCloseUserMenu();

    dispatch(logoutCustomer());
  };
  const handleMyOrderClick = () => {
    handleCloseUserMenu();
    navigate("/account/order");
  };

  useEffect(() => {
    // if (jwt) {
    getCustomerInfo().then((res) => {
      setUserInfo(res);
    });
    // }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="bg-white pb-5 ">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {childCategories?.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium border-none"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {childCategories?.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category?.image?.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category?.children?.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>

                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section?.children?.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 text-center ">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="/"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="/" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        {/* <div
          className="flex items-center flex-shrink-0 gap-2 text-white mr-6"
          style={{
            backgroundColor: "#E5E5E5",
            width: "100%",
            height: 40,
          }}
        >
          {logos.map((logo, index) => (
            <Logo key={index} {...logo} />
          ))}
        </div> */}

        <ShopSwitcher />

        <nav aria-label="Top" className="mx-auto">
          <div
            className="border-b border-gray-200"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <div className="flex h-22 items-center px-11">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  {/* <span className="sr-only">Your Company</span> */}
                  <img
                    // src="https://res.cloudinary.com/poreddysrikanth/image/upload/v1699002610/cnetric_lquumj.svg"
                    src={logo}
                    alt="Shopwithzosh"
                    className="h-12  mr-2"
                    style={{ height: 69 }}
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {childCategories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                              style={{
                                color:
                                  category.name === "SALE" ? "red" : "black",
                              }}
                            >
                              {category.name.toUpperCase()}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div
                                    className={`grid ${
                                      category?.image?.length > 2
                                        ? " "
                                        : "grid-cols-1 gap-x-8 gap-y-10"
                                    }  py-16`}
                                  >
                                    <div className="col-start-2 grid grid-cols-2 gap-x-4">
                                      {category?.image?.map((item, index) => (
                                        <div
                                          key={item}
                                          className="group relative text-base sm:text-sm "
                                          style={{
                                            width:
                                              category.image.length > 2
                                                ? "80%"
                                                : "auto",
                                            height:
                                              category.image.length > 2
                                                ? "auto"
                                                : "100%",
                                            margin:
                                              category.image.length > 2
                                                ? "0 auto"
                                                : "0",
                                          }}
                                        >
                                          {/* {console.log("this is item", item)} */}
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {/* {item.name} */}
                                          </a>
                                          {/* <p
                                            aria-hidden="true"
                                            className="mt-1"
                                            onClick={() => navigate("/shops")}
                                          >
                                            Shop now
                                      
                                          </p> */}
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1  grid grid-cols-1 md:grid-cols-5 gap-x-8 gap-y-10 text-sm">
                                      {category.children.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900 "
                                          >
                                            {section.name}
                                          </p>

                                          <div className="mt-0 space-y-6 sm:mt-4 sm:space-y-4">
                                            {section.children.map((item) => (
                                              <p
                                                key={item.name}
                                                onClick={() =>
                                                  handleCategoryClick(
                                                    category,
                                                    section,
                                                    item,
                                                    close
                                                  )
                                                }
                                                className="cursor-pointer hover:text-gray-800"
                                              >
                                                {item.name}
                                              </p>
                                            ))}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-blue-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center justify-between space-x-2">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {newUser?.newUser?.personalizationID ? (
                    <div>
                      <Avatar
                        className="cursor-pointer"
                        onClick={handleUserClick}
                        sx={{
                          bgcolor: "gray.900",
                          color: "white",
                        }}
                      >
                        {
                          userInfo?.firstName?.charAt(0)
                          // +
                          //   userInfo?.lastName?.charAt(0)
                        }
                      </Avatar>
                      {/* <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleUserClick}
                      >
                        Dashboard
                      </Button> */}
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div onClick={() => navigate("/profile")}>
                            {" "}
                            Profile
                          </div>
                        </MenuItem>

                        <MenuItem onClick={handleMyOrderClick}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <div>
                      <AiOutlineUser
                        onClick={handleUserClick}
                        className="h-6 w-6   cursor-pointer"
                        style={{ color: "black" }}
                        aria-hidden="true"
                      />
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <div onClick={() => navigate("/sign-in")}>
                            {" "}
                            Sign In
                          </div>
                        </MenuItem>

                        <MenuItem onClick={handleCloseUserMenu}>
                          <div onClick={() => navigate("/sign-up")}>
                            Create Account
                          </div>
                        </MenuItem>
                      </Menu>
                    </div>
                  )}
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <p className="p-2 text-white hover:text-blue-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      className="h-6 w-6"
                      style={{ color: "black" }}
                      aria-hidden="true"
                      onClick={() => {
                        navigate("/search");
                      }}
                    />
                  </p>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 relative">
                  {" "}
                  {/* Added relative positioning */}
                  <Button
                    onClick={() => navigate("/cart")}
                    className="group -m-2 flex items-center p-2"
                  >
                    <IoCartOutline
                      className="h-7 w-7 flex-shrink-0 text-white group-hover:text-gray-500"
                      aria-hidden="true"
                      style={{ color: "black" }}
                    />
                    {/* Wrapped the count in a div */}
                    <div className="absolute top-0 right-2 bg-black rounded-full w-5 h-5 flex items-center justify-center">
                      <span className="text-white text-s ">
                        {newUser?.newUser?.userId &&
                        cartItems?.cartItems?.orderItem?.length > 0
                          ? cartItems?.cartItems?.orderItem?.length
                          : 0}
                      </span>
                    </div>

                    {/* <span className="ml-2 text-sm font-medium text-black group-hover:text-gray-800"> */}
                    {/* Cart */}
                    {/* </span> */}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleClose} open={openAuthModal} />

      {/* <div className="header-desk-navbar">
        <div className="header-desk-container">
          <nav>
            <ul className="menus">
              {menuItemsData.map((menu, index) => {
                const depthLevel = 0;
                return (
                  <Menuitems
                    items={menu}
                    key={index}
                    depthLevel={depthLevel}

                  />
                );
              })}
            </ul>
          </nav>
        </div>
      </div> */}
    </div>
  );
}
