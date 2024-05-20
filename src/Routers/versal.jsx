import React from "react";
import { Route, Routes } from "react-router-dom";




export default function Componentaaa() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                alt="AMEB Logo"
                className="h-8 w-8"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a aria-current="page" className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Why AMEB
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Exams
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Shop
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  News
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Resources
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Projects
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  AMEB Award
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  About us
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  FAQs
                </a>
                <a className="text-white px-3 py-2 rounded-md text-sm font-medium" href="#">
                  Contact
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-white p-1 rounded-full text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <div>
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    className="max-w-xs bg-black rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserCircleIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="ml-3 relative">
                <button className="bg-black p-1 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open shopping cart</span>
                  <ShoppingCartIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" />
              <XIcon className="hidden h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a aria-current="page" className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Why AMEB
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Exams
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Shop
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            News
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Resources
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Projects
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            AMEB Award
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            About us
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            FAQs
          </a>
          <a className="text-white block px-3 py-2 rounded-md text-base font-medium" href="#">
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function UserCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}



// };

// export default Versal;
