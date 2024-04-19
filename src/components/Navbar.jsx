/* eslint-disable no-unused-vars */
import React, { useState, createRef } from "react";
import Image from "../Layout/Image";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../slices/user/userSlice";
import Heading from "../Layout/Heading";
 
// react cropper links ---------
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// import "./Demo.css";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";


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
  // profile modal start --------
  const [profileModal, setProfileModal] = React.useState(false);
  const profileHandleOpen = () => setProfileModal(true);
  const ProfileHandleClose = () => setProfileModal(false);
  // profile modal end --------

  //  ---------logout modal start ---------
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  ---------logout modal end ---------

  // -------react cropper start -------
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  // -------react cropper end -------

  let location = useLocation();
  let dispatch = useDispatch();

  let userInfo = useSelector((state) => state.user.value);
  console.log(userInfo);

  const auth = getAuth();
  let navigate = useNavigate();

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          localStorage.removeItem("user");
          dispatch(activeUser(null));
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
        <div onClick={profileHandleOpen} className="profile">
          <div className="profileMain">
          <Image src={userInfo.photoURL} className={"profileImg"} />
          <div className="overlay">
            <div className="cloud"><FaCloudUploadAlt /></div>
          </div>
          </div>
        </div>
        <div className="profileName">
          <Heading className="name" text={userInfo.displayName} />
        </div>
        <div className="menu">
          <div className="home">
            <Link
              className={location.pathname == "/home" && "active"}
              to={"/home"}
            >
              <HiOutlineHome className="icon" />
            </Link>
          </div>
          <div className="message">
            <Link
              className={location.pathname == "/home/message" && "active"}
              to={"/home/message"}
            >
              <AiOutlineMessage className="icon" />
            </Link>
          </div>
          <div className="notification">
            <Link
              className={location.pathname == "/home/notification" && "active"}
              to={"/home/notification"}
            >
              <IoMdNotificationsOutline className="icon" />
            </Link>
          </div>
          <div className="setting">
            <Link
              className={location.pathname == "/home/setting" && "active"}
              to={"/home/setting"}
            >
              <IoSettingsOutline className="icon" />
            </Link>
          </div>
        </div>
        <div className="logout">
          <IoMdLogOut onClick={handleOpen} className="icon" />
        </div>
      </div>

      {/* -----------profile modal start -------- */}
      <Modal
        open={profileModal}
        onClose={ProfileHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div>
          </Typography>
        </Box>
      </Modal>
      {/* -----------profile modal start -------- */}

      {/* ------------logout modal start ------------ */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" className="logOutTitle">
              Log Out?
            </Typography>
            <Typography id="modal-modal-description" className="logOutPera">
              Are you sure you want to log out?
            </Typography>
            <div className="logOutBtns">
              <Button
                onClick={handleLogout}
                variant="text"
                className="logOutBtn"
              >
                Yes
              </Button>
              <Button
                onClick={() => setOpen(false)}
                variant="text"
                className="logOutBtn"
              >
                No
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      {/* ------------logout modal end ------------ */}
    </>
  );
};

export default Navbar;
