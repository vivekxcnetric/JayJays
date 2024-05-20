import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import RegisterUserForm from "./Register";
import { useEffect, useState } from "react";
import LoginUserForm from "./Login";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const { auth, newUser } = useSelector((store) => store);
  const navigate = useNavigate();
  useEffect(() => {
    if (newUser?.newUser?.user) {
      handleClose();
      //  if(auth.user?.role==="ADMIN"){
      //   navigate('/admin')
      //  }
    }
  }, [newUser?.newUser?.user]);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        size="large"
      >
        <Box className="rounded-md" sx={style}>
          {location.pathname === "/login" ? (
          <LoginUserForm />
        ) : (
          <RegisterUserForm />
        )}

          {/* <LoginUserForm /> */}
          {/* {location.pathname === "/register" && <RegisterUserForm />} */}
        </Box>
      </Modal>
    </>
  );
}
