import React from "react";
import styled from "styled-components";

const Sidebar = ({ info }) => {
  return (
    <Container>
      <div className="avatar">
        <img
          src="https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
          alt="Avatar"
        />
        <h3>{`${info.firstName} ${info.lastName}`}</h3>
      </div>
      <div className="menu">
        <MenuItem>
          <p>👤 Personal Information</p>
        </MenuItem>
        <MenuItem>
          <p>🏠 Address</p>
        </MenuItem>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 35%;
  max-width: 300px; /* Limit sidebar width on larger screens */
  height: 100%;
  background-color: #f0f2f5;
  border-radius: 10px;
  padding: 20px;

  .avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: white;
  }

  .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .avatar h3 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 768px) {
    padding: 10px; /* Decrease padding on smaller screens */
    max-width: none; /* Remove max-width on smaller screens */
    height: auto; /* Allow the sidebar to grow in height on smaller screens */

    .avatar {
      padding: 10px;
      margin-bottom: 10px;
    }

    .avatar img {
      width: 40px;
      height: 40px;
    }

    .avatar h3 {
      font-size: 14px;
    }
  }
`;

const MenuItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }
`;

export default Sidebar;
