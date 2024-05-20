import React from "react";
import MenuItems from "./Menuitems";

const Dropdown = ({
  submenus,
  dropdown,
  depthLevel,
  receiveProductsByCollectionId,
}) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

  return (
    <ul
      className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}
      style={{
        borderLeft: `5px solid ${
          dropdownClass == "dropdown-submenu" ? "#151f6d" : "#389d8d"
        }`,
      }}
    >
      {submenus.map((submenu, index) => (
        <MenuItems
          items={submenu}
          key={index}
          depthLevel={depthLevel}
          receiveProductsByCollectionId={receiveProductsByCollectionId}
        />
      ))}
    </ul>
  );
};

export default Dropdown;
