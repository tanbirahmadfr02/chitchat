/* eslint-disable no-unused-vars */
import React from "react";
import Image from "../Layout/Image";
import profile from "../assets/profile.png";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = getAuth();
  let navigate = useNavigate();

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="navBox">
        <div className="profile">
          <Image src={profile} className={"profileImg"} />
        </div>
        <div className="menu">
          <div className="shape">
            <HiOutlineHome className="icon" />
          </div>
          <div>
            <AiOutlineMessage className="icon" />
          </div>
          <div>
            <IoMdNotificationsOutline className="icon" />
          </div>
          <div>
            <IoSettingsOutline className="icon" />
          </div>
        </div>
        <div className="logout">
          <IoMdLogOut onClick={handleOpen} className="icon" />
        </div>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" className="logOutTitle">Log Out?</Typography>
            <Typography id="modal-modal-description" className="logOutPera">
              Are you sure you want to log out?
            </Typography>
            <div className="logOutBtns">
              <Button onClick={handleLogout} variant="text" className="logOutBtn">Yes</Button>
              <Button onClick={()=> setOpen(false)} variant="text" className="logOutBtn">No</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Navbar;
