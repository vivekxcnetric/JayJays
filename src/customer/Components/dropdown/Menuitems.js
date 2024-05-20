import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
// import store from "../../Store";

const Menuitems = ({ items, depthLevel, receiveProductsByCollectionId }) => {
  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className="menu-items "
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.name && items.children ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.Menuitems
            ) : (
              <Link
                to="products"
                onClick={() => {
                  if (items?.children?.length == 0) {
                    receiveProductsByCollectionId(items.id);
                  }
                }}
              >
                {items.name}
                {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
                    0 && window.innerWidth > 960 ? (
                  // <i
                  //   class="fa fa-chevron-right"
                  //   style={{ fontSize: "13px" }}
                  // ></i>
                  <></>
                ) : (
                  // <i
                  //   class="fa fa-chevron-down"
                  //   style={{ fontSize: "13px" }}
                  // ></i>
                  <></>
                )}
              </Link>
            )}
          </button>
          {items.children.length > 0 && (
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.children}
              dropdown={dropdown}
              // receiveProductsByCollectionId={receiveProductsByCollectionId}
            />
          )}
        </>
      ) : !items.name && items.children.length > 0 ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.Menuitems}
            {depthLevel > 0 ? (
              <i class="fa fa-chevron-right" style={{ fontSize: "13px" }}></i>
            ) : (
              <i class="fa fa-chevron-down" style={{ fontSize: "13px" }}></i>
            )}
          </button>
          {items.children.length > 0 && (
            <Dropdown
              depthLevel={depthLevel}
              submenus={items.children}
              dropdown={dropdown}
              // receiveProductsByCollectionId={receiveProductsByCollectionId}
            />
          )}
        </>
      ) : (
        <>
          {" "}
          <Link
            to="products"
            onClick={() => {
              if (items.children.length > 0) {
                receiveProductsByCollectionId(items.id);
              }
            }}
          >
            {items.name}
          </Link>
        </>
      )}
    </li>
  );
};

export default Menuitems;
